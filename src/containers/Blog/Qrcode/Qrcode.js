import React, { Component } from 'react';

import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-qrs';
import Input from '../../../components/UI/Input/Input';
import QrReader from 'react-qr-reader'
import { Button, Form } from 'reactstrap'


class Qrcode extends Component {

    constructor(props) {
        super(props)
        this.state = {
            delay: 300,
            result: 'No result',
            qrForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'number',
                        placeholder: 'เติมจำนวนเงินที่ต้องการ'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
            },
            formIsValid: false,
            loading: false,
            price: null
        }
        this.handleScan = this.handleScan.bind(this)
    }

    handleScan(data) {
        if (data) {
            this.setState({
                result: data,
            })
        }
    }
    handleError(err) {
        console.error(err)
    }
    componentWillMount() {
        this.setState({ userid: this.props.match.params.userid })
    }

    qrHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.qrForm) {
            formData[formElementIdentifier] = this.state.qrForm[formElementIdentifier].value;
        }
        this.setState({ price: this.state.qrForm.name.value })
        console.log(this.props)
        const qrcode = {
            username: this.state.result,
            credit: this.state.qrForm.name.value
        }
        console.log(qrcode);

        axios.post('http://localhost:3009/qrcode', qrcode)
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });


    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedQrForm = {
            ...this.state.qrForm
        };
        const updatedFormElement = {
            ...updatedQrForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedQrForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedQrForm) {
            formIsValid = updatedQrForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ qrForm: updatedQrForm, formIsValid: formIsValid });
    }

    render() {
        console.log(this.state.qrForm.name.value)
        const formElementsArray = [];
        for (let key in this.state.qrForm) {
            formElementsArray.push({
                id: key,
                config: this.state.qrForm[key]
            });
        }
        let form = (
            <div>
                <Form onSubmit={this.qrHandler}>
                    {formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <Button className="btn btn-success mt-md-3 mb-md-3" disabled={!this.state.formIsValid}>เติมเงิน</Button>
                 </Form>
            </div>
            
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className="container">
                <div className="text-center">
                    <h4>เติมเงิน</h4>
                        {form}
                    <div>
                </div>
                
                <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                />
                <p>{this.state.result}</p>
            </div>
            </div>
        );
    }
}

export default Qrcode;