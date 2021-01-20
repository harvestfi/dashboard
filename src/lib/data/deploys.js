const assets = [
  {
    name: "11NCH",
    decimals: 18,
    address: "0x111111111117dC0aa78b770fA6A738034120C302",
  },
  {
    name: "aBUSD",
    decimals: 18,
    address: "0x6Ee0f7BB50a54AB5253dA0667B0Dc2ee526C30a8",
  },
  {
    name: "AMPL",
    decimals: 9,
    address: "0xD46bA6D942050d489DBd938a2C909A5d5039A161",
  },
  {
    name: "BAC",
    decimals: 18,
    address: "0x3449FC1Cd036255BA1EB19d65fF4BA2b8903A69a",
  },
  {
    name: "BAS",
    decimals: 18,
    address: "0xa7ED29B253D8B4E3109ce07c80fc570f81B63696",
  },
  {
    name: "BASED",
    decimals: 18,
    address: "0x68A118Ef45063051Eac49c7e647CE5Ace48a68a5",
  },
  {
    name: "BSG",
    decimals: 18,
    address: "0xB34Ab2f65c6e4F764fFe740ab83F982021Faed6d",
  },
  {
    name: "BSGS",
    decimals: 18,
    address: "0xA9d232cC381715aE791417B624D7C4509D2c28DB",
  },
  {
    name: "BUSD",
    decimals: 18,
    address: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
  },
  {
    name: "cDAI",
    decimals: 18,
    address: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
  },
  {
    name: "cUSDC",
    decimals: 18,
    address: "0x39AA39c021dfbaE8faC545936693aC917d5E7563",
  },
  {
    name: "CRV",
    decimals: 18,
    address: "0xD533a949740bb3306d119CC777fa900bA034cd52",
  },
  {
    name: "CRV-BUSD",
    decimals: 18,
    address: "0x3B3Ac5386837Dc563660FB6a0937DFAa5924333B",
  },
  {
    name: "CRV-COMPOUND",
    decimals: 18,
    address: "0x845838DF265Dcd2c412A1Dc9e959c7d08537f8a2",
  },
  {
    name: "CRV-EURS",
    decimals: 18,
    address: "0x194eBd173F6cDacE046C53eACcE9B953F28411d1",
  },
  {
    name: "CRV-OBTC",
    decimals: 18,
    address: "0x2fE94ea3d5d4a175184081439753DE15AeF9d614",
  },
  {
    name: "CRV-STETH",
    decimals: 18,
    address: "0x06325440D014e39736583c165C2963BA99fAf14E",
  },
  {
    name: "CRV-USDN",
    decimals: 18,
    address: "0x4f3E8F405CF5aFC05D68142F3783bDfE13811522",
  },
  {
    name: "CRV-UST",
    decimals: 18,
    address: "0x94e131324b6054c0D789b190b2dAC504e4361b53",
  },
  {
    name: "CRV-YPOOL",
    decimals: 18,
    address: "0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8",
  },
  {
    name: "DAI",
    decimals: 18,
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },
  {
    name: "DPI",
    decimals: 18,
    address: "0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b",
  },
  {
    name: "DSD",
    decimals: 18,
    address: "0xBD2F0Cd039E0BFcf88901C98c0bFAc5ab27566e3",
  },
  {
    name: "ESD",
    decimals: 18,
    address: "0x36F3FD68E7325a35EB768F1AedaAe9EA0689d723",
  },
  {
    name: "FARM",
    decimals: 18,
    address: "0xa0246c9032bC3A600820415aE600c6388619A14D",
  },
  {
    name: "GRAIN",
    decimals: 18,
    address: "0x6589fe1271A0F29346796C6bAf0cdF619e25e58e",
  },
  {
    name: "HBTC",
    decimals: 18,
    address: "0x0316EB71485b0Ab14103307bf65a021042c6d380",
  },
  {
    name: "HUSD",
    decimals: 8,
    address: "0xdF574c24545E5FfEcb9a659c229253D4111d87e1",
  },
  {
    name: "LINK",
    decimals: 18,
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  },
  {
    name: "MIC",
    decimals: 18,
    address: "0x368B3a58B5f49392e5C9E4C998cb0bB966752E51",
  },
  {
    name: "MIS",
    decimals: 18,
    address: "0x4b4D2e899658FB59b1D518b68fe836B100ee8958",
  },
  {
    name: "OGN",
    decimals: 18,
    address: "0x8207c1FfC5B6804F6024322CcF34F29c3541Ae26",
  },
  {
    name: "PASTA",
    decimals: 18,
    address: "0xE54f9E6Ab80ebc28515aF8b8233c1aeE6506a15E",
  },
  {
    name: "PYLON",
    decimals: 18,
    address: "0xD7B7d3C0bdA57723Fb54ab95Fd8F9EA033AF37f2",
  },
  {
    name: "RENBTC",
    decimals: 8,
    address: "0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D",
  },
  {
    name: "SBTC",
    decimals: 18,
    address: "0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6",
  },
  {
    name: "SUSD",
    decimals: 18,
    address: "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51",
  },
  {
    name: "SUSHI",
    decimals: 18,
    address: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
  },
  {
    name: "SWRV",
    decimals: 18,
    address: "0xB8BAa0e4287890a5F79863aB62b7F175ceCbD433",
  },
  {
    name: "TBTC",
    decimals: 18,
    address: "0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa",
  },
  {
    name: "TUSD",
    decimals: 18,
    address: "0x0000000000085d4780B73119b644AE5ecd22b376",
  },
  {
    name: "USDC",
    decimals: 6,
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  {
    name: "USDT",
    decimals: 6,
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
  {
    name: "UST",
    decimals: 18,
    address: "0xa47c8bf37f92aBed4A126BDA807A7b7498661acD",
  },
  {
    name: "WBTC",
    decimals: 8,
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  },
  {
    name: "WETH",
    decimals: 18,
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  {
    name: "yBUSD",
    decimals: 18,
    address: "0x04bC0Ab673d88aE9dbC9DA2380cB6B79C4BCa9aE",
  },
  {
    name: "yDAI",
    decimals: 18,
    address: "0x16de59092dAE5CcF4A1E6439D611fd0653f0Bd01",
  },
  {
    name: "yTUSD",
    decimals: 18,
    address: "0x73a052500105205d34Daf004eAb301916DA8190f",
  },
  {
    name: "yUSDC",
    decimals: 18,
    address: "0xd6aD7a6750A7593E092a9B218d66C0A814a3436e",
  },
  {
    name: "yUSDT",
    decimals: 18,
    address: "0x83f798e925BcD4017Eb265844FDDAbb448f1707D",
  },
  {
    name: "YFI",
    decimals: 18,
    address: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
  },
  {
    name: "YFII",
    decimals: 18,
    address: "0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83",
  },
  {
    name: "YFV",
    decimals: 18,
    address: "0x45f24BaEef268BB6d63AEe5129015d69702BCDfa",
  },
  {
    name: "AMPL_ETH_LP",
    type: "uniswap",
    decimals: 18,
    address: "0xc5be99A02C6857f9Eac67BbCE58DF5572498F40c",
  },
  {
    name: "FARM_USDC_LP",
    type: "uniswap",
    decimals: 18,
    address: "0x514906FC121c7878424a5C928cad1852CC545892",
  },
  {
    name: "BAC_DAI_LP",
    type: "uniswap",
    decimals: 18,
    address: "0xd4405F0704621DBe9d4dEA60E128E0C3b26bddbD",
  },
  {
    name: "BASED_SUSD_LP",
    type: "uniswap",
    decimals: 18,
    address: "0xaAD22f5543FCDaA694B68f94Be177B561836AE57",
  },
  {
    name: "DAI_BAS_LP",
    type: "uniswap",
    decimals: 18,
    address: "0x0379dA7a5895D13037B6937b109fA8607a659ADF",
  },
  {
    name: "MIC_USDT_SLP",
    type: "uniswap",
    decimals: 18,
    address: "0xC9cB53B48A2f3A9e75982685644c1870F1405CCb"
  },
  {
    name: "MIS_USDT_SLP",
    type: "uniswap",
    decimals: 18,
    address: "0x066F3A3B7C8Fa077c71B9184d862ed0A4D5cF3e0",
  },
  {
    name: "WETH_DPI_LP",
    type: "uniswap",
    decimals: 18,
    address: "0x4d5ef58aAc27d99935E5b6B4A6778ff292059991",
  },
  {
    name: "PASTA_ETH_LP",
    type: "uniswap",
    decimals: 18,
    address: "0xE92346d9369Fe03b735Ed9bDeB6bdC2591b8227E",
  },
  {
    name: "WETH_DAI_LP",
    type: "uniswap",
    decimals: 18,
    address: "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11",
  },
  {
    name: "WETH_USDC_LP",
    type: "uniswap",
    decimals: 18,
    address: "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc",
  },
  {
    name: "WETH_USDT_LP",
    type: "uniswap",
    decimals: 18,
    address: "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852",
  },
  {
    name: "WETH_WBTC_LP",
    type: "uniswap",
    decimals: 18,
    address: "0xBb2b8038a1640196FbE3e38816F3e67Cba72D940",
  },
  {
    name: "WETH_DAI_SLP",
    type: "uniswap",
    decimals: 18,
    address: "0xC3D03e4F041Fd4cD388c549Ee2A29a9E5075882f",
  },
  {
    name: "WBTC_TBTC_SLP",
    type: "uniswap",
    decimals: 18,
    address: "0x2Dbc7dD86C6cd87b525BD54Ea73EBeeBbc307F68",
  },
  {
    name: "WETH_USDC_SLP",
    type: "uniswap",
    decimals: 18,
    address: "0x397FF1542f962076d0BFE58eA045FfA2d347ACa0",
  },
  {
    name: "WETH_USDT_SLP",
    type: "uniswap",
    decimals: 18,
    address: "0x06da0fd433C1A5d7a4faa01111c044910A184553",
  },
  {
    name: "WETH_WBTC_SLP",
    type: "uniswap",
    decimals: 18,
    address: "0xCEfF51756c56CeFFCA006cD410B03FFC46dd3a58",
  },
  {
    name: "BAL_80_USDC_20_FARM",
    type: "balancer",
    decimals: 18,
    address: "0x0126CfA7EC6B6d4A960b5979943c06a9742af55E",
  },
  {
    name: "BAL_90_SWRV_10_FARM",
    type: "balancer",
    decimals: 18,
    address: "0xf9F2dF6e0e369145481a32Fcd260E353AA20c1a6",
  },
  {
    name: "BAL_90_CRV_10_FARM",
    type: "balancer",
    decimals: 18,
    address: "0xac6bac9Dc3de2c14b420E287De8ECB330d96E492",
  },
  {
    name: "BAL_90_SUSHI_10_FARM",
    type: "balancer",
    decimals: 18,
    address: "0xB39Ce7fa5953beBC6697112e88cd11579CBCA579",
  },
  {
    name: "BAL_90_YFV_10_FARM",
    type: "balancer",
    decimals: 18,
    address: "0x97cD8E51cd6C888567c6c620188B8Fb264EE8E91",
  },
  {
    name: "BAL_90_LINK_10_FARM",
    type: "balancer",
    decimals: 18,
    address: "0x418d3DfcA5099923Cd57e0Bf9Ed1e9994f515152",
  },
  {
    name: "BAL_90_PYLON_10_FARM",
    type: "balancer",
    decimals: 18,
    address: "0x1e2dA0aa71155726C5C0E39AF76Ac0c2e8F74bEF",
  },
  {
    name: "BAL_90_BASED_SUSD_LP_10_FARM",
    type: "balancer",
    decimals: 18,
    address: "0xf76206115617f090f5a49961a78BCf99BB91cFeE",
  },
  {
    name: "BAL_90_PASTA_ETH_LP_10_FARM",
    type: "balancer",
    decimals: 18,
    address: "0xa3e69eBCE417eE0508d6996340126aD60078fCDd",
  },
  {
    name: "BAL_90_AMPL_ETH_LP_10_FARM",
    type: "balancer",
    decimals: 18,
    address: "0xdFb341093ea062a74Bd19a222c74Abdcb97C067b",
  },
  {
    name: "BAL_95_USDC_5_FARM",
    type: "balancer",
    decimals: 18,
    address: "0x0395e4A17fF11D36DaC9959f2D7c8Eca10Fe89c9",
  },
  {
    name: "CRPT_80_FARM_20_WETH",
    type: "balancer",
    decimals: 18,
    address: "0x655AD905dEc61E4Fb7d4840a1F450685801511b2",
  },
  {
    name: "fUSDC_USDC_LP",
    type: "uniswap",
    decimals: 18,
    address: "0x4161Fa43eaA1Ac3882aeeD12C5FC05249e533e67",
  },
  {
    name: "fUSDT_USDT_LP",
    type: "uniswap",
    decimals: 18,
    address: "0x713f62ccf8545Ff1Df19E5d7Ab94887cFaf95677",
  },
  {
    name: "fDAI_DAI_LP",
    type: "uniswap",
    decimals: 18,
    address: "0x007E383BF3c3Ffa12A5De06a53BAb103335eFF28",
  },
  {
    name: "fWETH_WETH_LP",
    type: "uniswap",
    decimals: 18,
    address: "0x24b34098F6950a5d5B6BbE1358AD79B609B924fB",
  },
  {
    name: "fWBTC_WBTC_LP",
    type: "uniswap",
    decimals: 18,
    address: "0xaebfeA924DE4080C14DF5C432cECe261934457E0",
  },
  {
    name: "fRENBTC_WBTC_LP",
    type: "uniswap",
    decimals: 18,
    address: "0x007F74c5C82d68A138Cc3Bc623E51270279fa525",
  },
  {
    name: "fCRV-RENWBTC_WBTC_LP",
    type: "uniswap",
    decimals: 18,
    address: "0xb6A6a3D8EF31D9FAeb1AB1487aCe79Fe1f5df1BB",
  },
  {
    name: "GRAIN_FARM_LP",
    type: "uniswap",
    decimals: 18,
    address: "0xB9Fa44B0911F6D777faAb2Fa9d8Ef103f25Ddf49",
  },
  {
    name: "FARM_WETH_LP",
    type: "uniswap",
    decimals: 18,
    address: "0x56feAccb7f750B997B36A68625C7C596F0B41A58",
  },
  {
    name: "1INCH_ETH-DAI_LP",
    //type: "uniswap", // disable until ETH is handled properly
    decimals: 18,
    address: "0x7566126f2fD0f2Dddae01Bb8A6EA49b760383D5A",
  },
  {
    name: "1INCH_ETH-WBTC_LP",
    //type: "uniswap", // disable until ETH is handled properly
    decimals: 18,
    address: "0x6a11F3E5a01D129e566d783A7b6E8862bFD66CcA",
  },
  {
    name: "1INCH_ETH-USDT_LP",
    //type: "uniswap", // disable until ETH is handled properly
    decimals: 18,
    address: "0xbBa17b81aB4193455Be10741512d0E71520F43cB",
  },
  {
    name: "1INCH_ETH-USDC_LP",
    //type: "uniswap", // disable until ETH is handled properly
    decimals: 18,
    address: "0xb4dB55a20E0624eDD82A0Cf356e3488B4669BD27",
  },
  {
    name: "UNI_DAI-BSGS_LP",
    //type: "uniswap", // disable until it's in Coingecko
    decimals: 18,
    address: "0x980a07E4F64d21a0cB2eF8D4AF362a79b9f5c0DA",
  },
  {
    name: "UNI_DAI-BSG_LP",
    //type: "uniswap", // disable until it's in Coingecko
    decimals: 18,
    address: "0x4A9596E5d2f9bEF50E4De092AD7181aE3C40353e",
  },
  {
    name: "UNI_MTSLA-UST_LP",
    //type: "uniswap", // disable until it's in Coingecko
    decimals: 18,
    address: "0x5233349957586A8207c52693A959483F9aeAA50C",
  },
  {
    name: "UNI_MGOOGL-UST_LP",
    //type: "uniswap", // disable until it's in Coingecko
    decimals: 18,
    address: "0x4b70ccD1Cf9905BE1FaEd025EADbD3Ab124efe9a",
  },
  {
    name: "UNI_MAMZN-UST_LP",
    //type: "uniswap", // disable until it's in Coingecko
    decimals: 18,
    address: "0x0Ae8cB1f57e3b1b7f4f5048743710084AA69E796",
  },
  {
    name: "UNI_UST-MAAPL_LP",
    //type: "uniswap", // disable until it's in Coingecko
    decimals: 18,
    address: "0xB022e08aDc8bA2dE6bA4fECb59C6D502f66e953B",
  },
];

/**
 * @param {String} name the name of the asset to find
 * @return {Object} the asset object
 */
function assetByName(name) {
  return assets.find((asset) => asset.name === name);
}

/**
 * @param {String} address the address of the asset to find
 * @return {Object} the asset object
 */
function assetByAddress(address) {
  return assets.find(
    (asset) => asset.address.toLowerCase() === address.toLowerCase(),
  );
}

// TODO: refactor and improve
// RATIONALE: want to use assetByName, so need to initialize it first
assets.push({
  name: "CRV-RENWBTC",
  decimals: 18,
  type: "curve",
  curveInfo: {
    poolAddress: "0x93054188d876f558f4a66b2ef1d97d16edf0895b",
    assets: [assetByName("WBTC"), assetByName("RENBTC")],
  },
  address: "0x49849C98ae39Fff122806C06791Fa73784FB3675",
});
assets.push({
  name: "CRV-RENWSBTC",
  decimals: 18,
  type: "curve",
  curveInfo: {
    poolAddress: "0x7fC77b5c7614E1533320Ea6DDc2Eb61fa00A9714",
    assets: [assetByName("WBTC"), assetByName("RENBTC"), assetByName("SBTC")],
  },
  address: "0x075b1bb99792c9E1041bA13afEf80C91a1e70fB3",
});
assets.push({
  name: "CRV-TBTC",
  decimals: 18,
  type: "curve",
  curveInfo: {
    poolAddress: "0xC25099792E9349C7DD09759744ea681C7de2cb66",
    assets: [assetByName("TBTC"), assetByName("CRV-RENWSBTC")],
  },
  address: "0x64eda51d3Ad40D56b9dFc5554E06F94e1Dd786Fd",
});
assets.push({
  name: "CRV-3POOL",
  decimals: 18,
  type: "curve",
  curveInfo: {
    poolAddress: "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7",
    assets: [assetByName("DAI"), assetByName("USDC"), assetByName("USDT")],
  },
  address: "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490",
});
assets.push({
  name: "CRV-HBTC",
  decimals: 18,
  type: "curve",
  curveInfo: {
    poolAddress: "0x4CA9b3063Ec5866A4B82E437059D2C43d1be596F",
    assets: [assetByName("HBTC"), assetByName("WBTC")],
  },
  address: "0xb19059ebb43466C323583928285a49f558E572Fd",
});
assets.push({
  name: "CRV-HUSD",
  decimals: 18,
  type: "curve",
  curveInfo: {
    poolAddress: "0x3eF6A01A0f81D6046290f3e2A8c5b843e738E604",
    assets: [assetByName("HUSD"), assetByName("CRV-3POOL")],
  },
  address: "0x5B5CFE992AdAC0C9D48E05854B2d91C73a003858",
});
//assets.push({
//  name: 'CRV-YPOOL',
//  decimals: 18,
//  type: 'curve',
//  curveInfo: {
//    poolAddress: '0x45F783CCE6B7FF23B2ab2D70e416cdb7D6055f51',
//    assets: [
//      assetByName('DAI'),
//      assetByName('USDC'),
//      assetByName('USDT'),
//      assetByName('TUSD'),
//    ],
//  },
//  address: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
//});
// disabled as Curve pool until underlying are available in Coingecko
//assets.push({
//  name: 'CRV-USDN',
//  decimals: 18,
//  type: 'curve',
//  curveInfo: {
//    poolAddress: '0x0f9cb53Ebe405d49A0bbdBD291A65Ff571bC83e1',
//    assets: [
//      assetByName('USDN'),
//      assetByName('CRV-3POOL'),
//    ],
//  },
//  address: '0x4f3E8F405CF5aFC05D68142F3783bDfE13811522',
//});
//assets.push({
//  name: 'CRV-BUSD',
//  decimals: 18,
//  type: 'curve',
//  curveInfo: {
//    poolAddress: '0x79a8C46DeA5aDa233ABaFFD40F3A0A2B1e5A4F27',
//    assets: [
//assetByName('yBUSD'),
//assetByName('yDAI'),
//assetByName('yUSDC'),
//assetByName('yUSDT'),
//    ],
//  },
//  address: '0x3B3Ac5386837Dc563660FB6a0937DFAa5924333B',
//});
//assets.push({
//  name: 'CRV-COMPOUND',
//  decimals: 18,
//  type: 'curve',
//  curveInfo: {
//    poolAddress: '0xA2B47E3D5c44877cca798226B7B8118F9BFb7A56',
//    assets: [
//      assetByName('cDAI'),
//      assetByName('cUSDC'),
//    ],
//  },
//  address: '0x845838DF265Dcd2c412A1Dc9e959c7d08537f8a2',
//});
assets.push({
  name: "fWETH_USDT_LP_v0",
  type: "ftoken",
  underlyingAsset: assetByName("WETH_USDT_LP"),
  decimals: 18,
  address: "0xb19ebfb37a936cce783142955d39ca70aa29d43c",
});
assets.push({
  name: "fWETH_USDC_LP_v0",
  type: "ftoken",
  underlyingAsset: assetByName("WETH_USDC_LP"),
  decimals: 18,
  address: "0x63671425ef4d25ec2b12c7d05de855c143f16e3b",
});
assets.push({
  name: "fWETH_DAI_LP_v0",
  type: "ftoken",
  underlyingAsset: assetByName("WETH_DAI_LP"),
  decimals: 18,
  address: "0x1a9f22b4c385f78650e7874d64e442839dc32327",
});
assets.push({
  name: "fWETH_WBTC_LP_v0",
  type: "ftoken",
  underlyingAsset: assetByName("WETH_WBTC_LP"),
  decimals: 18,
  address: "0xb1feb6ab4ef7d0f41363da33868e85eb0f3a57ee",
});
assets.push({
  name: "fWETH_USDT_LP",
  type: "ftoken",
  underlyingAsset: assetByName("WETH_USDT_LP"),
  decimals: 18,
  address: "0x7DDc3ffF0612E75Ea5ddC0d6Bd4e268f70362Cff",
});
assets.push({
  name: "fWETH_USDC_LP",
  type: "ftoken",
  underlyingAsset: assetByName("WETH_USDC_LP"),
  decimals: 18,
  address: "0xA79a083FDD87F73c2f983c5551EC974685D6bb36",
});
assets.push({
  name: "fWETH_DAI_LP",
  type: "ftoken",
  underlyingAsset: assetByName("WETH_DAI_LP"),
  decimals: 18,
  address: "0x307E2752e8b8a9C29005001Be66B1c012CA9CDB7",
});
assets.push({
  name: "fWETH_WBTC_LP",
  type: "ftoken",
  underlyingAsset: assetByName("WETH_WBTC_LP"),
  decimals: 18,
  address: "0x01112a60f427205dcA6E229425306923c3Cc2073",
});
assets.push({
  name: "fWETH_DPI_LP",
  type: "ftoken",
  underlyingAsset: assetByName("WETH_DPI_LP"),
  decimals: 18,
  address: "0x2a32dcBB121D48C106F6d94cf2B4714c0b4Dfe48",
});
assets.push({
  name: "fBAC_DAI_LP",
  type: "ftoken",
  underlyingAsset: assetByName("BAC_DAI_LP"),
  decimals: 18,
  address: "0x6Bccd7E983E438a56Ba2844883A664Da87E4C43b",
});
assets.push({
  name: "fDAI_BAS_LP",
  type: "ftoken",
  underlyingAsset: assetByName("DAI_BAS_LP"),
  decimals: 18,
  address: "0xf8b7235fcfd5a75cfdcc0d7bc813817f3dd17858",
});
assets.push({
  name: "fSLP_WBTC_TBTC",
  type: "ftoken",
  underlyingAsset: assetByName("WBTC_TBTC_SLP"),
  decimals: 18,
  address: "0xF553E1f826f42716cDFe02bde5ee76b2a52fc7EB",
});
assets.push({
  name: "fSLP_WETH_DAI",
  type: "ftoken",
  underlyingAsset: assetByName("WETH_DAI_SLP"),
  decimals: 18,
  address: "0x203E97aa6eB65A1A02d9E80083414058303f241E",
});
assets.push({
  name: "fSLP_WETH_USDT",
  type: "ftoken",
  underlyingAsset: assetByName("WETH_USDT_SLP"),
  decimals: 18,
  address: "0x64035b583c8c694627A199243E863Bb33be60745",
});
assets.push({
  name: "fSLP_WETH_USDC",
  type: "ftoken",
  underlyingAsset: assetByName("WETH_USDC_SLP"),
  decimals: 18,
  address: "0x01bd09A1124960d9bE04b638b142Df9DF942b04a",
});
assets.push({
  name: "fSLP_WETH_WBTC",
  type: "ftoken",
  underlyingAsset: assetByName("WETH_WBTC_SLP"),
  decimals: 18,
  address: "0x5C0A3F55AAC52AA320Ff5F280E77517cbAF85524",
});
assets.push({
  name: "fSLP_MIC_USDT",
  type: "ftoken",
  underlyingAsset: assetByName("MIC_USDT_SLP"), /*<- underlying asset is a LP token*/
  decimals: 18,
  address: "0x6F14165c6D529eA3Bfe1814d0998449e9c8D157D",/* <- VaultProxy*/
});
assets.push({
  name: "fSLP_MIS_USDT",
  type: "ftoken",
  underlyingAsset: assetByName("MIS_USDT_SLP"),
  decimals: 18,
  address: "0x145f39B3c6e6a885AA6A8fadE4ca69d64bab69c8",
});
assets.push({
  name: "fWETH_v0",
  type: "ftoken",
  underlyingAsset: assetByName("WETH"),
  decimals: 18,
  address: "0x8e298734681adbfc41ee5d17ff8b0d6d803e7098",
});
assets.push({
  name: "fWETH",
  type: "ftoken",
  underlyingAsset: assetByName("WETH"),
  decimals: 18,
  address: "0xFE09e53A81Fe2808bc493ea64319109B5bAa573e",
});
assets.push({
  name: "fDAI_v0",
  type: "ftoken",
  underlyingAsset: assetByName("DAI"),
  decimals: 18,
  address: "0xe85c8581e60d7cd32bbfd86303d2a4fa6a951dac",
});
assets.push({
  name: "fDAI",
  type: "ftoken",
  underlyingAsset: assetByName("DAI"),
  decimals: 18,
  address: "0xab7fa2b2985bccfc13c6d86b1d5a17486ab1e04c",
});
assets.push({
  name: "fUSDC_v0",
  type: "ftoken",
  underlyingAsset: assetByName("USDC"),
  decimals: 6,
  address: "0xc3f7ffb5d5869b3ade9448d094d81b0521e8326f",
});
assets.push({
  name: "fUSDC",
  type: "ftoken",
  underlyingAsset: assetByName("USDC"),
  decimals: 6,
  address: "0xf0358e8c3CD5Fa238a29301d0bEa3D63A17bEdBE",
});
assets.push({
  name: "fUSDT_v0",
  type: "ftoken",
  underlyingAsset: assetByName("USDT"),
  decimals: 6,
  address: "0xc7ee21406bb581e741fbb8b21f213188433d9f2f",
});
assets.push({
  name: "fUSDT",
  type: "ftoken",
  underlyingAsset: assetByName("USDT"),
  decimals: 6,
  address: "0x053c80eA73Dc6941F518a68E2FC52Ac45BDE7c9C",
});
assets.push({
  name: "fTUSD",
  type: "ftoken",
  underlyingAsset: assetByName("TUSD"),
  decimals: 18,
  address: "0x7674622c63Bee7F46E86a4A5A18976693D54441b",
});
assets.push({
  name: "fWBTC_v0",
  type: "ftoken",
  underlyingAsset: assetByName("WBTC"),
  decimals: 8,
  address: "0xc07EB91961662D275E2D285BdC21885A4Db136B0",
});
assets.push({
  name: "fWBTC",
  type: "ftoken",
  underlyingAsset: assetByName("WBTC"),
  decimals: 8,
  address: "0x5d9d25c7C457dD82fc8668FFC6B9746b674d4EcB",
});
assets.push({
  name: "fRENBTC_v0",
  type: "ftoken",
  underlyingAsset: assetByName("RENBTC"),
  decimals: 8,
  address: "0xfBe122D0ba3c75e1F7C80bd27613c9f35B81FEeC",
});
assets.push({
  name: "fRENBTC",
  type: "ftoken",
  underlyingAsset: assetByName("RENBTC"),
  decimals: 8,
  address: "0xC391d1b08c1403313B0c28D47202DFDA015633C4",
});
assets.push({
  name: "fCRV-RENWBTC_v0",
  type: "ftoken",
  underlyingAsset: assetByName("CRV-RENWBTC"),
  decimals: 18,
  address: "0x192E9d29D43db385063799BC239E772c3b6888F3",
});
assets.push({
  name: "fCRV-RENWBTC",
  type: "ftoken",
  underlyingAsset: assetByName("CRV-RENWBTC"),
  decimals: 18,
  address: "0x9aA8F427A17d6B0d91B6262989EdC7D45d6aEdf8",
});
assets.push({
  name: "fCRV-TBTC",
  type: "ftoken",
  underlyingAsset: assetByName("CRV-TBTC"),
  decimals: 18,
  address: "0x640704D106E79e105FDA424f05467F005418F1B5",
});
assets.push({
  name: "fCRV-3POOL",
  type: "ftoken",
  underlyingAsset: assetByName("CRV-3POOL"),
  decimals: 18,
  address: "0x71B9eC42bB3CB40F017D8AD8011BE8e384a95fa5",
});
assets.push({
  name: "fCRV-YPOOL",
  type: "ftoken",
  underlyingAsset: assetByName("CRV-YPOOL"),
  decimals: 18,
  address: "0x0FE4283e0216F94f5f9750a7a11AC54D3c9C38F3",
});
assets.push({
  name: "fCRV-USDN",
  type: "ftoken",
  underlyingAsset: assetByName("CRV-USDN"),
  decimals: 18,
  address: "0x683E683fBE6Cf9b635539712c999f3B3EdCB8664",
});
assets.push({
  name: "fCRV-BUSD",
  type: "ftoken",
  underlyingAsset: assetByName("CRV-BUSD"),
  decimals: 18,
  address: "0x4b1cBD6F6D8676AcE5E412C78B7a59b4A1bbb68a",
});
assets.push({
  name: "fCRV-COMPOUND",
  type: "ftoken",
  underlyingAsset: assetByName("CRV-COMPOUND"),
  decimals: 18,
  address: "0x998cEb152A42a3EaC1f555B1E911642BeBf00faD",
});
assets.push({
  name: "fCRV-HUSD",
  type: "ftoken",
  underlyingAsset: assetByName("CRV-HUSD"),
  decimals: 18,
  address: "0x29780C39164Ebbd62e9DDDE50c151810070140f2",
});
assets.push({
  name: "fCRV-HBTC",
  type: "ftoken",
  underlyingAsset: assetByName("CRV-HBTC"),
  decimals: 18,
  address: "0xCC775989e76ab386E9253df5B0c0b473E22102E2",
});
assets.push({
  name: "fCRV-OBTC",
  type: "ftoken",
  underlyingAsset: assetByName("CRV-OBTC"),
  decimals: 18,
  address: "0x966A70A4d3719A6De6a94236532A0167d5246c72",
});
assets.push({
  name: "f1INCH_ETH-DAI_LP",
  type: "ftoken",
  underlyingAsset: assetByName("1INCH_ETH-DAI_LP"),
  decimals: 18,
  address: "0x8e53031462E930827a8d482e7d80603B1f86e32d",
});
assets.push({
  name: "f1INCH_ETH-WBTC_LP",
  type: "ftoken",
  underlyingAsset: assetByName("1INCH_ETH-WBTC_LP"),
  decimals: 18,
  address: "0x859222DD0B249D0ea960F5102DaB79B294d6874a",
});
assets.push({
  name: "f1INCH_ETH-USDT_LP",
  type: "ftoken",
  underlyingAsset: assetByName("1INCH_ETH-USDT_LP"),
  decimals: 18,
  address: "0x4bf633A09bd593f6fb047Db3B4C25ef5B9C5b99e",
});
assets.push({
  name: "f1INCH_ETH-USDC_LP",
  type: "ftoken",
  underlyingAsset: assetByName("1INCH_ETH-USDC_LP"),
  decimals: 18,
  address: "0xD162395C21357b126C5aFED6921BC8b13e48D690",
});
assets.push({
  name: "fCRV-EURS",
  type: "ftoken",
  underlyingAsset: assetByName("CRV-EURS"),
  decimals: 18,
  address: "0x6eb941BD065b8a5bd699C5405A928c1f561e2e5a",
});
assets.push({
  name: "fCRV-UST",
  type: "ftoken",
  underlyingAsset: assetByName("CRV-UST"),
  decimals: 18,
  address: "0x84A1DfAdd698886A614fD70407936816183C0A02",
});
assets.push({
  name: "fUNI-DAI:BSGS",
  type: "ftoken",
  underlyingAsset: assetByName("UNI_DAI-BSGS_LP"),
  decimals: 18,
  address: "0x633C4861A4E9522353EDa0bb652878B079fb75Fd",
});
assets.push({
  name: "fUNI-DAI:BSG",
  type: "ftoken",
  underlyingAsset: assetByName("UNI_DAI-BSG_LP"),
  decimals: 18,
  address: "0x639d4f3F41daA5f4B94d63C2A5f3e18139ba9E54",
});
assets.push({
  name: "fDSD",
  type: "ftoken",
  underlyingAsset: assetByName("DSD"),
  decimals: 18,
  address: "0x8Bf3c1c7B1961764Ecb19b4FC4491150ceB1ABB1",
});
assets.push({
  name: "fESD",
  type: "ftoken",
  underlyingAsset: assetByName("ESD"),
  decimals: 18,
  address: "0x45a9e027DdD8486faD6fca647Bb132AD03303EC2",
});
assets.push({
  name: "fBAC",
  type: "ftoken",
  underlyingAsset: assetByName("BAC"),
  decimals: 18,
  address: "0x371E78676cd8547ef969f89D2ee8fA689C50F86B",
});
assets.push({
  name: "fCRV-stETH",
  type: "ftoken",
  underlyingAsset: assetByName("CRV-STETH"),
  decimals: 18,
  address: "0xc27bfE32E0a934a12681C1b35acf0DBA0e7460Ba",
});
assets.push({
  name: "fUNI-mTSLA:UST",
  type: "ftoken",
  underlyingAsset: assetByName("UNI_MTSLA-UST_LP"),
  decimals: 18,
  address: "0xC800982d906671637E23E031e907d2e3487291Bc",
});
assets.push({
  name: "fUNI-mGOOGL:UST",
  type: "ftoken",
  underlyingAsset: assetByName("UNI_MGOOGL-UST_LP"),
  decimals: 18,
  address: "0x07DBe6aA35EF70DaD124f4e2b748fFA6C9E1963a",
});
assets.push({
  name: "fUNI-mAMZN:UST",
  type: "ftoken",
  underlyingAsset: assetByName("UNI_MAMZN-UST_LP"),
  decimals: 18,
  address: "0x8334A61012A779169725FcC43ADcff1F581350B7",
});
assets.push({
  name: "fUNI-UST:mAAPL",
  type: "ftoken",
  underlyingAsset: assetByName("UNI_UST-MAAPL_LP"),
  decimals: 18,
  address: "0x11804D69AcaC6Ae9466798325fA7DE023f63Ab53",
});

// name overrides asset.name for display
const weekOnePools = [
  {
    name: "Profit Sharing v1",
    asset: assetByName("FARM"),
    address: "0xae024F29C26D6f71Ec71658B1980189956B0546D",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "FARM:USDC Uniswap",
    asset: assetByName("FARM_USDC_LP"),
    address: "0x99b0d6641A63Ce173E6EB063b3d3AED9A35Cf9bf",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI_v0"),
    address: "0xF9E5f9024c2f3f2908A1d0e7272861a767C9484b",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC_v0"),
    address: "0xE1f9A3EE001a2EcC906E8de637DBf20BB2d44633",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT_v0"),
    address: "0x5bd997039FFF16F653EF15D1428F2C791519f58d",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("BAL_95_USDC_5_FARM"),
    address: "0x6f8A975758436A5Ec38d2f9d2336504430465517",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("WETH"),
    address: "0xE604Fd5b1317BABd0cF2c72F7F5f2AD8c00Adbe1",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("YFI"),
    address: "0x84646F736795a8bC22Ab34E05c8982CD058328C7",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("YFII"),
    address: "0xC97DDAa8091aBaF79A4910b094830CCE5cDd78f4",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("YFV"),
    address: "0x3631A32c959C5c52BC90AB5b7D212a8D00321918",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("LINK"),
    address: "0xa112c2354d27c2Fb3370cc5d027B28987117a268",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("SUSHI"),
    address: "0x4938960C507A4d7094C53A8cDdCF925835393B8f",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("OGN"),
    address: "0xF71042C88458ff1702c3870f62F4c764712Cc9F0",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("BASED_SUSD_LP"),
    address: "0xb3b56c7BDc87F9DeB7972cD8b5c09329ce421F89",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("PASTA_ETH_LP"),
    address: "0xC6f39CFf6797baC5e29275177b6E8e315cF87D95",
    rewardAsset: assetByName("FARM"),
  },
];

const weekTwoPools = [
  {
    name: "Profit Sharing v2",
    asset: assetByName("FARM"),
    address: "0x59258F4e15A5fC74A7284055A8094F58108dbD4f",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "FARM:USDC Uniswap",
    asset: assetByName("FARM_USDC_LP"),
    address: "0x99b0d6641A63Ce173E6EB063b3d3AED9A35Cf9bf",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI_v0"),
    address: "0xF9E5f9024c2f3f2908A1d0e7272861a767C9484b",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC_v0"),
    address: "0xE1f9A3EE001a2EcC906E8de637DBf20BB2d44633",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT_v0"),
    address: "0x5bd997039FFF16F653EF15D1428F2C791519f58d",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC_v0"),
    address: "0x6291eCe696CB6682a9bb1d42fca4160771b1D7CC",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC_v0"),
    address: "0xCFE1103863F9e7Cf3452Ca8932Eef44d314bf9C5",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC_v0"),
    address: "0x5365A2C47b90EE8C9317faC20edC3ce7037384FB",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC_USDC_LP"),
    address: "0x43286F57cf5981a5db56828dF91a46CfAb983E58",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT_USDT_LP"),
    address: "0x316De40F36da4C54AFf11C1D83081555Cca41270",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI_DAI_LP"),
    address: "0xB492fAEdA6c9FFb9B9854a58F28d5333Ff7a11bc",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("BAL_80_USDC_20_FARM"),
    address: "0x346523a81f16030110e6C858Ee0E11F156840BD1",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("BAL_90_SWRV_10_FARM"),
    address: "0x44356324864A30216e89193bc8b0F6309227d690",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("BAL_90_CRV_10_FARM"),
    address: "0x45A760B3E83FF8C107C4df955b1483De0982F393",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("BAL_90_SUSHI_10_FARM"),
    address: "0x26582BeA67B30AF166b7FCD3424Ba1E0638Ab136",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("BAL_90_YFV_10_FARM"),
    address: "0x158edB94D0bfC093952fB3009DeeED613042907c",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("BAL_90_LINK_10_FARM"),
    address: "0x19f8cE19c9730A1d0db5149e65E48c2f0DAa9919",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("BAL_90_PYLON_10_FARM"),
    address: "0x2f97D9f870a773186CB01742Ff298777BBF6f244",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("BAL_90_BASED_SUSD_LP_10_FARM"),
    address: "0xf465573288D9D89C6E89b1bc3BC9ce2b997E77dF",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("BAL_90_PASTA_ETH_LP_10_FARM"),
    address: "0xB4D1D6150dAc0D1A994AfB2A196adadBE639FF95",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("BAL_90_AMPL_ETH_LP_10_FARM"),
    address: "0x7AF4458D3aBD61C3fd187Bb9f1Bbf917Cd4be9B8",
    rewardAsset: assetByName("FARM"),
  },
];

const weekThreePools = [
  {
    name: "Profit Sharing v2",
    asset: assetByName("FARM"),
    address: "0x59258F4e15A5fC74A7284055A8094F58108dbD4f",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "FARM:USDC Uniswap",
    asset: assetByName("FARM_USDC_LP"),
    address: "0x99b0d6641A63Ce173E6EB063b3d3AED9A35Cf9bf",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_v0"),
    address: "0xe11c81b924bb91b44bae19793539054b48158a9d",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI_v0"),
    address: "0xF9E5f9024c2f3f2908A1d0e7272861a767C9484b",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC_v0"),
    address: "0xE1f9A3EE001a2EcC906E8de637DBf20BB2d44633",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT_v0"),
    address: "0x5bd997039FFF16F653EF15D1428F2C791519f58d",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC_v0"),
    address: "0x6291eCe696CB6682a9bb1d42fca4160771b1D7CC",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC_v0"),
    address: "0xCFE1103863F9e7Cf3452Ca8932Eef44d314bf9C5",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC_v0"),
    address: "0x5365A2C47b90EE8C9317faC20edC3ce7037384FB",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_WETH_LP"),
    address: "0x82bdac405762482f9411a7d970841ce55f64e04b",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC_USDC_LP"),
    address: "0x43286F57cf5981a5db56828dF91a46CfAb983E58",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI_DAI_LP"),
    address: "0xB492fAEdA6c9FFb9B9854a58F28d5333Ff7a11bc",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT_USDT_LP"),
    address: "0x316De40F36da4C54AFf11C1D83081555Cca41270",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC_WBTC_LP"),
    address: "0xbb846ad2552c0669062c9eadfa63148bcba3e2b0",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC_WBTC_LP"),
    address: "0x298a92daf7c71ced261c79300a620e8bee54daa6",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC_WBTC_LP"),
    address: "0x489c78aa0969118439176c14af22b3b56bd1d46e",
    rewardAsset: assetByName("FARM"),
  },
];

const weekFourPools = [
  {
    name: "Profit Sharing v2",
    asset: assetByName("FARM"),
    address: "0x59258F4e15A5fC74A7284055A8094F58108dbD4f",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "FARM:USDC Uniswap",
    asset: assetByName("FARM_USDC_LP"),
    address: "0x99b0d6641A63Ce173E6EB063b3d3AED9A35Cf9bf",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_v0"),
    address: "0xe11c81b924bb91b44bae19793539054b48158a9d",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI_v0"),
    address: "0xF9E5f9024c2f3f2908A1d0e7272861a767C9484b",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC_v0"),
    address: "0xE1f9A3EE001a2EcC906E8de637DBf20BB2d44633",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT_v0"),
    address: "0x5bd997039FFF16F653EF15D1428F2C791519f58d",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC_v0"),
    address: "0x6291eCe696CB6682a9bb1d42fca4160771b1D7CC",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC_v0"),
    address: "0xCFE1103863F9e7Cf3452Ca8932Eef44d314bf9C5",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC_v0"),
    address: "0x5365A2C47b90EE8C9317faC20edC3ce7037384FB",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_USDT_LP_v0"),
    address: "0x9494a3026f28d0b189252428cebbfa52e69608c4",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_USDC_LP_v0"),
    address: "0xc24da7a6b5adc8771588d58b6109ef52c95a311e",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_DAI_LP_v0"),
    address: "0xdc27244311c56ed038e7acf104245ec6a040d07f",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_WBTC_LP_v0"),
    address: "0x3bdc3e2572a5540bb1eb1e55bb8749d33fd1a105",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("CRPT_80_FARM_20_WETH"),
    address: "0x8bcbf139b8d7b26f37d89f2c8aa9de810b5a3814",
    rewardAsset: assetByName("FARM"),
  },
];

const weekFivePools = [
  {
    name: "FARM Profit Sharing",
    asset: assetByName("FARM"),
    address: "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50",
    rewardAsset: assetByName("FARM"),
    type: "autocompounding",
  },
  {
    name: "FARM:USDC Uniswap",
    asset: assetByName("FARM_USDC_LP"),
    address: "0x99b0d6641A63Ce173E6EB063b3d3AED9A35Cf9bf",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_v0"),
    address: "0xe11c81b924bb91b44bae19793539054b48158a9d",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI_v0"),
    address: "0xF9E5f9024c2f3f2908A1d0e7272861a767C9484b",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC_v0"),
    address: "0xE1f9A3EE001a2EcC906E8de637DBf20BB2d44633",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT_v0"),
    address: "0x5bd997039FFF16F653EF15D1428F2C791519f58d",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC_v0"),
    address: "0x6291eCe696CB6682a9bb1d42fca4160771b1D7CC",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC_v0"),
    address: "0xCFE1103863F9e7Cf3452Ca8932Eef44d314bf9C5",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC_v0"),
    address: "0x5365A2C47b90EE8C9317faC20edC3ce7037384FB",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_USDT_LP_v0"),
    address: "0x9494a3026f28d0b189252428cebbfa52e69608c4",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_USDC_LP_v0"),
    address: "0xc24da7a6b5adc8771588d58b6109ef52c95a311e",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_DAI_LP_v0"),
    address: "0xdc27244311c56ed038e7acf104245ec6a040d07f",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_WBTC_LP_v0"),
    address: "0x3bdc3e2572a5540bb1eb1e55bb8749d33fd1a105",
    rewardAsset: assetByName("FARM"),
  },
];

const weekSixPools = [
  {
    name: "FARM Profit Sharing",
    asset: assetByName("FARM"),
    address: "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50",
    rewardAsset: assetByName("FARM"),
    type: "autocompounding",
  },
  {
    name: "FARM:USDC Uniswap",
    asset: assetByName("FARM_USDC_LP"),
    address: "0x99b0d6641A63Ce173E6EB063b3d3AED9A35Cf9bf",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_v0"),
    address: "0xe11c81b924bb91b44bae19793539054b48158a9d",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI_v0"),
    address: "0xF9E5f9024c2f3f2908A1d0e7272861a767C9484b",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC_v0"),
    address: "0xE1f9A3EE001a2EcC906E8de637DBf20BB2d44633",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT_v0"),
    address: "0x5bd997039FFF16F653EF15D1428F2C791519f58d",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC_v0"),
    address: "0x6291eCe696CB6682a9bb1d42fca4160771b1D7CC",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC_v0"),
    address: "0xCFE1103863F9e7Cf3452Ca8932Eef44d314bf9C5",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC_v0"),
    address: "0x5365A2C47b90EE8C9317faC20edC3ce7037384FB",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_USDT_LP_v0"),
    address: "0x9494a3026f28d0b189252428cebbfa52e69608c4",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_USDC_LP_v0"),
    address: "0xc24da7a6b5adc8771588d58b6109ef52c95a311e",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_DAI_LP_v0"),
    address: "0xdc27244311c56ed038e7acf104245ec6a040d07f",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_WBTC_LP_v0"),
    address: "0x3bdc3e2572a5540bb1eb1e55bb8749d33fd1a105",
    rewardAsset: assetByName("FARM"),
  },
];

const weekSevenPools = [
  {
    name: "FARM Profit Sharing",
    asset: assetByName("FARM"),
    address: "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50",
    rewardAsset: assetByName("FARM"),
    type: "autocompounding",
  },
  {
    name: "FARM:USDC Uniswap",
    asset: assetByName("FARM_USDC_LP"),
    address: "0x99b0d6641A63Ce173E6EB063b3d3AED9A35Cf9bf",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:USDT",
    asset: assetByName("fWETH_USDT_LP"),
    address: "0x75071F2653fBC902EBaff908d4c68712a5d1C960",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:USDC",
    asset: assetByName("fWETH_USDC_LP"),
    address: "0x156733b89Ac5C704F3217FEe2949A9D4A73764b5",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:DAI",
    asset: assetByName("fWETH_DAI_LP"),
    address: "0x7aeb36e22e60397098C2a5C51f0A5fB06e7b859c",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:WBTC",
    asset: assetByName("fWETH_WBTC_LP"),
    address: "0xF1181A71CC331958AE2cA2aAD0784Acfc436CB93",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-WBTC:TBTC",
    asset: assetByName("fSLP_WBTC_TBTC"),
    address: "0x9523FdC055F503F73FF40D7F66850F409D80EF34",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH_v0"),
    address: "0xe11c81b924bb91b44bae19793539054b48158a9d",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI_v0"),
    address: "0xF9E5f9024c2f3f2908A1d0e7272861a767C9484b",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC_v0"),
    address: "0xE1f9A3EE001a2EcC906E8de637DBf20BB2d44633",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT_v0"),
    address: "0x5bd997039FFF16F653EF15D1428F2C791519f58d",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC_v0"),
    address: "0x6291eCe696CB6682a9bb1d42fca4160771b1D7CC",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC_v0"),
    address: "0xCFE1103863F9e7Cf3452Ca8932Eef44d314bf9C5",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC_v0"),
    address: "0x5365A2C47b90EE8C9317faC20edC3ce7037384FB",
    rewardAsset: assetByName("FARM"),
  },
];

const weekEightPools = [
  {
    name: "FARM Profit Sharing",
    asset: assetByName("FARM"),
    address: "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50",
    rewardAsset: assetByName("FARM"),
    type: "autocompounding",
  },
  {
    name: "FARM:USDC Uniswap",
    asset: assetByName("FARM_USDC_LP"),
    address: "0x99b0d6641A63Ce173E6EB063b3d3AED9A35Cf9bf",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH"),
    address: "0x3DA9D911301f8144bdF5c3c67886e5373DCdff8e",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI"),
    address: "0x15d3A64B2d5ab9E152F16593Cdebc4bB165B5B4A",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC"),
    address: "0x4F7c28cCb0F1Dbd1388209C67eEc234273C878Bd",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT"),
    address: "0x6ac4a7AB91E6fD098E13B7d347c6d4d1494994a2",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC"),
    address: "0x917d6480Ec60cBddd6CbD0C8EA317Bcc709EA77B",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC"),
    address: "0x7b8Ff8884590f44e10Ea8105730fe637Ce0cb4F6",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC"),
    address: "0xA3Cf8D1CEe996253FAD1F8e3d68BDCba7B3A3Db5",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:USDT",
    asset: assetByName("fWETH_USDT_LP"),
    address: "0x75071F2653fBC902EBaff908d4c68712a5d1C960",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:USDC",
    asset: assetByName("fWETH_USDC_LP"),
    address: "0x156733b89Ac5C704F3217FEe2949A9D4A73764b5",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:DAI",
    asset: assetByName("fWETH_DAI_LP"),
    address: "0x7aeb36e22e60397098C2a5C51f0A5fB06e7b859c",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:WBTC",
    asset: assetByName("fWETH_WBTC_LP"),
    address: "0xF1181A71CC331958AE2cA2aAD0784Acfc436CB93",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-WBTC:TBTC",
    asset: assetByName("fSLP_WBTC_TBTC"),
    address: "0x9523FdC055F503F73FF40D7F66850F409D80EF34",
    rewardAsset: assetByName("FARM"),
  },
];

const weekTenPools = [
  {
    name: "FARM Profit Sharing",
    asset: assetByName("FARM"),
    address: "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50",
    rewardAsset: assetByName("FARM"),
    type: "autocompounding",
  },
  {
    name: "FARM:USDC Uniswap",
    asset: assetByName("FARM_USDC_LP"),
    address: "0x99b0d6641A63Ce173E6EB063b3d3AED9A35Cf9bf",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH"),
    address: "0x3DA9D911301f8144bdF5c3c67886e5373DCdff8e",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI"),
    address: "0x15d3A64B2d5ab9E152F16593Cdebc4bB165B5B4A",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC"),
    address: "0x4F7c28cCb0F1Dbd1388209C67eEc234273C878Bd",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT"),
    address: "0x6ac4a7AB91E6fD098E13B7d347c6d4d1494994a2",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC"),
    address: "0x917d6480Ec60cBddd6CbD0C8EA317Bcc709EA77B",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC"),
    address: "0x7b8Ff8884590f44e10Ea8105730fe637Ce0cb4F6",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC"),
    address: "0xA3Cf8D1CEe996253FAD1F8e3d68BDCba7B3A3Db5",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:USDT",
    asset: assetByName("fWETH_USDT_LP"),
    address: "0x75071F2653fBC902EBaff908d4c68712a5d1C960",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:USDC",
    asset: assetByName("fWETH_USDC_LP"),
    address: "0x156733b89Ac5C704F3217FEe2949A9D4A73764b5",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:DAI",
    asset: assetByName("fWETH_DAI_LP"),
    address: "0x7aeb36e22e60397098C2a5C51f0A5fB06e7b859c",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:WBTC",
    asset: assetByName("fWETH_WBTC_LP"),
    address: "0xF1181A71CC331958AE2cA2aAD0784Acfc436CB93",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-WBTC:TBTC",
    asset: assetByName("fSLP_WBTC_TBTC"),
    address: "0x9523FdC055F503F73FF40D7F66850F409D80EF34",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-3POOL"),
    address: "0x27F12d1a08454402175b9F0b53769783578Be7d9",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-YPOOL"),
    address: "0x6D1b6Ea108AA03c6993d8010690264BA96D349A8",
    rewardAsset: assetByName("FARM"),
  },
];

const weekElevenPools = [
  {
    name: "FARM Profit Sharing",
    asset: assetByName("FARM"),
    address: "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50",
    rewardAsset: assetByName("FARM"),
    type: "autocompounding",
  },
  {
    name: "FARM:USDC Uniswap",
    asset: assetByName("FARM_USDC_LP"),
    address: "0x99b0d6641A63Ce173E6EB063b3d3AED9A35Cf9bf",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH"),
    address: "0x3DA9D911301f8144bdF5c3c67886e5373DCdff8e",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI"),
    address: "0x15d3A64B2d5ab9E152F16593Cdebc4bB165B5B4A",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC"),
    address: "0x4F7c28cCb0F1Dbd1388209C67eEc234273C878Bd",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT"),
    address: "0x6ac4a7AB91E6fD098E13B7d347c6d4d1494994a2",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC"),
    address: "0x917d6480Ec60cBddd6CbD0C8EA317Bcc709EA77B",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC"),
    address: "0x7b8Ff8884590f44e10Ea8105730fe637Ce0cb4F6",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC"),
    address: "0xA3Cf8D1CEe996253FAD1F8e3d68BDCba7B3A3Db5",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:USDT",
    asset: assetByName("fWETH_USDT_LP"),
    address: "0x75071F2653fBC902EBaff908d4c68712a5d1C960",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:USDC",
    asset: assetByName("fWETH_USDC_LP"),
    address: "0x156733b89Ac5C704F3217FEe2949A9D4A73764b5",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:DAI",
    asset: assetByName("fWETH_DAI_LP"),
    address: "0x7aeb36e22e60397098C2a5C51f0A5fB06e7b859c",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:WBTC",
    asset: assetByName("fWETH_WBTC_LP"),
    address: "0xF1181A71CC331958AE2cA2aAD0784Acfc436CB93",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-WBTC:TBTC",
    asset: assetByName("fSLP_WBTC_TBTC"),
    address: "0x9523FdC055F503F73FF40D7F66850F409D80EF34",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-3POOL"),
    address: "0x27F12d1a08454402175b9F0b53769783578Be7d9",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-YPOOL"),
    address: "0x6D1b6Ea108AA03c6993d8010690264BA96D349A8",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-TBTC"),
    address: "0x017eC1772A45d2cf68c429A820eF374f0662C57c",
    rewardAsset: assetByName("FARM"),
  },
];

const weekTwelvePools = [
  {
    name: "FARM Profit Sharing",
    asset: assetByName("FARM"),
    address: "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50",
    rewardAsset: assetByName("FARM"),
    type: "autocompounding",
  },
  {
    name: "FARM:USDC Uniswap",
    asset: assetByName("FARM_USDC_LP"),
    address: "0x99b0d6641A63Ce173E6EB063b3d3AED9A35Cf9bf",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH"),
    address: "0x3DA9D911301f8144bdF5c3c67886e5373DCdff8e",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI"),
    address: "0x15d3A64B2d5ab9E152F16593Cdebc4bB165B5B4A",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC"),
    address: "0x4F7c28cCb0F1Dbd1388209C67eEc234273C878Bd",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT"),
    address: "0x6ac4a7AB91E6fD098E13B7d347c6d4d1494994a2",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC"),
    address: "0x917d6480Ec60cBddd6CbD0C8EA317Bcc709EA77B",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC"),
    address: "0x7b8Ff8884590f44e10Ea8105730fe637Ce0cb4F6",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC"),
    address: "0xA3Cf8D1CEe996253FAD1F8e3d68BDCba7B3A3Db5",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-3POOL"),
    address: "0x27F12d1a08454402175b9F0b53769783578Be7d9",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-YPOOL"),
    address: "0x6D1b6Ea108AA03c6993d8010690264BA96D349A8",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-TBTC"),
    address: "0x017eC1772A45d2cf68c429A820eF374f0662C57c",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:DAI",
    asset: assetByName("fSLP_WETH_DAI"),
    address: "0x76Aef359a33C02338902aCA543f37de4b01BA1FA",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:USDT",
    asset: assetByName("fSLP_WETH_USDT"),
    address: "0xA56522BCA0A09f57B85C52c0Cc8Ba1B5eDbc64ef",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:USDC",
    asset: assetByName("fSLP_WETH_USDC"),
    address: "0x6B4e1E0656Dd38F36c318b077134487B9b0cf7a6",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:WBTC",
    asset: assetByName("fSLP_WETH_WBTC"),
    address: "0xE2D9FAe95f1e68afca7907dFb36143781f917194",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-USDN"),
    address: "0xef4Da1CE3f487DA2Ed0BE23173F76274E0D47579",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-BUSD"),
    address: "0x093C2ae5E6F3D2A897459aa24551289D462449AD",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-COMPOUND"),
    address: "0xC0f51a979e762202e9BeF0f62b07F600d0697DE1",
    rewardAsset: assetByName("FARM"),
  },
];

const weekThirteenPools = [
  {
    name: "FARM Profit Sharing",
    asset: assetByName("FARM"),
    address: "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50",
    rewardAsset: assetByName("FARM"),
    type: "autocompounding",
  },
  {
    name: "FARM:USDC Uniswap",
    asset: assetByName("FARM_USDC_LP"),
    address: "0x99b0d6641A63Ce173E6EB063b3d3AED9A35Cf9bf",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH"),
    address: "0x3DA9D911301f8144bdF5c3c67886e5373DCdff8e",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI"),
    address: "0x15d3A64B2d5ab9E152F16593Cdebc4bB165B5B4A",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC"),
    address: "0x4F7c28cCb0F1Dbd1388209C67eEc234273C878Bd",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT"),
    address: "0x6ac4a7AB91E6fD098E13B7d347c6d4d1494994a2",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC"),
    address: "0x917d6480Ec60cBddd6CbD0C8EA317Bcc709EA77B",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC"),
    address: "0x7b8Ff8884590f44e10Ea8105730fe637Ce0cb4F6",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC"),
    address: "0xA3Cf8D1CEe996253FAD1F8e3d68BDCba7B3A3Db5",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-3POOL"),
    address: "0x27F12d1a08454402175b9F0b53769783578Be7d9",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-YPOOL"),
    address: "0x6D1b6Ea108AA03c6993d8010690264BA96D349A8",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-TBTC"),
    address: "0x017eC1772A45d2cf68c429A820eF374f0662C57c",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:DAI",
    asset: assetByName("fSLP_WETH_DAI"),
    address: "0x76Aef359a33C02338902aCA543f37de4b01BA1FA",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:USDT",
    asset: assetByName("fSLP_WETH_USDT"),
    address: "0xA56522BCA0A09f57B85C52c0Cc8Ba1B5eDbc64ef",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:USDC",
    asset: assetByName("fSLP_WETH_USDC"),
    address: "0x6B4e1E0656Dd38F36c318b077134487B9b0cf7a6",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:WBTC",
    asset: assetByName("fSLP_WETH_WBTC"),
    address: "0xE2D9FAe95f1e68afca7907dFb36143781f917194",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-USDN"),
    address: "0xef4Da1CE3f487DA2Ed0BE23173F76274E0D47579",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-BUSD"),
    address: "0x093C2ae5E6F3D2A897459aa24551289D462449AD",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-COMPOUND"),
    address: "0xC0f51a979e762202e9BeF0f62b07F600d0697DE1",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:DPI",
    asset: assetByName("fWETH_DPI_LP"),
    address: "0xAd91695b4BeC2798829ac7a4797E226C78f22Abd",
    rewardAsset: assetByName("FARM"),
  },
];

const weekFifteenPools = [
  {
    name: "FARM Profit Sharing",
    asset: assetByName("FARM"),
    address: "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50",
    rewardAsset: assetByName("FARM"),
    type: "autocompounding",
  },
  {
    name: "FARM:USDC Uniswap",
    asset: assetByName("FARM_USDC_LP"),
    address: "0x99b0d6641A63Ce173E6EB063b3d3AED9A35Cf9bf",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH"),
    address: "0x3DA9D911301f8144bdF5c3c67886e5373DCdff8e",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI"),
    address: "0x15d3A64B2d5ab9E152F16593Cdebc4bB165B5B4A",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC"),
    address: "0x4F7c28cCb0F1Dbd1388209C67eEc234273C878Bd",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT"),
    address: "0x6ac4a7AB91E6fD098E13B7d347c6d4d1494994a2",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC"),
    address: "0x917d6480Ec60cBddd6CbD0C8EA317Bcc709EA77B",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC"),
    address: "0x7b8Ff8884590f44e10Ea8105730fe637Ce0cb4F6",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC"),
    address: "0xA3Cf8D1CEe996253FAD1F8e3d68BDCba7B3A3Db5",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-3POOL"),
    address: "0x27F12d1a08454402175b9F0b53769783578Be7d9",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-YPOOL"),
    address: "0x6D1b6Ea108AA03c6993d8010690264BA96D349A8",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-TBTC"),
    address: "0x017eC1772A45d2cf68c429A820eF374f0662C57c",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:DAI",
    asset: assetByName("fSLP_WETH_DAI"),
    address: "0x76Aef359a33C02338902aCA543f37de4b01BA1FA",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:USDT",
    asset: assetByName("fSLP_WETH_USDT"),
    address: "0xA56522BCA0A09f57B85C52c0Cc8Ba1B5eDbc64ef",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:USDC",
    asset: assetByName("fSLP_WETH_USDC"),
    address: "0x6B4e1E0656Dd38F36c318b077134487B9b0cf7a6",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:WBTC",
    asset: assetByName("fSLP_WETH_WBTC"),
    address: "0xE2D9FAe95f1e68afca7907dFb36143781f917194",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-USDN"),
    address: "0xef4Da1CE3f487DA2Ed0BE23173F76274E0D47579",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-BUSD"),
    address: "0x093C2ae5E6F3D2A897459aa24551289D462449AD",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-COMPOUND"),
    address: "0xC0f51a979e762202e9BeF0f62b07F600d0697DE1",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-HUSD"),
    address: "0x72C50e6FD8cC5506E166c273b6E814342Aa0a3c1",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-HBTC"),
    address: "0x01f9CAaD0f9255b0C0Aa2fBD1c1aA06ad8Af7254",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:DPI",
    asset: assetByName("fWETH_DPI_LP"),
    address: "0xAd91695b4BeC2798829ac7a4797E226C78f22Abd",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "GRAIN:FARM Uniswap",
    asset: assetByName("GRAIN_FARM_LP"),
    address: "0xe58f0d2956628921cdEd2eA6B195Fc821c3a2b16",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "FARM:ETH Uniswap",
    asset: assetByName("FARM_WETH_LP"),
    address: "0x6555c79a8829b793F332f1535B0eFB1fE4C11958",
    rewardAsset: assetByName("FARM"),
  },
];

const weekNineteenPools = [
  {
    name: "FARM Profit Sharing",
    asset: assetByName("FARM"),
    address: "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50",
    rewardAsset: assetByName("FARM"),
    type: "autocompounding",
  },
  {
    name: "FARM:USDC Uniswap",
    asset: assetByName("FARM_USDC_LP"),
    address: "0x99b0d6641A63Ce173E6EB063b3d3AED9A35Cf9bf",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWETH"),
    address: "0x3DA9D911301f8144bdF5c3c67886e5373DCdff8e",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI"),
    address: "0x15d3A64B2d5ab9E152F16593Cdebc4bB165B5B4A",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC"),
    address: "0x4F7c28cCb0F1Dbd1388209C67eEc234273C878Bd",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT"),
    address: "0x6ac4a7AB91E6fD098E13B7d347c6d4d1494994a2",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC"),
    address: "0x917d6480Ec60cBddd6CbD0C8EA317Bcc709EA77B",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC"),
    address: "0x7b8Ff8884590f44e10Ea8105730fe637Ce0cb4F6",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC"),
    address: "0xA3Cf8D1CEe996253FAD1F8e3d68BDCba7B3A3Db5",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-3POOL"),
    address: "0x27F12d1a08454402175b9F0b53769783578Be7d9",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-YPOOL"),
    address: "0x6D1b6Ea108AA03c6993d8010690264BA96D349A8",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-TBTC"),
    address: "0x017eC1772A45d2cf68c429A820eF374f0662C57c",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:DAI",
    asset: assetByName("fSLP_WETH_DAI"),
    address: "0x76Aef359a33C02338902aCA543f37de4b01BA1FA",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:USDT",
    asset: assetByName("fSLP_WETH_USDT"),
    address: "0xA56522BCA0A09f57B85C52c0Cc8Ba1B5eDbc64ef",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:USDC",
    asset: assetByName("fSLP_WETH_USDC"),
    address: "0x6B4e1E0656Dd38F36c318b077134487B9b0cf7a6",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:WBTC",
    asset: assetByName("fSLP_WETH_WBTC"),
    address: "0xE2D9FAe95f1e68afca7907dFb36143781f917194",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-USDN"),
    address: "0xef4Da1CE3f487DA2Ed0BE23173F76274E0D47579",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-BUSD"),
    address: "0x093C2ae5E6F3D2A897459aa24551289D462449AD",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-COMPOUND"),
    address: "0xC0f51a979e762202e9BeF0f62b07F600d0697DE1",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-HUSD"),
    address: "0x72C50e6FD8cC5506E166c273b6E814342Aa0a3c1",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-HBTC"),
    address: "0x01f9CAaD0f9255b0C0Aa2fBD1c1aA06ad8Af7254",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:DPI",
    asset: assetByName("fWETH_DPI_LP"),
    address: "0xAd91695b4BeC2798829ac7a4797E226C78f22Abd",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "GRAIN:FARM Uniswap",
    asset: assetByName("GRAIN_FARM_LP"),
    address: "0xe58f0d2956628921cdEd2eA6B195Fc821c3a2b16",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "FARM:ETH Uniswap",
    asset: assetByName("FARM_WETH_LP"),
    address: "0x6555c79a8829b793F332f1535B0eFB1fE4C11958",
    rewardAsset: assetByName("FARM"),
  },
];

const weekTwentyPools = [
  {
    name: "FARM Profit Sharing",
    asset: assetByName("FARM"),
    address: "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50",
    rewardAsset: assetByName("FARM"),
    type: "autocompounding",
  },
  {
    asset: assetByName("fWETH"),
    address: "0x3DA9D911301f8144bdF5c3c67886e5373DCdff8e",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI"),
    address: "0x15d3A64B2d5ab9E152F16593Cdebc4bB165B5B4A",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC"),
    address: "0x4F7c28cCb0F1Dbd1388209C67eEc234273C878Bd",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT"),
    address: "0x6ac4a7AB91E6fD098E13B7d347c6d4d1494994a2",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC"),
    address: "0x917d6480Ec60cBddd6CbD0C8EA317Bcc709EA77B",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC"),
    address: "0x7b8Ff8884590f44e10Ea8105730fe637Ce0cb4F6",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC"),
    address: "0xA3Cf8D1CEe996253FAD1F8e3d68BDCba7B3A3Db5",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-3POOL"),
    address: "0x27F12d1a08454402175b9F0b53769783578Be7d9",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-YPOOL"),
    address: "0x6D1b6Ea108AA03c6993d8010690264BA96D349A8",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-TBTC"),
    address: "0x017eC1772A45d2cf68c429A820eF374f0662C57c",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:DAI",
    asset: assetByName("fSLP_WETH_DAI"),
    address: "0x76Aef359a33C02338902aCA543f37de4b01BA1FA",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:USDT",
    asset: assetByName("fSLP_WETH_USDT"),
    address: "0xA56522BCA0A09f57B85C52c0Cc8Ba1B5eDbc64ef",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:USDC",
    asset: assetByName("fSLP_WETH_USDC"),
    address: "0x6B4e1E0656Dd38F36c318b077134487B9b0cf7a6",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:WBTC",
    asset: assetByName("fSLP_WETH_WBTC"),
    address: "0xE2D9FAe95f1e68afca7907dFb36143781f917194",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-USDN"),
    address: "0xef4Da1CE3f487DA2Ed0BE23173F76274E0D47579",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-BUSD"),
    address: "0x093C2ae5E6F3D2A897459aa24551289D462449AD",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-COMPOUND"),
    address: "0xC0f51a979e762202e9BeF0f62b07F600d0697DE1",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-HUSD"),
    address: "0x72C50e6FD8cC5506E166c273b6E814342Aa0a3c1",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-HBTC"),
    address: "0x01f9CAaD0f9255b0C0Aa2fBD1c1aA06ad8Af7254",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:DPI",
    asset: assetByName("fWETH_DPI_LP"),
    address: "0xAd91695b4BeC2798829ac7a4797E226C78f22Abd",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "GRAIN:FARM Uniswap",
    asset: assetByName("GRAIN_FARM_LP"),
    address: "0xe58f0d2956628921cdEd2eA6B195Fc821c3a2b16",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "FARM:ETH Uniswap",
    asset: assetByName("FARM_WETH_LP"),
    address: "0x6555c79a8829b793F332f1535B0eFB1fE4C11958",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-BAC:DAI",
    asset: assetByName("fBAC_DAI_LP"),
    address: "0x797F1171DC5001B7A79ff7Dca68c9539329ccE48",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-DAI:BAS",
    asset: assetByName("fDAI_BAS_LP"),
    address: "0xf3B2B174E7f36e43246Ef33Fc58cE5821f21F799",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-MIC:USDT",
    asset: assetByName("fSLP_MIC_USDT"),
    address: "0x98Ba5E432933E2D536e24A2C021deBb8404588C1",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-MIS:USDT",
    asset: assetByName("fSLP_MIS_USDT"),
    address: "0xf4784d07136b5b10c6223134E8B36E1DC190725b",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-OBTC"),
    address: "0x91B5cD52fDE8dbAC37C95ECafEF0a70bA4c182fC",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "f1INCH-ETH:DAI",
    asset: assetByName("f1INCH_ETH-DAI_LP"),
    address: "0xDa5E9706274D88bbf1bD1877a9b462fC40cDcfAd",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "f1INCH-ETH:WBTC",
    asset: assetByName("f1INCH_ETH-WBTC_LP"),
    address: "0x747318Cf3171D4E2a1A52bBD3Fcc9f9c690448B4",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "f1INCH-ETH:USDT",
    asset: assetByName("f1INCH_ETH-USDT_LP"),
    address: "0x2A80e0B572e7EF61Ef81EF05eC024e1e52Bd70BD",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "f1INCH-ETH:USDC",
    asset: assetByName("f1INCH_ETH-USDC_LP"),
    address: "0x9a9A6148f7b0A9767AC1fdC67343D1e3E219FdDf",
    rewardAsset: assetByName("FARM"),
  },
];

const weekTwentyOnePools = [
  {
    name: "FARM Profit Sharing",
    asset: assetByName("FARM"),
    address: "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50",
    rewardAsset: assetByName("FARM"),
    type: "autocompounding",
  },
  {
    asset: assetByName("fWETH"),
    address: "0x3DA9D911301f8144bdF5c3c67886e5373DCdff8e",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDAI"),
    address: "0x15d3A64B2d5ab9E152F16593Cdebc4bB165B5B4A",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDC"),
    address: "0x4F7c28cCb0F1Dbd1388209C67eEc234273C878Bd",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUSDT"),
    address: "0x6ac4a7AB91E6fD098E13B7d347c6d4d1494994a2",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fTUSD"),
    address: "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fWBTC"),
    address: "0x917d6480Ec60cBddd6CbD0C8EA317Bcc709EA77B",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fRENBTC"),
    address: "0x7b8Ff8884590f44e10Ea8105730fe637Ce0cb4F6",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-RENWBTC"),
    address: "0xA3Cf8D1CEe996253FAD1F8e3d68BDCba7B3A3Db5",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-3POOL"),
    address: "0x27F12d1a08454402175b9F0b53769783578Be7d9",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-YPOOL"),
    address: "0x6D1b6Ea108AA03c6993d8010690264BA96D349A8",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-TBTC"),
    address: "0x017eC1772A45d2cf68c429A820eF374f0662C57c",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:DAI",
    asset: assetByName("fSLP_WETH_DAI"),
    address: "0x76Aef359a33C02338902aCA543f37de4b01BA1FA",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:USDT",
    asset: assetByName("fSLP_WETH_USDT"),
    address: "0xA56522BCA0A09f57B85C52c0Cc8Ba1B5eDbc64ef",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:USDC",
    asset: assetByName("fSLP_WETH_USDC"),
    address: "0x6B4e1E0656Dd38F36c318b077134487B9b0cf7a6",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-ETH:WBTC",
    asset: assetByName("fSLP_WETH_WBTC"),
    address: "0xE2D9FAe95f1e68afca7907dFb36143781f917194",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-USDN"),
    address: "0xef4Da1CE3f487DA2Ed0BE23173F76274E0D47579",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-BUSD"),
    address: "0x093C2ae5E6F3D2A897459aa24551289D462449AD",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-COMPOUND"),
    address: "0xC0f51a979e762202e9BeF0f62b07F600d0697DE1",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-HUSD"),
    address: "0x72C50e6FD8cC5506E166c273b6E814342Aa0a3c1",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-HBTC"),
    address: "0x01f9CAaD0f9255b0C0Aa2fBD1c1aA06ad8Af7254",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-ETH:DPI",
    asset: assetByName("fWETH_DPI_LP"),
    address: "0xAd91695b4BeC2798829ac7a4797E226C78f22Abd",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "GRAIN:FARM Uniswap",
    asset: assetByName("GRAIN_FARM_LP"),
    address: "0xe58f0d2956628921cdEd2eA6B195Fc821c3a2b16",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "FARM:ETH Uniswap",
    asset: assetByName("FARM_WETH_LP"),
    address: "0x6555c79a8829b793F332f1535B0eFB1fE4C11958",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-BAC:DAI",
    asset: assetByName("fBAC_DAI_LP"),
    address: "0x797F1171DC5001B7A79ff7Dca68c9539329ccE48",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fUNI-DAI:BAS",
    asset: assetByName("fDAI_BAS_LP"),
    address: "0xf3B2B174E7f36e43246Ef33Fc58cE5821f21F799",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-MIC:USDT",
    asset: assetByName("fSLP_MIC_USDT"),
    address: "0x98Ba5E432933E2D536e24A2C021deBb8404588C1",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "fSUSHI-MIS:USDT",
    asset: assetByName("fSLP_MIS_USDT"),
    address: "0xf4784d07136b5b10c6223134E8B36E1DC190725b",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-OBTC"),
    address: "0x91B5cD52fDE8dbAC37C95ECafEF0a70bA4c182fC",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUNI-DAI:BSGS"),
    address: "0x63e7D3F6e208ccE4967b7a0E6A50A397Af0b0E7A",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUNI-DAI:BSG"),
    address: "0xf5b221E1d9C3a094Fb6847bC3E241152772BbbF8",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fDSD"),
    address: "0x7c497298d9576499e17F9564CE4E13faa87A9b33",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fESD"),
    address: "0xDB9C2EbA87301e6951d6FBE7a458832eaab2137E",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fBAC"),
    address: "0x3cddE34C96eCB95A1232c9673e23f2dB5fA72280",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-EURS"),
    address: "0xf4d50f60D53a230abc8268c6697972CB255Cd940",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-UST"),
    address: "0xDdb5D3CCd968Df64Ce48b577776BdC29ebD3120e",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fCRV-stETH"),
    address: "0x2E25800957742C52b4d69b65F9C67aBc5ccbffe6",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUNI-mTSLA:UST"),
    address: "0x40C34B0E1bb6984810E17474c6B0Bcc6A6B46614",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUNI-mGOOGL:UST"),
    address: "0xfE83a00DF3A98dE218c08719FAF7e3741b220D0D",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUNI-mAMZN:UST"),
    address: "0x8Dc427Cbcc75cAe58dD4f386979Eba6662f5C158",
    rewardAsset: assetByName("FARM"),
  },
  {
    asset: assetByName("fUNI-UST:mAAPL"),
    address: "0xc02d1Da469d68Adc651Dd135d1A7f6b42F4d1A57",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "f1INCH-ETH:DAI",
    asset: assetByName("f1INCH_ETH-DAI_LP"),
    address: "0xDa5E9706274D88bbf1bD1877a9b462fC40cDcfAd",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "f1INCH-ETH:WBTC",
    asset: assetByName("f1INCH_ETH-WBTC_LP"),
    address: "0x747318Cf3171D4E2a1A52bBD3Fcc9f9c690448B4",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "f1INCH-ETH:USDT",
    asset: assetByName("f1INCH_ETH-USDT_LP"),
    address: "0x2A80e0B572e7EF61Ef81EF05eC024e1e52Bd70BD",
    rewardAsset: assetByName("FARM"),
  },
  {
    name: "f1INCH-ETH:USDC",
    asset: assetByName("f1INCH_ETH-USDC_LP"),
    address: "0x9a9A6148f7b0A9767AC1fdC67343D1e3E219FdDf",
    rewardAsset: assetByName("FARM"),
  },
];

const periods = [
  weekOnePools,
  weekTwoPools,
  weekThreePools,
  weekFourPools,
  weekFivePools,
  weekSixPools,
  weekSevenPools,
  weekEightPools,
  weekTenPools,
  weekElevenPools,
  weekTwelvePools,
  weekThirteenPools,
  weekFifteenPools,
  weekNineteenPools,
  weekTwentyPools,
  weekTwentyOnePools,
];

/**
 * @param {Set} setA
 * @param {Set} setB
 * @return {Set} union
 */
function union(setA, setB) {
  const has = [];
  setA.forEach((val) => has.push(val.address));

  const _union = new Set(setA);

  for (const elem of setB) {
    // if B's elem not in A, add to union
    if (!has.find((e) => e === elem.address)) _union.add(elem);
  }
  return _union;
}

/**
 * @param {Set} setA
 * @param {Set} setB
 * @return {Set} difference
 */
function difference(setA, setB) {
  const has = [];
  setB.forEach((val) => has.push(val.address));

  const _difference = new Set(setA);
  for (const elem of setA) {
    // if A's elem in B, remove from difference
    if (has.find((e) => e === elem.address)) _difference.delete(elem);
  }
  return _difference;
}

// SETUP

// Get a deduped set of all past pools
let allPastPools = new Set();
const sets = periods.map((period) => new Set(period));
sets.forEach((set) => (allPastPools = union(allPastPools, set)));

// Inactive pools are in all past pools, but not the most recent week
const inactivePools = difference(allPastPools, sets[sets.length - 1]);
const activePools = sets[sets.length - 1];

/**
 * @param {String} address
 * @return {bool} isActive
 */
function isAddressActive(address) {
  for (const value of activePools) {
    if (value.address === address) {
      return true;
    }
  }
  return false;
}

/**
 * @param {String} name the name of the asset to find
 * @return {Object} the asset object
 */
function poolByName(name) {
  return [...allPastPools].find((pool) => pool.name === name);
}

/**
 * @param {String} address the address of the pool to find
 * @return {Object} the pool object
 */
function poolByAddress(address) {
  return [...allPastPools].find(
    (pool) => pool.address.toLowerCase() === address.toLowerCase(),
  );
}

/**
 * @param {Object} pool
 * @return {bool} isActive
 */
function isActive(pool) {
  return isAddressActive(pool.address);
}

// prevent modification
assets.forEach(Object.freeze);
Object.freeze(periods);
periods.forEach((week) => {
  week.forEach(Object.freeze);
  Object.freeze(week);
});
Object.freeze(allPastPools);

export default {
  activePools: Object.freeze([...activePools]),
  allPastPools: Object.freeze([...allPastPools]),
  assets,
  assetByAddress,
  assetByName,
  // brittle
  farmRewardsPool: poolByAddress("0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50"),
  inactivePools: Object.freeze([...inactivePools]),
  isAddressActive,
  isActive,
  periods,
  poolByAddress,
  poolByName,
  weekOnePools,
  weekTwoPools,
  weekThreePools,
  weekFourPools,
  weekFivePools,
  weekSixPools,
  weekSevenPools,
  weekEightPools,
  weekTenPools,
  weekElevenPools,
  weekTwelvePools,
  weekThirteenPools,
  weekFifteenPools,
  weekNineteenPools,
  weekTwentyPools,
  weekTwentyOnePools,
};
