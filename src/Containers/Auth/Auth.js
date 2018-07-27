import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
 
import './Auth.css'
import Button from '../../Components/UI/Button/Button';
import * as actions from '../../Store/actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner';


class Auth extends Component{

    state = {
        email: null,
        password: null,
        isSignUp: true
    }

    AuthHandler = (event) => {
        event.preventDefault();
        // console.log('Auth handler');
        this.props.onAuth(this.state.email, this.state.password, this.state.isSignUp);
    }


    inputChangeHandler = (type, event) => {
        let updatedState = {...this.state};
        updatedState[type] = event.target.value;
        this.setState({...updatedState});
    }

    onToggle = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        })
    }


    render(){
        let redirect = null;
        if(this.props.token !==null ){
            redirect = <Redirect to={this.props.building ? "/checkout" : "/" }/>;
        }

        let form = (
            <div>
            <input className="Input" type="email" name="email" placeholder="Your Email" required onChange={(event) => {this.inputChangeHandler("email", event)}}/>
            <input className="Input" type="password" name="password" placeholder="Your Password" required onChange={(event) => {this.inputChangeHandler("password", event)}}/>
            </div>
        );
        if(this.props.spinner)
            form = <Spinner />;

        let errorMessage = null;
        if(this.props.error)
            errorMessage = <p style={{color: 'red'}}>{this.props.error}</p>

        return (
            <div className="Auth">
                {redirect}
                {errorMessage}
                <h4>Enter Email and Password...!</h4>
                <form onSubmit={this.AuthHandler}>
                    {form}
                    <br />
                    <Button btnType="Success" >{ this.state.isSignUp ? 'Sign Up' : 'Sign In' }</Button> 
                </form>
                <Button btnType="Danger" clicked={this.onToggle}> Click to { this.state.isSignUp ? 'Sign In' : 'Sign Up' } </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        building: state.ing.building,
        spinner: state.auth.spinner,
        error: state.auth.error,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);