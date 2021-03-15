import {allVaultsExport, allPoolsExport, histAssetsExport} from './getAllAssets.js'

// Buiding active Vaults ST
const activeVaults = Promise.all([allVaultsExport, allPoolsExport]).then(data => {
    const allVaults = data[0]
    const allPools = data[1]
    const activeST = findActiveVaults(allVaults, allPools)
    return activeST
})

// Utils match active vaults with ST Pools
const findActiveVaults = function(allVaultsArg, activePoolsArg) {
    let activeVaults = []
    for(let cpool = 0; cpool < activePoolsArg.length; cpool++) {
        for(let cvault = 0; cvault < allVaultsArg.length; cvault++) {
            if(allVaultsArg[cvault].contract.address === activePoolsArg[cpool].lpToken.address) {
                // console.log(`Vault address ${allVaultsArg[cvault].contract.address}(${allVaultsArg[cvault].contract.name}), is in St Pool address ${activePoolsArg[cpool].contract.address}`)
                activeVaults.push(allVaultsArg[cvault])
            }
        }
    }
    return activeVaults
}

// MODULE EXPORTS
export {
    activeVaults
}

