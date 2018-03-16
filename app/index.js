/**
 * Created by JNEP on 3/15/18.
 */
const React = require('react');
const ReactDOM = require('react-dom');
require('./index.css');


// Component parts
// 1. state
// 2. lifecycle event -> hook to tie in when the certain events happen
// 3. UI -> always have in both containers and components -> associate with render method
// **** Render method in the components always return UI render(){ return (<UI>)}


class App extends React.Component {
    // render always return UI
    render() {
        return (
            // this is JSX not HTML! Babel will transform into light-weight JS
            <div>
                Hello World!
            </div>
        )
    }
}

// Hook react component to DOM
ReactDOM.render(
    <App/>, document.getElementById('app')
);
