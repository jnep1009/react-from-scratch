/**
 * Created by JNEP on 4/1/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    }
};

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text
        };
    }

    componentDidMount() {
        // when component mounted we will set the interval but we need to remove the listener when the component is unmounted
        const STOPPER = `${this.props.text}...`;
        this.interval = window.setInterval(function () {
            // this inside this lexical environment will be different from the this of the component so we have to bind this
            if (this.state.text === STOPPER) {
                this.setState(function () {
                    return {
                        text: this.props.text
                    }
                })
            } else {
                // check the previous state
                this.setState(function (prevState) {
                    return {
                        text: prevState.text + '.'
                    }
                });
            }
        }.bind(this), this.props.speed);
    }

    componentWillUnmount(){
        window.clearInterval(this.interval);
    }

    render() {
        return (
            <p style={styles.content}>
                {this.state.text}
            </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
};

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
};

module.exports = Loading;