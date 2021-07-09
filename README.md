## Harvest Dashboard

[Check out the dashboard :)](https://harvest-dashboard.xyz/)

## Setup

```sh
$ npm install
$ cp .env.example .env # and populate with your variables
```

## Updating for new vaults

This repo must be manually kept-in-sync with Harvest.finance so that it shows the correct vault names, and which vaults are earning farm rewards. Thankfully, we have an endpoint on [ethparser](/harvestfi/ethparser) that can provide most of this data for us.

In this repo, we have a static file that maps contract addresses to human-readable vault names. This file is populated by ethparser, but then edited manually by us.

To grab the list of vaults from ethparser, run:

```sh
node scripts/getvaultsfromethparser.js
```

Notice that the result will be in alphabetical order.

Now you can edit `src/static/vaultsName.json` manually to adjust the name of the vault. When you are done, run

```sh
node scripts/getVaultsFromEthparser.js
```

again to re-alphabetize the file.

## Tracking an address and logging to disk

`$ node --experimental-modules scripts/track.js $ADDRESS $INFURA_PROJECT_ID`

## Credits

This dashboard would not be possible without the efforts of countless [contributors](/harvestfi/dashboard/graphs/contributors).
