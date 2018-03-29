/**
 * Created by JNEP on 3/15/18.
 */
const React = require('react');
const ReactDOM = require('react-dom');
require('./index.css');
import App from './components/App';


// Hook react component to DOM
ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
