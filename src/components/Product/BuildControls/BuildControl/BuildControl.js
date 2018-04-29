import React from 'react';
import Logo from '../../../Logo/Logo';

const buildControl = (props) => {
    return (
            <div className="card mr-md-5 mt-md-5" style={{ width: '20rem' }}>
                <Logo height="100" width="150" />
                <div className="card-body">
                    <h5 className="card-title">{props.label}</h5>
                    <button className="mr-md-3 btn btn-primary"
                        onClick={props.added}><strong>MORE</strong></button>
                    <button
                        className="btn btn-warning"
                        onClick={props.removed} disabled={props.disabled}><strong>LESS</strong></button>
                </div>
            </div>
    )
};

export default buildControl; 