import React from 'react';
import { Text, Wrapper, Col, Title } from './BluePanel.styles';

const BluePanel = ({ value, text }) => (
	<Wrapper>
		<Col>
			<Title>{value}</Title>
			<Text>{text}</Text>
		</Col>
	</Wrapper>
);

export default BluePanel;
