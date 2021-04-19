 
import './App.css';
import CourseList from './component/course/CourseList';
import StudentList from './component/student/StudentList';
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import Login from './component/authentication/Login';
 
import {  useState} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { UserProvider } from './common/UseContext'
import AuthenticationRoute from './component/layout/AuthenticationRoute';
import Enrol from './component/enrol/Enrol';
import NotFound from './component/NotFound';


function App() {

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
              <AuthenticationRoute exact path="/students"  component={StudentList}/>
              <AuthenticationRoute path="/students/enrol/:id"  component={Enrol}/>
              <Route  path="/logout"  component={Login}/> 
              <Route  exact path="/login"  component={Login}/> 
              <Route path="*"  component={NotFound}/>
            </Switch>  
          <Footer/> 
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
