/**
 * Created by JNEP on 3/28/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

// to make a stateless function we can just do
// Stateless just received props, but it didn't have it own state
function SelectedLanguageStateLess(props) {
    const languages = ['All', 'JS', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <ul className="languages">
            {
                // if we use arrow function we dont have to bind this as the second argument of .map function
                // because this scope already referred to the outside scope (component) with the arrow function
                languages.map((lang) =>
                    <li
                        style={lang === props.selectedLanguage ? {color: '#CB4D4D'}: null}
                        // we already binded this to the component in the constructor scope.
                        onClick={props.onSelect.bind(null, lang)}
                        key={lang}>
                        {lang}
                    </li>
                )
            }
        </ul>
    )
}

// stateless components
function RepoGrid (props){
    // if we dont use arrow function we need to add return after .map
    return (
        <ul className="popular-list">
            {props.repos.map((repo, index) =>
                <li key={repo.name} className='popular-item'>
                    <div className="popular-rank">#{index + 1}</div>
                    <ul className="space-list-items">
                        <li>
                            <img
                                className='avatar'
                                src={repo.owner.avatar_url}
                                alt={'Avatar for ' + repo.owner.login}
                            />
                            <li>
                                <a href={repo.html_url}>{repo.name}</a>
                            </li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} starts</li>
                        </li>
                    </ul>
                </li>
            )}
        </ul>
    )
}

// because it's stateless so it's good to have proptypes
RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
};


class SelectedLanguage extends React.Component {
    // we will pass the prop from Popular to here
    render() {
        const languages = ['All', 'JS', 'Ruby', 'Java', 'CSS', 'Python'];
        return (
            <ul className="languages">
                {
                    // if we use arrow function we dont have to bind this as the second argument of .map function
                    // because this scope already referred to the outside scope (component) with the arrow function
                    languages.map((lang) =>
                        <li
                            style={lang === this.props.selectedLanguage ? {color: '#CB4D4D'}: null}
                            // we already binded this to the component in the constructor scope.
                            onClick={this.props.onSelect.bind(null, lang)}
                            key={lang}>
                            {lang}
                        </li>
                    )
                }
            </ul>
        )
    }
}


// Declare proptypes of select language props
SelectedLanguage.propTypes = {
    onSelect: PropTypes.string.isRequired,
    selectedLanguage: PropTypes.func.isRequired
};

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };
        // Bind the reference of this to the specific function
        // So no matter where it is called it will bind with "this" on the left of updateLanguage
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        // AJAX Request
        // everytime when selectedLanguage changes its value it will run here
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang) {
        this.setState({
            selectedLanguage: lang,
            repos: null
        });

        // bind properties "this" with the outside scope
        api.fetchPopularRepos(lang)
            .then(function (res) {
                this.setState({
                    repos: res
                })
            }.bind(this));
    }

    render() {
        return (
            <div>
                <SelectedLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    // we dont have to do .bind here because we already did it in consturctor scope
                    onSelect={this.updateLanguage}
                    // we can pass languages array as a prop but it will not make anysense because we will use it with this
                    // component only so just move it to select language
                />
                { // do this because we set the required array type of repos proptype so it wont get error when we
                    // havne't fetched from the server
                    !this.state.repos ? <Loading text='Downloading' speed={300}/> :
                    <RepoGrid  repos={this.state.repos}/>
                }
            </div>
        )
    }
}

module.exports = Popular;