import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import TopBar from './components/TopBar';
import Home from './components/Home';
import Default from './components/Default';
import ProjectList from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';
import CreateProject from './components/CreateProject';
import Help from './components/Help';
import Login from './pages/login';

// localStorage.clear();

function IsLoggedIn() {
    const IS_LOGGED_IN = gql`
        query IsUserLoggedIn {
            isLoggedIn @client
        }
    `;

    const { data } = useQuery(IS_LOGGED_IN);
    const { isLoggedIn } = data;
    return isLoggedIn ? (
        <Fragment>
            <TopBar isLoggedIn={isLoggedIn} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/projects" component={ProjectList} />
                <Route path="/project/:projectId" component={ProjectDetails} />
                <Route path="/create-project" component={CreateProject} />
                <Route path="/help" component={Help} />
                <Route component={Default} />
            </Switch>
        </Fragment>
    ) : (
        <Login />
    );
}

function App() {
    return <IsLoggedIn />;
}

export default App;
