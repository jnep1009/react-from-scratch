/**
 * Created by JNEP on 4/1/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import api from '../utils/api';
import {Link} from 'react-router-dom';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';


function Profile(props){
    const info = props.info;

    return (
        <PlayerPreview avatar={info.avatar_url} username={info.login}>
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>
        </PlayerPreview>
    )
}

Profile.propTypes = {
    info: PropTypes.object.isRequired,
};

function Player(props){
    return(
        <div>
            <h1 className='header'>{props.label}</h1>
            <h3 style={{
            textAlign: 'center'
            }}>
            Score: ${props.score}
            </h3>
            <Profile info={props.profile}/>
        </div>
    )
}
Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired

};


class Results extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount() {
        let players = queryString.parse(this.props.location.search);
        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then(function (results) {
            // error handler
            if (results === null){
                return this.setState(function(){
                   return{
                       error: 'Looks like there was an error.',
                       loading: false
                   }
                });
            }
            // if it's not error
            this.setState(function(){
                return {
                    error: null,
                    winner: results[0],
                    loser: results[1],
                    loading: false
                };
                // so this.setState will refer to this component.
            });
        }.bind(this));
    }

    render() {
        let state = this.state;

        if (state.loading === true){
            return <Loading text='DOWNLOADING'/>
        }

        if (state.error){
            return(
                <div>
                    <p>{state.error}</p>
                    <Link to ='/battle'>Reset</Link>
                </div>
            )
        }

        return (
            <div className='row'>
                <Player
                label='winner'
                score={state.winner.score}
                profile={state.winner.profile}
                />
                <Player
                    label='loser'
                    score={state.loser.score}
                    profile={state.loser.profile}
                />

            </div>
        )
    }
}

module.exports = Results;