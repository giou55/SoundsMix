import React, { Component } from 'react';
import './App.css';
import mainBirds from './assets/main-birds.mp4';
import mainRain from './assets/main-rain.mp4';
import mainWaves from './assets/main-waves.mp4';
import cricket from './assets/cricket.mp3';

import Sound from './Sound/Sound';

class App extends Component {

  state = {
    playAllStatus: false,
    buttonText: 'PLAY',
    sounds: [
      { id: '11', title: 'birds', mp3File: mainBirds, volume: '0', playStatus: false},
      { id: '22', title: 'rain', mp3File: mainRain, volume: '0', playStatus: false},
      { id: '33', title: 'waves', mp3File: mainWaves, volume: '0', playStatus: false},
      { id: '44', title: 'cricket', mp3File: cricket, volume: '0', playStatus: false}
    ]
  };

  changeVolume = ( event, id) => {
    const soundIndex = this.state.sounds.findIndex(s => {
      return s.id === id;
    });
    const sound = {
      ...this.state.sounds[soundIndex]
    };
    sound.volume = event.target.value;

    let sd = document.getElementById(id); 
    if (sound.volume > 0 && this.state.playAllStatus) {
      sd.play();
      sd.volume = sound.volume/10; 
      sound.playStatus = true;
    } else {
      sd.pause();
      sound.playStatus = false;
    }
    const sounds = [...this.state.sounds];
    sounds[soundIndex] = sound;
    this.setState({sounds: sounds});
  }

  playAllSounds = () => {
    const doesPlay = this.state.playAllStatus;
    this.setState({playAllStatus: !doesPlay});
    const playingSounds = this.state.sounds.filter(s => {
      return s.volume > 0;
    });
    playingSounds.forEach(s => {
      let ID = s.id;
      let sd = document.getElementById(ID); 
      if(s.playStatus){
        sd.pause();
        s.playStatus = false;
      } else {
        sd.play();
        s.playStatus = true;
      }
    })
  }

  render() {
    let sounds = (
      <div>
        {this.state.sounds.map( ( sound, index ) => {
          return <Sound
            title = {sound.title}
            key = {sound.id}
            id = {sound.id}
            source = {sound.mp3File}
            volume = {sound.volume}
            doesPlay = {sound.playStatus.toString()}
            changed = {(event) => this.changeVolume( event, sound.id)} />

        } )}
      </div>
    );
    return (
      <div className="App">
        <button className="playButton" 
                onClick={this.playAllSounds}>{this.state.playAllStatus ? 'PAUSE' : 'PLAY'}
          <i className={this.state.playAllStatus ? 'fas fa-pause' : 'fas fa-play'}></i>
        </button>
        {sounds}
      </div>

    );
  };
}

export default App;
