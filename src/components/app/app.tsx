import React, { FC, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../../constants/actionTypes';
import { store } from '../../store';
import { push } from 'react-router-redux';
import agent from '../../agent';
import Header from '../header/header';
import Article from '../Article';
import Editor from '../Editor';
import Home from '../Home';
import Login from '../Login';
import Profile from '../Profile';
import ProfileFavorites from '../ProfileFavorites';
// import Register from '../Register';
import RegisterPage from '../../pages/register/register';
import Settings from '../Settings';
import TestComponent from '../test-component/test-component';

const mapStateToProps = (state) => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

interface IApp {
  appLoaded: boolean;
  appName: string;
  currentUser: {
    username: string;
  };
  redirectTo: any;
  onLoad: any;
  onRedirect: any;
}

const App: FC<IApp> = ({
  appLoaded,
  appName,
  currentUser,
  redirectTo,
  onLoad,
  onRedirect,
}) => {
  useEffect(() => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }
    onLoad(token ? agent.Auth.current() : null, token);
  }, [onLoad]);

  useEffect(() => {
    if (redirectTo) store.dispatch(push(redirectTo));
    onRedirect();
  }, [onRedirect, redirectTo]);

  if (appLoaded)
    return (
      <div>
        <TestComponent>TEST</TestComponent>
        <Header appName={appName} currentUser={currentUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/editor/:slug" component={Editor} />
          <Route path="/editor" component={Editor} />
          <Route path="/article/:id" component={Article} />
          <Route path="/settings" component={Settings} />
          <Route path="/@:username/favorites" component={ProfileFavorites} />
          <Route path="/@:username" component={Profile} />
        </Switch>
      </div>
    );
  return (
    <div>
      <Header appName={appName} currentUser={currentUser} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
