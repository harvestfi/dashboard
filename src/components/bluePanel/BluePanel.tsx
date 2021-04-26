import React from 'react'
import { Text, Wrapper, Col, Title } from './BluePanel.styles'

interface IProps {
  value: string
  text: string
}

export const BluePanel: React.FC<IProps> = ({ value, text }) => (
  <Wrapper>
    <Col>
      <Title>{value}</Title>
      <Text>{text}</Text>
    </Col>
  </Wrapper>
)
