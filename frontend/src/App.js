import logo from './logo.svg';
import './App.css';
import Header from './Header/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './Login.jsx/Login';
import { StyleSheet, css } from 'aphrodite';
import Signup from './Signup/Signup';
import Home from './Home/Home';
import Dashboard from './Dashboards/Dashboard';
import React, { Component } from 'react'
import DisplayNotifications from './Notofication/DisplayNotifications';
import { getLatestNotification } from './Config/Utils/Utils';
import CreateListing from './CreateProduct/CreateListing';
import axios from 'axios';
import { UserContext } from './Config/UserContext';
import SellerDashboard from './Dashboards/SellerDashboardr';

axios.defaults.baseURL = 'http://localhost:3000/api/'
axios.defaults.withCredentials = true;//check the cookies not finished

export class App extends Component {
  


  constructor(props) {
    super(props); 
      this.state = {
        displayDrawer : false,
        // user: setUser,
        // logOut: this.logOut,
        listNotifications : [
          {
            id:1,
            type: "default",
            value:"New course available"
          },
          {
            id:2,
            type: "urgent",
            value:"New resume availabletoday"
          },
          {
            id:3,
            type: "urgent",
            html: getLatestNotification()
          }
        ]
        
      };
 
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    // this.login = this.logIn.bind(this);
    // this.logOut = this.logOut.bind(this)

  }
  // logOut() {
  //   this.setState({
  //     user: user
  //   });
  // }

  // logIn = (email, password) => {
  //   this.setState({
  //     user: {
  //       email: email,
  //       password: password,
  //       isLoggedIn: true,
  //     }
  //   });
  // };
  markNotificationAsRead = (id) => {
    this.setState(prevState => ({
      listNotifications: prevState.listNotifications.filter(notification => notification.id !== id)
    }));
  };
  
  
  handleDisplayDrawer = () => {
    this.setState({displayDrawer: true})
    
  };

  handleHideDrawer = () => {
    this.setState({displayDrawer: false})
  };
  
  // handleKeyDown (e) {
  //   if (e.ctrlKey && e.key === 'h') {
  //       alert("Logging you out");
  //       this.props.logOut();
  //   };
  // };
  // componentDidMount(){
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount(){
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }
    
  render() {
    return (
      <div>
         <div className={css(styles.AppBody)}>
         <UserContext>
        
          <DisplayNotifications
            displayDrawer={this.state.displayDrawer}
            listNotifications={this.state.listNotifications}
            handleHideDrawer= {this.handleHideDrawer}
            handleDisplayDrawer= {this.handleDisplayDrawer}
            markNotificationAsRead={this.markNotificationAsRead}/>
          <Header  handleDisplayDrawer= {this.handleDisplayDrawer} role="buyer"/>
          
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path={"/api/auth/login"} element={<Login/>}/>
            <Route path={"/api/auth/signup"} element={<Signup/>}/>
            <Route path={"/api/user/:id"} element={<Dashboard />}/>
            {/* <Route path={"/api/user/:id"} element={<SellerDashboard />}/> */}
            <Route path={"/api/newProduct"} element={<CreateListing />}/>
          </Routes>
         </UserContext>
        
          </div>
        
      </div>
    )
  }
}


const styles = StyleSheet.create({
 
  AppBody: {
    // padding: "4rem",
    margin:0,
    padding:0,
    // height: "100%",
    height: "100vh",
    // fontSize: "1.5rem",
    '@media (max-width: 767px)': {
        
     },

  },
});


export default App;
