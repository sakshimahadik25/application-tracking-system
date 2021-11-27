import 'bootstrap/dist/css/bootstrap.min.css'
import './static/App.css';

import React from 'react';
import Sidebar from './sidebar/Sidebar'
import ApplicationPage from './application/ApplicationPage'
import SearchPage from './search/SearchPage'
import LoginPage from './login/LoginPage'


export default class App extends React.Component {
  constructor(props){
    super(props)
    let mapRouter = {
      'SearchPage': <SearchPage/>,
      'ApplicationPage' : <ApplicationPage/>,
      'LoginPage': <LoginPage/>
    }
    this.state ={
      currentPage: <LoginPage/>,
      mapRouter: mapRouter,
      sidebar: false,
    }
    this.sidebarHandler = this.sidebarHandler.bind(this);
  };

  sidebarHandler = () => {
    this.setState({
      currentPage: this.state.mapRouter['ApplicationPage'],
      sidebar: true
    })
  }

  handleLogout = () => {
    this.setState({
      sidebar:false
    })
  }

  switchPage(pageName){
    this.setState({
      currentPage: this.state.mapRouter[pageName]
    })
  }

  render() {
    var app;
    // console.log(this.state.sidebar)
    if(this.state.sidebar){
      app = (<div className="main-page">
        <Sidebar switchPage={this.switchPage.bind(this)}/>
        <div className="main">
          <div className="content">
            <div className="">
              <h1 className="text-center">My applications</h1>
              {/* <span className="btn-icon ">
                <button className="btn btn-danger btn-icon"><i className="fas fa-plus"></i>&nbsp;New</button>
              </span> */}
            </div>
            {this.state.currentPage}
            <button style={{position: 'absolute',
                         bottom: '3vh',
                         left:'35vw'}}
                    onClick={this.handleLogout}>Logout

            </button>
          </div>
        </div>
      </div>
      )
    }
    else{
      app = (<div className="main-page">
      <div className="main">
        <div className="content">
          <h1 className="text-center" style={{padding: 0.4 + 'em'}}>My applications</h1>
          <div className="">
            {/* <span className="btn-icon ">
              <button className="btn btn-danger btn-icon"><i className="fas fa-plus"></i>&nbsp;New</button>
            </span> */}
          </div>
          <LoginPage side={this.sidebarHandler}/>
        </div>
      </div>
    </div>
    )
    }
    return app;
  }
}
