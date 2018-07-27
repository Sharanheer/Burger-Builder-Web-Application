import React, {Component} from 'react';
import { connect } from 'react-redux'; 

import Aux from '../../Hoc/Aux';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = { showBackdrop : false};

    hideBackdropHandler = () => {
        this.setState({showBackdrop : false});
    }

    openSideDrawerHandler = () => {
        this.setState({showBackdrop : true});
    }

    render(){
        return(
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} openSideDrawer={this.openSideDrawerHandler}/>
                <SideDrawer 
                    isAuth={this.props.isAuthenticated} 
                    display={this.state.showBackdrop} 
                    clicked={this.hideBackdropHandler}/> 
                <main className="Content">    
                {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);