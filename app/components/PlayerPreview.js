/**
 * Created by JNEP on 4/1/18.
 */
var React = require('react'); // still need to import because we use jsx
var PropTypes = require('prop-types');
import {Link} from 'react-router-dom';

function PlayerPreview(props) {
    return (
        <div>
            <div className='column'>
                <img
                    className='avatar'
                    src={props.avatar}
                    alt={'Avatar for ${props.username}'}/>
                <h2 className='username'>@{props.username}</h2>
            </div>
            {props.children}
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

module.exports = PlayerPreview;