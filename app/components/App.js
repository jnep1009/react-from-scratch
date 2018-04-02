/**
 * Created by JNEP on 3/28/18.
 */
import React from 'react';
import Popular from './Popular';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';

// Component parts
// 1. state
// 2. lifecycle event -> hook to tie in when the certain events happen
// 3. UI -> always have in both containers and components -> associate with render method
// **** Render method in the components always return UI render(){ return (<UI>)}

class App extends React.Component {
    // render always return UI
    render() {
        return (
            <BrowserRouter>
                <div className='container'>
                    <Nav/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/battle' component={Battle}/>
                        <Route path='/battle/results' component={Results} />
                        <Route path='/popular' component={Popular}/>
                        <Route render={
                            ()=>{
                                return (
                                    <p> Not Found! </p>
                                )
                            }}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
            // this is JSX not HTML! Babel will transform into light-weight JS
        )
    }
}

module.exports = App;