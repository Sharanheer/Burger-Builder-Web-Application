import React, {Component} from 'react';

import './Modal.css';
import Aux from '../../../Hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{

    shouldComponentUpdate(prevState){
        return prevState.display !== this.props.display || this.props.children !== prevState.children;
    }

    render(){
        return (
            <Aux>
            <Backdrop display={this.props.display} back={this.props.hideBackdrop}/>
            <div className="Modal" 
                style={{
                    transform : this.props.display ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.display ? 1 : 0
                }}
            >
                {this.props.children}
            </div>
            </Aux>
        ); 
    }
}
 
export default Modal;
