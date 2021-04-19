import React, { useEffect, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Contract, providers } from 'ethers';
import HarvestContext from '../../Context/HarvestContext';
import { darkTheme, lightTheme, fonts } from '../../styles/appStyles';
import { tokens, tokens2 } from './AvailableTokens';

const Panel = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-color: ${props => props.theme.style.lightBackground};
	color: ${props => props.theme.style.primaryFontColor};
	font-size: 1.7rem;
	font-family: ${fonts.contentFont};
	padding: 1rem 1.5rem 0rem 1.5rem;
	border: ${props => props.theme.style.mainBorder};
	border-radius: 0.5rem;
	box-sizing: border-box;
	box-shadow: ${props => props.theme.style.panelBoxShadow};

	.inner {
		overflow-x: scroll;
		height: 16rem;
		scrollbar-color: ${({ theme }) => {
			return `${theme.style.scrollBarColor} ${theme.style.lightBackground}`;
		}};
		scrollbar-width: thin;

		::-webkit-scrollbar {
			width: 100%;
			height: 0.8rem;
			margin-top: -1.8rem;
		}
		::-webkit-scrollbar-track:no-button {
			width: 100%;
			border-radius: 0.5rem;
			background-color: ${props => props.theme.style.lightBackground};
		}
		::-webkit-scrollbar-button {
			color: ${props => props.theme.style.primaryFontColor};
		}
		::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: black;
			background-color: ${props => props.theme.style.scrollBarColor};
		}

		.token-container {
			display: flex;
			justify-content: space-evenly;
			align-items: center;

			&.first {
				margin-bottom: 2rem;
			}

			@media (max-width: 1105px) {
				width: 90rem;
				margin: 0 auto;
			}
		}
	}

	h1 {
		font-family: ${fonts.headerFont};
		margin-bottom: 2.2rem;
		font-size: 2rem;
		text-align: center;
		position: relative;
	}

	@media (max-width: 1105px) {
		margin-bottom: 1.5rem;
		height: 32rem;
	}
`;

const StyledToken = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	width: 20%;

	&:hover {
		top: 0.2rem;
	}

	a {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-decoration: none;
		color: ${props => props.theme.style.primaryFontColor};
		font-family: ${fonts.contentFont};
	}

	img {
		height: 3.7rem;
		width: 3.7rem;
		margin-bottom: 0.5rem;
	}
	span {
		font-size: 1.5rem;
	}
`;

const AddTokens = props => {
	const { state } = props;
	const { tokenAddedMessage, setTokenAddedMessage } = useContext(HarvestContext);

	useEffect(() => {
		const timer = setTimeout(() => {
			setTokenAddedMessage('');
		}, 1500);
		return () => clearTimeout(timer);
		// eslint-disable-next-line
  }, [tokenAddedMessage]);

	const checkForToken = async t => {
		// The minimum ABI to get ERC20 Token balance
		const minABI = [
			// balanceOf
			{
				constant: true,
				inputs: [{ name: '_owner', type: 'address' }],
				name: 'balanceOf',
				outputs: [{ name: 'balance', type: 'uint256' }],
				type: 'function',
			},
			// decimals
			{
				constant: true,
				inputs: [],
				name: 'decimals',
				outputs: [{ name: '', type: 'uint8' }],
				type: 'function',
			},
		];
		// Get ERC20 Token contract instance
		const contract = new Contract(t.address, minABI, providers.getDefaultProvider());
		// calculate a balance
		const balance = await contract.balanceOf(props.state.address);
		return parseInt(balance, 16);
	};

	const addTokenToWallet = t => {
		setTokenAddedMessage('');

		window.ethereum
			.request({
				method: 'metamask_watchAsset',
				params: {
					type: 'ERC20',
					options: {
						address: t.address,
						symbol: t.symbol,
						decimals: t.decimals,
						image: t.tokenImage,
					},
				},
				// id: Math.round(Math.random() * 100000),
			})
			.then(async response => {
				if ((await checkForToken(t)) > 0 && response) {
					setTokenAddedMessage(`${t.name} is already in your wallet.`);
				} else if (response) {
					setTokenAddedMessage(`${t.name} was added to your wallet.`);
				} else {
					setTokenAddedMessage(`${t.name} was not added to your wallet.`);
				}
			})
			.catch(console.error);
	};

	return (
		<ThemeProvider theme={state.theme === 'dark' ? darkTheme : lightTheme}>
			<Panel>
				<h1>Add assets to wallet</h1>
				<div className="inner">
					<div className="token-container first">
						{tokens.map(t => (
							<StyledToken onClick={() => addTokenToWallet(t)} key={t.name} {...t}>
								<img alt={t.name} src={t.image} />
								<span>{t.name}</span>
							</StyledToken>
						))}
					</div>
					<div className="token-container">
						{tokens2.map(t => (
							<StyledToken onClick={() => addTokenToWallet(t)} key={t.name} {...t}>
								<img alt={t.name} src={t.image} />
								<span>{t.name}</span>
							</StyledToken>
						))}
					</div>
				</div>
			</Panel>
		</ThemeProvider>
	);
};

export default AddTokens;
