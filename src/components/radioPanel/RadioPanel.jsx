import React,{useState} from 'react';
import styled from "styled-components";
import { fonts } from "../../styles/appStyles";
import AudioSpectrum from 'react-audio-spectrum';
import sample from '../../assets/audio/HarvestRadio.mp3';


const RadioPlayer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-family: ${fonts.contentFont};
font-size: 1.7rem;
background-color: ${(props) => props.theme.style.lightBackground};
border: ${(props) => props.theme.style.mainBorder};
border-radius: .5rem;
margin-left: 1.2rem;
margin-top: .9rem;
position: relative;
z-index: 400;
height: 6rem;
width: 30rem;
.player-inner {
    width: 100%;
    padding-top: 4rem;
    padding-bottom: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;;
    
    #audio-canvas {
        margin-top: -4rem;
        margin-left: -8rem;
        
    }
    .player-controls {
        margin-left: 1rem;
        margin-top: -1.2rem;
        .play-pause {
            margin-top: .5rem;
            background-color: ${(props) => props.theme.style.highlight};
        }
    }
}
@media(maxwidth: 500px) {
    width: 10rem;
    height:
}
`



const RadioPanel = () => {
    const [playing,setPlaying] =useState(true)

    const togglePlaying = () => {
        let audioElement = document.getElementById('audio-element')
        if(playing) {
            audioElement.pause()
            setPlaying(false)
        }else {
            audioElement.play()
            setPlaying(true)
        }
    }

    
    return (

        
        <RadioPlayer>
            <div className="player-inner">
                <audio id='audio-element' loop  autoPlay src={sample} ></audio>
                <AudioSpectrum
                id="audio-canvas"
                height={50}
                width={100}
                audioId={'audio-element'}
                capColor={'red'}
                capHeight={2}
                meterWidth={8}
                meterCount={8}
                meterColor={[
                    {stop: 0, color: '#f00'},
                    {stop: 0.5, color: '#0CD7FD'},
                    {stop: 1, color: 'red'}
                    ]}
                    gap={6}
                    />
                <div className="player-controls">
                    {playing ? <button className='play-pause' onClick={togglePlaying}><i className="fas fa-pause"></i></button> 
                    : <button className='play-pause' onClick={togglePlaying}><i className="fas fa-play"></i></button>}
                </div>
                
               
            </div>
            
            
        </RadioPlayer>
    );
}

export default RadioPanel;