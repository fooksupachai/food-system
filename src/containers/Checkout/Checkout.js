import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Button } from 'reactstrap';

import QrData from './QrData/QrData'

class Checkout extends Component {
    staet = {
        orders: null,
        price:0
    }

    componentWillMount () {
        const query = new URLSearchParams( this.props.location.search );
        const orders = {};
        let price = 0;
        for ( let param of query.entries() ) {
            if (param[0] === 'price') {
                price = param[1]
            } else {
                orders[param[0]] = +param[1];
            }
        }
        this.setState( { orders: orders, totalPrice: price } );
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/qr-data' );
    }
    render() {
        return(
            <div className="container">
                <div className="text-center">
                    Checkout
                    <div>
                            <Button color="warning" onClick={this.checkoutCancelledHandler}>CANCEL</Button>
                            <Button color="primary" onClick={this.checkoutContinuedHandler}>CONTINUE</Button>
                            <Route 
                                    path={this.props.match.path + '/qr-data'} 
                                    render={(props) => (<QrData orders={this.state.orders} price={this.state.totalPrice} {...props} />)} />
                    </div>
                </div>
            </div>
        )
    }

}

export default Checkout;