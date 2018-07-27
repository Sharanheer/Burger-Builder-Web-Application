import React, {Component} from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{

        state = {
            gotError: null
        }

        componentDidMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({gotError: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({gotError: error}); 
            }); 
        }

        componentWillUnmount(){
            // console.log('unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        
        hideBackdropHandler = () => {
            this.setState({gotError: null});
        }

        render(){
            return (
                <Aux>
                <Modal display={this.state.gotError} hideBackdrop={this.hideBackdropHandler}>
                    {this.state.gotError ? this.state.gotError.message : null}
                </Modal>    
                <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;