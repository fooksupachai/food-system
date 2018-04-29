import React from 'react';

const stock = (props) => {
    const stocks = [];
    
    for ( let orderName in props.orders ) {
        stocks.push(
            {
                name: orderName,
                amount: props.orders[orderName]
            }
        );
    }
    const stockOutput  = stocks.map(ig => {
        return (
            <button disabled="true" type="button" className="btn btn-primary ml-md-5" key={ig.name}>
                    {ig.name} <span className="badge badge-light">{ig.amount}</span>
            </button>
        )
    });
    return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Order: {stockOutput}</h1>
                    <p className="lead">ราคา: <strong>บาท {Number.parseFloat( props.price ).toFixed( 2 )}</strong></p>
                </div>
            </div>
    )
}

export default stock;