import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Qrcode from './containers/Blog/Qrcode/Qrcode';
import Order from './containers/Blog/Order/Order';
import Checkout from './containers/Checkout/Checkout';
import Stock from './containers/Stocks/Stocks';
import Layout from './hoc/Layout/Layout';
import Login from './containers/Login/Log/loglayout';


class App extends Component {
  render() {
    return (
      <div>
          <Layout>
          <Switch>   
                    <Route path="/stock" component={Stock} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/" exact component={Order} />
                    <Route path="/topup" component={Qrcode} />
                    <Route path="/login" component={Login} />
          </Switch>
        </Layout>
       
      </div>
     
    );
  }
}

export default App;
