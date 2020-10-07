import React from 'react';
import { render } from 'react-dom';

const workTime = 1200;
const restTime = 20;

class App extends React.Component {

  state = {
    status: 'off',
    time: 'workTime',
    timer: null,
  }

  formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds - (min * 60);
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }

  step = () => {
    this.setState({
      ...this.state,
      time: this.state.time - 1,
    })
    if (this.state.time === 0) {
      if (this.state.status === 'work') {
        this.setState({
          ...this.state,
          time: restTime,
          status: 'rest',
        })
      } else if (this.state.status === 'rest') {
        this.setState({
          ...this.state,
          time: workTime,
          status: 'work',
        })
      }
    }
  };

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      time: workTime,
      status: 'work',
    });
  };

  stopTimer = () => {
    window.clearInterval(this.state.timer)
    this.setState({
      ...this.state,
      time: workTime,
      status: 'off',
    })
  };

  closeApp = () => window.close()

  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(this.state.status === 'off') && <AppDescription />}
        {(this.state.status === 'work') && <img src="./images/Work.png" />}
        {(this.state.status === 'rest') && <img src="./images/Rest.png" />}
        {(this.state.status !== 'off') && <div className="timer"> {this.formatTime(this.state.time)}</div>}
        {(this.state.status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
        {(this.state.status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

const AppDescription = () => (
  <div>
    <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
    <p>This app will help you track your time and inform you when it's time to rest.</p>
  </div>
)

render(<App />, document.querySelector('#app'));
