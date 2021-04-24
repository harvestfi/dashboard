import React, { useContext } from 'react'
import styled from 'styled-components'
import { fonts } from '../../styles/appStyles'
import HarvestContext from '../../Context/HarvestContext'

import { motion } from 'framer-motion'

const HarvestAndStakeMessage = () => {
  const { harvestAndStakeMessage } = useContext(HarvestContext)
  return (
    <>
      {harvestAndStakeMessage.first ? (
        <motion.div
          key={harvestAndStakeMessage}
          initial={{ x: 0, y: -100, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ x: 0, y: -100, opacity: 1 }}
        >
          <HarvestStakeMessage>
            <p>{harvestAndStakeMessage.first}</p>
            {harvestAndStakeMessage.second ? (
              <p>{harvestAndStakeMessage.second}</p>
            ) : (
              ''
            )}
          </HarvestStakeMessage>
        </motion.div>
      ) : null}
    </>
  )
}

export default HarvestAndStakeMessage

const HarvestStakeMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: max-content;
  margin: 0 auto;
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-family: ${fonts.contentFont};
  font-size: 2rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  margin-top: -7rem;
  position: absolute;
  left: 0%;
  right: 0%;
  @media (max-width: 768px) {
    left: 30%;
    right: 30%;
  }

  p {
    text-align: center;
    margin: 1rem 0;
  }
`
