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
import { AuthUser, UserContext } from './Config/UserContext';
import SellerDashboard from './Dashboards/SellerDashboardr';
import IndexPage from './IndexPage/IndexPage';
import Product from './ProductPage/Product';
import Profile from './Profile/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';



axios.defaults.baseURL = 'http://localhost:3000/api/'
axios.defaults.withCredentials = true;//check the cookies not finished

export class App extends Component {
  


  constructor(props) {
    super(props); 
      this.state = {
        displayDrawer : false,
        user: AuthUser,
        role: null,
        logOut: this.logOut,
        listNotifications : [
          {
            id:1,
            type: "default",
            value:"New Product available"
          },
          {
            id:2,
            type: "urgent",
            value:"New message from seller"
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
    this.logIn = this.logIn.bind(this);
    this.setRole = this.setRole.bind(this);
    this.logOut = this.logOut.bind(this)

  }
  logOut() {
    this.setState({
      user:{
        user: null,
        isLoggedIn: false,
      }
    });
  }

  logIn = (user) => {
    this.setState({
      user: {
        user,
        isLoggedIn: true,
      }
    });
    console.log(user)
  };

  setRole = (role) => {
    this.setState({
     role: role
    });
  };

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
         <UserContext.Provider value={{AuthUser: this.state.user,
          logOut: this.state.logOut,}}>
        
          <DisplayNotifications
            displayDrawer={this.state.displayDrawer}
            listNotifications={this.state.listNotifications}
            handleHideDrawer= {this.handleHideDrawer}
            handleDisplayDrawer= {this.handleDisplayDrawer}
            markNotificationAsRead={this.markNotificationAsRead}
            logout={this.logOut}/>
          <Header  handleDisplayDrawer= {this.handleDisplayDrawer} userRole={this.state.role}/>
          
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path={"/api/auth/login"} element={<Login login={this.logIn} setRole={this.setRole} />}/>
            <Route path={"/api/auth/signup"} element={<Signup signup={this.logIn} userRole={this.state.role}/>}/>
            <Route path={"/api/user/:id"} element={<Dashboard  />}/>
           
            <Route path={"/index"} element={<IndexPage role={this.state.role}/>}/>
            
            {this.state.user.isLoggedIn ?
            <Route path={"/api/newProduct"} element={<CreateListing userId={this.state.user.user._id} user={AuthUser.user} />}/>: ""}
             {this.state.user.isLoggedIn ?
            <Route path={"/api/updateProduct/:id"} element={<CreateListing userId={this.state.user.user._id} user={AuthUser.user} />}/>: ""}
            <Route path={"/api/product/:id"} element={<Product/>}/>
            {this.state.user.isLoggedIn === true ?
            <Route path={"/api/profile"} element={<Profile id={this.state.user.user._id} login={this.logIn}/> }/> : 
            <Route path={"/index"} element={<IndexPage/>}/> }
          </Routes>
         </UserContext.Provider>
         <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
         />
        
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
