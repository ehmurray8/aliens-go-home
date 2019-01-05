import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {getCanvasPosition} from './utils/formulas';
import Canvas from "./components/Canvas";

class App extends Component {
  componentDidMount() {
    const self = this;
    setInterval(() => {
      self.props.moveObjects(self.canvasMousePosition);
    }, 10);

    window.onresize = () => {
      const canvas = document.getElementById('aliens-go-home-canvas');
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    window.onresize();
  }

  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event);
  }

  render() {
    return (
        <Canvas
            angle={this.props.angle}
            gameState={this.props.gameState}
            startGame={this.props.startGame}
            trackMouse={event => (this.trackMouse(event))}
        />
    );
  }
}

App.propTypes = {
    angle: PropTypes.number.isRequired,
    gameState: PropTypes.shape({
      started: PropTypes.bool.isRequired,
      kills: PropTypes.number.isRequired,
      lives: PropTypes.number.isRequired,
    }),
    moveObjects: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
};

export default App;
