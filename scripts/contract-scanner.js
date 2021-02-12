import fs from 'fs'
import harvest from '../src/lib/index.js'
import { PoolManager } from '../src/lib/manager.js'

const { ethers } = harvest

const infuraId = process.argv[2]
const STAKED_TOPIC0 = '0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d'

const MEMO_FILE = './scripts/isContract.json'
const RESULT_FILE = `./scripts/contracts_${Date.now()}.csv`
if (!fs.existsSync(RESULT_FILE)) {
  fs.writeFileSync(RESULT_FILE, 'pool,contract,amount\n')
}

const CONTRACT_MEMO = (() => {
  try {
    return JSON.parse(fs.readFileSync(MEMO_FILE, 'utf8'))
  } catch {
    return {}
  }
})()

// alternative to Promise.all(array.map(asyncFunc)) with concurrency limit
async function batchMap(list, concurrency, asyncFunc) {
  const argsCopy = [].concat(list.map((val, ind) => ({ val, ind })))
  const result = new Array(list.length)
  const promises = new Array(concurrency).fill(Promise.resolve())
  const chainNext = p => {
    if (argsCopy.length) {
      const arg = argsCopy.shift()
      return p.then(() => {
        // Store the result into the array upon Promise completion
        const operationPromise = asyncFunc(arg.val).then(r => {
          result[arg.ind] = r
        })
        return chainNext(operationPromise)
      })
    }

    return p
  }
  await Promise.all(promises.map(chainNext))
  return result
}

// append row to CSV
function addRow(pool, address, amount) {
  fs.appendFileSync(RESULT_FILE, `${pool},${address},${amount}\n`)
}

// lazy splitting. this really should be making requests in 1 week chunks
// not splitting results in exceeding the 10k limit
// eventually this lazy splitting will too
async function fetchEvents(pool, currentBlock) {
  const threeWeeksAgo = currentBlock - 4 * 60 * 24 * 7 * 3
  const filter = pool.filters['Staked(address,uint256)']
  let events = await pool.queryFilter(filter, 0, threeWeeksAgo)
  events = events.concat(await pool.queryFilter(filter, threeWeeksAgo))
  // ethers is supposed to do this but isn't
  events = events.filter(e => e.topics[0] === STAKED_TOPIC0)
  return events
}

async function isContract(address, provider) {
  if (CONTRACT_MEMO[address] !== undefined) return CONTRACT_MEMO[address]

  const code = await provider.getCode(address)
  CONTRACT_MEMO[address] = code !== '0x'
  console.log(
    `memoizing ${address} is ${CONTRACT_MEMO[address]} with code length ${code.length / 2 - 1}`,
  )
  return CONTRACT_MEMO[address]
}

async function processEvent(pool, event) {
  if (await isContract(event.args[0], pool.provider)) {
    addRow(pool.lptoken.name, event.args.user, event.args.amount.toString())
  }
}

async function processPool(pool, currentBlock) {
  console.log(`getting events for ${pool.lptoken.name} pool`)
  const events = await fetchEvents(pool, currentBlock)
  console.log(`got events for ${pool.lptoken.name} pool`)
  // 5 simultaneous event processers
  return await batchMap(events, 5, async e => await processEvent(pool, e))
}

async function retrieveAll() {
  const provider = new ethers.providers.InfuraProvider('homestead', infuraId)
  const man = PoolManager.allPastPools(provider)
  const block = await provider.getBlockNumber()
  try {
    await batchMap(man.pools, 2, async pool => await processPool(pool, block))
  } catch (e) {
    console.error(e)
  } finally {
    fs.writeFileSync(MEMO_FILE, JSON.stringify(CONTRACT_MEMO))
  }
}

retrieveAll()
