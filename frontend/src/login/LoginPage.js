import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

export default class LoginPage extends Component{

    constructor(props){
        super(props);

        this.state = {

        }
    }

    handleLogin = (e) =>{
        e.preventDefault();
        console.log("Login click");
        this.props.side()    
    }

    handleSignup = () => {

    }

    render() {
        return(
            <div className="auth-wrapper" style={this.authWrapper}>
                <div className="auth-inner" style={this.authInner}>
                {/* <div className="logindiv" style={this.divStyle}> */}
                <Tabs defaultActiveKey="login" id="logintab" className="mx-auto" style={{paddingLeft: '25%'}}>
                    <Tab eventKey="login" title="Login">
                        <form>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>

                            <button type="submit" onClick={this.handleLogin} className="btn btn-secondary btn-block">Login</button>
                        </form>
                    </Tab>
                    <Tab eventKey="signup" title="Signup">
                        <form>
                            <div className="form-group">
                                <label>First name</label>
                                <input type="text" className="form-control" placeholder="First name" />
                            </div>

                            <div className="form-group">
                                <label>Last name</label>
                                <input type="text" className="form-control" placeholder="Last name" />
                            </div>

                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>

                            <button type="submit" onClick={this.handleSignup} className="btn btn-secondary btn-block">Sign Up</button>
                        </form>
                    </Tab>
                </Tabs> 
                </div>
            </div>
                           
        )
    }

    divStyle = {
        width: '50vw',
      };    
    
    authWrapper = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'left',
        marginTop: '5vh',
    };
      
    authInner = {
        width: '450px',
        margin: 'auto',
        background: '#ffffff',
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        padding: '40px 55px 45px 55px',
        borderRadius: '15px',
        transition: 'all .3s'
    };
}