import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { getToken, signUp, storeToken } from '../api/loginHandler';

export default class LoginPage extends Component{

    constructor(props){
        super(props);

        this.state = {

        }
    }

    handleLogin = (uname, pwd) =>{
        console.log("Login click");
        let obj = {
            username: uname,
            password: pwd
        }
        //console.log(obj)
        getToken(obj).then((res) => {
            console.log(res)
            if(res['error'])
                throw new Error("Wrong username or password");
            storeToken(res)
            this.props.side()
        }).catch((error) => {
            console.log(error)
            alert("Error while login ! Wrong username or password");
        })
         
    }

    handleSignup = (fullname, uname, pwd) => {
        console.log("Signup click");
        let obj = {
            username: uname,
            password: pwd,
            fullName: fullname
        }
        //console.log(obj)
        signUp(obj).then((res) => {
            alert("Sign up successfull! Proceed to Login");
        }).catch((error) => {
            alert("Error while signing up !");
        })
         
    }

    handleSignupGoogle = () => {
        window.open("http://127.0.0.1:5000/users/signupGoogle") // Google oauth url
    }

    componentDidMount() {
        if(localStorage.getItem('token')=== null){
            const query = new URLSearchParams(window.location.search);
            const token=query.get('token')
            const expiry=query.get('expiry')
            let obj = {
                token: token,
                expiry: expiry
            }
            if(token){
              storeToken(obj)
              window.location.assign("http://localhost:3000/application-tracking-system") // changing back to this to avoid leaking data such as access tokens from the url
            }
        }
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
                                <label>Username</label>
                                <input type="text" className="form-control" id="uname" placeholder="Enter username" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" id="pwd" placeholder="Enter password" />
                            </div>

                            <button type="submit" onClick={(e) =>{
                                e.preventDefault();
                                let uname = document.querySelector("#uname").value
                                let pwd = document.querySelector("#pwd").value
                                this.handleLogin(uname, pwd)
                                }} 
                            className="btn btn-secondary btn-block">Login</button>

                            <button onClick={() => {
                                this.handleSignupGoogle()
                            }} className="btn btn-secondary btn-block"> Google Login
                            </button>

                        </form>
                    </Tab>
                    <Tab eventKey="signup" title="Signup">
                        <form>
                            <div className="form-group">
                                <label>Full name</label>
                                <input type="text" className="form-control" id="fullname" placeholder="Full name" />
                            </div>

                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" id="suname" placeholder="Enter username" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" id="spwd" placeholder="Enter password" />
                            </div>

                            <button type="submit" onClick={(e) =>{
                                e.preventDefault();
                                let name = document.querySelector("#fullname").value
                                let uname = document.querySelector("#suname").value
                                let pwd = document.querySelector("#spwd").value
                                this.handleSignup(name, uname, pwd)
                                }}  className="btn btn-secondary btn-block">Sign Up</button>

                            <button onClick={() => {
                                this.handleSignupGoogle()
                            }} className="btn btn-secondary btn-block"> Google Signup
                            </button>
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
