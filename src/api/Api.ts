import axios from 'axios';

import { IPool, IVault } from '../types/Entities';

interface ITokenPriceResponce {
	data: number;
}

export class API {
	static async getPools(): Promise<IPool[]> {
		const response = await axios.get(`${process.env.REACT_APP_ETH_PARSER_URL}/contracts/pools`);
		return response ? response.data.data : [];
	}

	static async getVaults(): Promise<IVault[]> {
		const response = await axios.get(`${process.env.REACT_APP_ETH_PARSER_URL}/contracts/vaults`);
		return response ? response.data.data : [];
	}

	static async getTokenPrice(tokenAddress: string): Promise<number> {
		const response = await axios.get<ITokenPriceResponce>(
			`${process.env.REACT_APP_ETH_PARSER_URL}/price/token/${tokenAddress}`,
		);

		// TODO ask about these addreses 0xb19059ebb43466c323583928285a49f558e572fd, 0x5b5cfe992adac0c9d48e05854b2d91c73a003858,
		// 0x64eda51d3ad40d56b9dfc5554e06f94e1dd786fd
		if (response && JSON.stringify(response.data.data) !== '{}') {
			return response.data.data;
		}
		return 0;
	}

	static async getAPY(): Promise<number> {
		const response = await axios
			.get(`https://api-ui.harvest.finance/pools?key=${process.env.REACT_APP_HARVEST_KEY}`)
			.catch(err => {
				console.log(err);
			});

		const APY = response ? response.data.eth[0].rewardAPY : 0;
		return APY;
	}

	// TODO: remove, move to getAssets-method who gets farm-price
	static async getFarmPrice(): Promise<number> {
		const response = await axios
			.get(
				`${process.env.REACT_APP_ETH_PARSER_URL}/price/token/0xa0246c9032bC3A600820415aE600c6388619A14D`,
			)
			.catch(err => {
				console.log(err);
			});

		const farmPrice = response ? response.data.data : 0;
		return farmPrice;
	}
}
