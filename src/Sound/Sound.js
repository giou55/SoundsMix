import React from 'react';
import './Sound.css';

const Sound = (props) => {
    return (
        <div className="SoundContainer">
            <h3>{props.title}</h3>
            <div className="SliderContainer">
                <span>
                    <p>{props.volume}</p>
                    <input type="range" onChange={props.changed} min="0" max="10" 
                           defaultValue={props.volume} className="slider">
                    </input>
                </span>
            </div>
            <div>
                <audio id={props.id} preload="auto" loop>
                    <source 
                        src={props.source}
                        type="audio/mp4" />
                </audio>
            </div>
        </div>
    );
};

export default Sound;