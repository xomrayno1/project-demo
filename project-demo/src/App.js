import logo from './logo.svg';
import './App.css';
import CourseList from './component/course/CourseList';
import StudentList from './component/student/StudentList';
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
 

function App() {
  return (
    <div className="App">
      <Router> 
        <Header/>
          <Switch>
            <Route path="/courses"  component={CourseList}/>  
            <Route path="/students"  component={StudentList}/>  
          </Switch>  
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
