import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductList from './ProductList';
import LoginForm from './LoginForm';
import OrderForm from './OrderForm';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={ProductList} />
          <Route path="/login" component={LoginForm} />
          <Route path="/order" component={OrderForm} />
        </Switch>
      </div>
    </Router>
  );
}


