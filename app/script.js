import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  state = {
    status: "off",
    time: 0,
    timer: null, 
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');

    bell.play();
  }

  step = () => {
    this.setState({time: this.state.time - 1});
    if(this.state.time == 0) {
      this.playBell();
      if(this.state.status == 'work') {
        this.setState({status: "rest", time: 20});
      } else if(this.state.status == 'rest') {
        this.setState({status: "work", time: 1200});
      }
    }
  };

  runApp = () => {

    this.setState({
      status: "work",
      time: 1200,
      timer: setInterval(this.step, 1000),
    });
  };

  formatTime= time => {

    let formatedTime;
    let minutes = Math.floor(time / 60);
    let seconds = time - (minutes * 60);

    if(minutes < 10) {
      minutes = '0' + minutes;
    }

    if(seconds < 10) {
      seconds = '0' + seconds;
    }

    formatedTime = minutes + ' : ' + seconds;

    return formatedTime;
  };

  stopApp = () => {
    this.setState({
      status: "off",
      time: 0,
    });

    clearInterval(this.state.timer);
  };

  closeApp = () => {
    window.close();
  }

  

  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        <div className={this.state.status == "off" ? "" : "inactive"}>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
        <img className={this.state.status == "work" ? "" : "inactive"} src="./images/work.png" />
        <img className={this.state.status == "rest" ? "" : "inactive"} src="./images/rest.png" />
        <div className={`timer ${this.state.status != "off" ? "timer" : "inactive"}`}>
          {this.formatTime(this.state.time)}
      </div>

        <button className={`btn ${this.state.status == "off" ? "btn" : "inactive"}`} onClick={() => this.runApp()}>Start</button>
        <button className={`btn ${this.state.status != "off" ? "btn" : "inactive"}`} onClick={() => this.stopApp()}>Stop</button>
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
