import React from 'react';
import PropTypes from 'prop-types';
import Sky from './Sky';
import Ground from "./Ground";
import CannonPipe from "./CannonPipe";
import CannonBase from "./CannonBase";
import CannonBall from './CannonBall';
import CurrentScore from "./CurrentScore";
import FlyingObject from "./FlyingObject";
import Heart from "./Heart";
import StartGame from "./StartGame";
import Title from "./Title";
import Leaderboard from './Leaderboard';
import {signIn} from 'auth0-web';

const Canvas = (props) => {
    const gameHeight = 1200;
    const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];

    const leaderBoard = [
        { id: 'd4', maxScore: 82, name: 'Ado Kukic', picture: 'https://twitter.com/KukicAdo/profile_image', },
        { id: 'a1', maxScore: 235, name: 'Bruno Krebs', picture: 'https://twitter.com/brunoskrebs/profile_image', },
        { id: 'c3', maxScore: 99, name: 'Diego Poza', picture: 'https://twitter.com/diegopoza/profile_image', },
        { id: 'b2', maxScore: 129, name: 'Jeana Tahnk', picture: 'https://twitter.com/jeanatahnk/profile_image', },
        { id: 'e5', maxScore: 34, name: 'Jenny Obrien', picture: 'https://twitter.com/jenny_obrien/profile_image', },
        { id: 'f6', maxScore: 153, name: 'Kim Maida', picture: 'https://twitter.com/KimMaida/profile_image', },
        { id: 'g7', maxScore: 55, name: 'Luke Oliff', picture: 'https://twitter.com/mroliff/profile_image', },
        { id: 'h8', maxScore: 146, name: 'Sebastián Peyrott', picture: 'https://twitter.com/speyrott/profile_image', },
    ];

    return (
        <svg
            id="aliens-go-home-canvas"
            preserveAspectRatio="xMaxYMax none"
            onMouseMove={props.trackMouse}
            viewBox={viewBox}
        >
            <defs>
                <filter id="shadow" >
                    <feDropShadow dx="1" dy="1" stdDeviation="2"/>
                </filter>
            </defs>
            <Sky />
            <Ground/>
            <CannonPipe rotation={props.angle} />
            <CannonBase />

            { ! props.gameState.started &&
                <g>
                    <StartGame onClick={() => props.startGame()}/>
                    <Title/>
                    <Leaderboard currentPlayer={leaderBoard[6]} authenticate={signIn} leaderboard={leaderBoard} />
                </g>
            }

            { props.gameState.started &&
                <g>
                    <CannonBall position={{x: 0, y: -100}}/>
                    <CurrentScore score={123}/>
                    {props.gameState.flyingObjects.map(flyingObject => (
                        <FlyingObject
                            key={flyingObject.id}
                            position={flyingObject.position}
                        />
                    ))}
                    <Heart position={{x: -300, y: 35}}/>
                </g>
            }

        </svg>
    );
};

Canvas.propTypes = {
    angle: PropTypes.number.isRequired,
    trackMouse: PropTypes.func.isRequired,
};

export default Canvas;