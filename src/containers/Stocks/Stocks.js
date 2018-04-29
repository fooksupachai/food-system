import React, { Component } from 'react';

import Stock from '../../components/Stock/Stock'
import axios from 'axios';

class Stocks extends Component {
    state = {
        stocks: [],
        loading: true
    }

    componentDidMount() {
        axios.get('https://jc-cafeteria-a60e0.firebaseio.com/stock.json')
            .then(res => {
                const fetchedStocks = [];
                for (let key in res.data) {
                    fetchedStocks.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState( {loading: false, stocks: fetchedStocks} );
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }
    render() {
        console.log(this.state.stocks);
        
        return(
            <div className="container">
                {this.state.stocks.map(stock => (
                    <Stock
                        key={stock.id}
                        orders = {stock.orders}
                        price = {stock.price}/>
                ))}
                xxx
            </div>  
        )
    }
}

export default Stocks;