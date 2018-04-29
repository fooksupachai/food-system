/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, Form } from 'reactstrap';
import ReactAux from '../../../hoc/ReactAux'
class ModalExample extends React.Component {
        componentWillUpdate() {
          console.log('[OrderSummary] WillUpdate');
          // console.log(this.props)
        }
        constructor(props) {
          super(props);
          this.state = {
            modal: false,
            backdrop: true
          };

          this.toggle = this.toggle.bind(this);
        }

        toggle() {
          this.setState({
            modal: !this.state.modal
          });
        }

       
      render() {
            return (
              <ReactAux>
                <div className="container">
                  <Form inline onSubmit={(e) => e.preventDefault()}>
                    <Button color="danger" disabled={!this.props.purchasable} onClick={this.toggle}>{this.props.buttonLabel}</Button>
                  </Form>
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
                    <ModalBody>
                      {this.props.children}
                    </ModalBody>
                    <ModalFooter>
                      <Button color="warning" onClick={this.toggle}>CANCEL</Button>
                      <Button color="primary" onClick={this.props.purchaseContinued}>CONTINUE</Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </ReactAux>
            );
          }
}

export default ModalExample;