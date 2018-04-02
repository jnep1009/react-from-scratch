/**
 * Created by JNEP on 3/30/18.
 */
import React from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div className='home-container'>
                <h1> Battle!</h1>
                <Link className='button-battle' to='/battle'>
                    Battle
                </Link>
            </div>
        )
    }
}

module.exports = Home;