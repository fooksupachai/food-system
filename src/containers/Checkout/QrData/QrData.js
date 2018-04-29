import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import { Button } from 'reactstrap';
import axios from 'axios';
import firebase from 'firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal)


class QrData extends Component {
  
    constructor(props){
        super(props)
        this.state = {
          delay: 300,
          result: 'No result',
          userid:null
        }
        this.handleScan = this.handleScan.bind(this)
      }
      handleScan(data){
        console.log(data);
        if(data){
          this.setState({
            result: data,
            userid:data
          })
        }
      }
      handleError(err){
        console.error(err)
      }

      messageModal = (data) =>{
        MySwal.fire({
          title: <p>Hello World</p>,
          footer: 'Copyright 2018',
          onOpen: () => {
            // `MySwal` is a subclass of `Swal`
            //   with all the same instance & static methods
            MySwal.clickConfirm()
          }
        }).then(() => {
          return MySwal.fire(<p> {data}</p>)
        })
      }

        createOrder = () =>{
            axios({
              method: 'post',
              url: `https://jc-cafeteria-a60e0.firebaseio.com/stock.json`,
              data: {
                  orders: this.props.orders,
                  price: this.props.price,
                  time: firebase.database.ServerValue.TIMESTAMP
              }
            }).then(res => {
              console.log(res);
              this.props.history.push( '/' );
            }).catch(err => {
              console.log(err);
            })
        }

      qrHandler = () => {
        axios({
          method: 'put',
          url: `http://localhost:3009/qrcode/${this.state.userid}`,
          data: {
            credit: this.props.price
          }
        }).then(res => {
              if( res.data.credit) {
                this.messageModal("ยอดเงินคงหลือ " + res.data.credit)
                this.createOrder()
              } else {
                this.messageModal("ยอดเงินคงหลือไม่พอ")
                this.props.history.push( '/' );
              }
              console.log(res);
        }).catch(err => {
              this.messageModal("มีบางอย่างผิดพลาด")
              this.props.history.push( '/' );
              console.log(err);
        })
        console.log(new Date().getTime());
      
      

      }
      render(){
          console.log("Qrdata page");
          
          console.log(this.props.price)
        return(
          <div>
            <QrReader
              delay={this.state.delay}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
              />
              <div className="container">
                <div className="text-center">
                    Checkout
                    <div>
                            <Button color="primary" onClick={this.qrHandler}>CONTINUE</Button>
                    </div>
                </div>
            </div>
            <p>{this.state.result}</p>
          </div>
        )
      }
}

export default QrData;