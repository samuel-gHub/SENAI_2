import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/auth';


import './assets/css/style_geral.css';



import HomeLogin from '../src/pages/login/App';



import reportWebVitals from './reportWebVitals';

//---------------------------------------------------------------------------------------------------------------------------------


const PermissaoAdm = ( { component: Component } ) => (
  <Route 
    render = { (props) =>
      usuarioAutenticado() && parseJwt().role === '1' ? (
        <Component {...props} />
      ) : (
        <Redirect to="login"/>
      )
    }
  />
);

const PermissaoMedico = ( { component: Component } ) => (
  <Route 
    render = { (props) =>
      usuarioAutenticado() && parseJwt().role === '2' ? (
        <Component {...props} />
      ) : (
        <Redirect to="login"/>
      )
    }
  />
);

const PermissaoPaciente = ( { component: Component } ) => (
  <Route 
    render = { (props) =>
      usuarioAutenticado() && parseJwt().role === '3' ? (
        <Component {...props} />
      ) : (
        <Redirect to="login"/>
      )
    }
  />
);





const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={HomeLogin} />
        <Route path="/login" component={HomeLogin} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
