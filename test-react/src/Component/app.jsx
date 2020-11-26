// Library
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// SCSS
import '../assets/scss/style.scss';

// Component
import Header from './head.jsx';
import Footer from './foot.jsx';
import Index from './index.jsx';
import Single from './single.jsx';
import Login from './login.jsx';
import Register from './register.jsx';
import Error from './404.jsx';


export default function App() {
  return (
    <BrowserRouter>
      < Header />
      <main className="container">
          <Switch>
            <Route exact path="/" render={() => <Index /> } />
            <Route path="/single/:id" render={() => <Single /> } />
            <Route path="/login" render={() => <Login />} />
            <Route exact path="/404" render={() => <Error />} />
            <Route exact path="/register" render={() => <Register />} />

            <Redirect to="/404" />
          </Switch>
      </main>
      < Footer />
    </BrowserRouter>
  )
}