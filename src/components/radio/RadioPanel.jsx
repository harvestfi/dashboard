import React, { useState } from "react";
import styled from "styled-components";
import { fonts } from "../../styles/appStyles";
import AudioSpectrum from "react-audio-spectrum";
import sample from "../../assets/audio/HarvestRadio.mp3";
import { motion, AnimatePresence } from "framer-motion";

const RadioPlayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.contentFont};
  font-size: 1.7rem;
  background-color: ${(props) => props.theme.style.lightBackground};
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  margin-left: 1.2rem;
  margin-top: 0.9rem;
  position: relative;
  z-index: 400;
  height: 6rem;
  width: 30rem;

  .player-inner {
    width: 100%;
    padding-top: 4rem;
    padding-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    #audio-canvas {
      margin-top: -4.5rem;
    }

    .player-controls {
      margin-top: -3.2rem;

      .play-pause {
        cursor: pointer;
        margin-top: 0.5rem;
        border-radius: 0.5rem;
        height: 3.5rem;
        width: 3.5rem;
        padding: 1%;
        background-color: ${(props) => props.theme.style.highlight};
        .fas {
          font-size: 2rem;
        }
      }
    }
  }

  @media (maxwidth: 500px) {
    width: 10rem;
    height: ;
  }
`;

const RadioPanel = () => {
  const [playing, setPlaying] = useState(true);

  const togglePlaying = () => {
    let audioElement = document.getElementById("audio-element");
    if (playing) {
      audioElement.pause();
      setPlaying(false);
    } else {
      audioElement.play();
      setPlaying(true);
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key="radio"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 1 }}
      >
        <RadioPlayer>
          <div className="player-inner">
            <audio id="audio-element" loop autoPlay src={sample}></audio>
            <AudioSpectrum
              id="audio-canvas"
              height={50}
              width={250}
              audioId={"audio-element"}
              capColor={"red"}
              capHeight={2}
              meterWidth={15}
              meterCount={12}
              meterColor={[
                { stop: 0, color: "#f00" },
                { stop: 0.5, color: "#0CD7FD" },
                { stop: 1, color: "red" },
              ]}
              gap={6}
            />
            <div className="player-controls">
              {playing ? (
                <button className="play-pause" onClick={togglePlaying}>
                  <i className="fas fa-pause"></i>
                </button>
              ) : (
                <button className="play-pause" onClick={togglePlaying}>
                  <i className="fas fa-play"></i>
                </button>
              )}
            </div>
          </div>
        </RadioPlayer>
      </motion.div>
    </AnimatePresence>
  );
};

export default RadioPanel;
