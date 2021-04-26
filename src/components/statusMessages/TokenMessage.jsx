import React, { useContext } from 'react'
import { HarvestContext } from '../../Context/HarvestContext'
import styled from 'styled-components'
import { fonts } from '../../styles/appStyles'
import { motion } from 'framer-motion'

const TokenMessage = () => {
  const { tokenAddedMessage } = useContext(HarvestContext)
  return (
    <>
      {tokenAddedMessage ? (
        <motion.div
          key={tokenAddedMessage}
          initial={{ x: 0, y: -100, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ x: 0, y: -100, opacity: 1 }}
        >
          <AddTokenMessage className="token-added-message">
            <p>{tokenAddedMessage}</p>
          </AddTokenMessage>
        </motion.div>
      ) : null}
    </>
  )
}

export default TokenMessage

const AddTokenMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-family: ${fonts.contentFont};
  font-size: 2rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  margin: -5rem auto 0 auto;
  position: absolute;
  left: 0%;
  right: 0%;
  @media (max-width: 768px) {
    left: 30%;
    right: 30%;
  }

  p {
    text-align: center;
  }
`
