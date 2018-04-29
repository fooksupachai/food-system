import React from 'react';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Fanta', type: 'fanta' },
    { label: 'Somtam', type: 'somtam' },
    { label: 'Coke', type: 'coke' },
    { label: 'YenYen ', type: 'yenyen' }
];

const buildControls = (props) => {
    return (
        <div>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            <div className="row mb-md-5">
                {controls.map(ctrl => (
                    <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        added={() => props.orderAdded(ctrl.type)}
                        removed={() => props.orderRemoved(ctrl.type)}
                        disabled={props.disabled[ctrl.type]} />
                ))}
            </div>
            {/* <div className="container">
                <div className="text-center">
                    <button className="btn btn-success mb-md-5"
                        disabled={!props.purchasable}
                        onClick={props.ordered}>Order Now</button>
                </div>
            </div> */}
        </div>
    )

}

export default buildControls;