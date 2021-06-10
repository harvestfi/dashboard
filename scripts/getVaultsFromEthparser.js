require('dotenv').config()
const axios = require('axios')
var sortBy = require('lodash.sortby')
const fs = require('fs')
const path = require('path')
const filepath = path.resolve(__dirname, '../src/constants/vaultNames.json')

async function main() {
  let vaults;

  try {
    vaults = JSON.parse(fs.readFileSync(filepath), 'utf-8')
  } catch {
    vaults = {}
  }

  const resp = await axios.get(`${process.env.REACT_APP_ETH_PARSER_URL}/contracts/vaults`)
  const apiVaults = resp.data.data

  // Add vaults that do not exist in our config
  apiVaults.forEach((vault) => {
    if (!vaults[vault.contract.address]) {
      let name = vault.contract.name

      // Remove leading "V_"
      if (name.startsWith('V_')) name = name.substring(2);

      vaults[vault.contract.address] = name
    }
  })

  // Write JSON, with hacks to sort the resulting object by *values* to allow
  // for easy editing of our vaults list
  let filedata = JSON.stringify(vaults, null, 2)
  let fileLines = filedata.split("\n")

  // Remove bracket lines
  fileLines.shift()
  fileLines.pop()

  // Add a comma to the last line that lacks one
  fileLines[fileLines.length - 1] = fileLines[fileLines.length - 1] + ','

  // Sort the lines
  let sortedFileLines = sortBy(fileLines, (line) => line.split('": "')[1])

  // Rejoin them, removing the comma from the last line
  let numLines = sortedFileLines.length

  sortedFileLines.forEach((line, i) => {
    if (line[line.length - 1] === ',' && (i === numLines - 1)) {
      sortedFileLines[i] = line.slice(0, -1)
    }
  })

  let newFileString = ["{", ...sortedFileLines, "}"].join("\n")

  // Write the .json
  fs.writeFileSync(filepath, newFileString, 'utf-8')
}

main()
