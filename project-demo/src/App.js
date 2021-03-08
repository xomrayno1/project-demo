 
import './App.css';
import CourseList from './component/course/CourseList';
import StudentList from './component/student/StudentList';
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import Login from './component/authentication/Login';
 
import {useEffect, useState} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { UserProvider } from './common/UseContext'
import AuthenticationRoute from './component/layout/AuthenticationRoute';


function App() {
  // const user = { name: 'Tania', loggedIn: false }
  const [user,setUser] = useState({
    username: '',
    password: '',
    hasShowError:  false,
    loggedIn: false
  });
 
  return (
    <div className="App">
      <Router > 
        <UserProvider value={[user,setUser]}>
          <Header/>
            <Switch>
              <AuthenticationRoute path="/courses"  component={CourseList}/>  
              <AuthenticationRoute path="/students"  component={StudentList}/>
              <Route path="/logout"  component={Login}/> 
              <Route path="/login"  component={Login}/> 
            </Switch>  
          <Footer/>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
