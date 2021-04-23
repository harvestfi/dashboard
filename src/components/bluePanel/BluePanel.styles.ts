import styled from 'styled-components';

import { fonts } from '../../styles/appStyles';

export const Col = styled.div(() => {
	return {
		display: 'flex',
		// TODO fix
		flexDirection: 'column' as 'column',
		alignItems: 'center',
	};
});

export const Title = styled.h1(() => {
	return {
		fontSize: '2.4rem',
		marginBottom: '0.5rem',
	};
});

export const Text = styled.span(() => {
	return {
		fontSize: '1.1rem',
	};
});

export const Wrapper = styled.div`
	position: relative;
	background-color: ${props => props.theme.style.blueBackground};
	color: ${props => props.theme.style.primaryFontColor};
	font-family: ${fonts.headerFont};
	border: ${props => props.theme.style.mainBorder};
	border-radius: 0.5rem;
	box-sizing: border-box;
	box-shadow: ${props => props.theme.style.panelBoxShadow};
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	padding: 2.35rem 1rem;
	@media (max-width: 1107px) {
		${Title} {
			font-size: 2.2rem;
		}
	}
`;
