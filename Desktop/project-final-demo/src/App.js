import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


import AdminLayout from "layouts/Admin.js";
import React, { useState } from 'react';
import Login from "components/component/authentication/Login";
import { UserProvider } from './common/UseContext'
import AuthenticationRoute from './components/component/authentication/AuthenticationRoute'
import Enrol from "./components/component/enrol/Enrol";

function App(props) {
   
    const [user, setUser] = useState({
        username: '',
        password: '',
        isLogin: localStorage.getItem("auth")  || false
    })
     
    return (
        <BrowserRouter>
            <UserProvider value={[user, setUser]}>
                <Switch>
                    
                    <AuthenticationRoute path="/admin" render={(props) => <AdminLayout {...props} />} />
                    <AuthenticationRoute exact path="/admin/students/enrol/:id" component={Enrol}  />
                    {/* <Route exact path="/login" component={Login} /> */}
                    <Route exact path="/login" render={
                        () => localStorage.getItem("auth") ? <Redirect to="/admin/dashboard"/> : <Login/>
                    } />
                    <Route exact path="/logout" component={Login} />
                    {/* <Redirect from="/logout" to="login" /> */}
                    <Redirect   from="/" to="/admin/dashboard" />
                </Switch>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;



// function App(props) {
//     const [user,setUser] = useState({
//         username: '',
//         password: '',
//         hasShowError:  false,
//         loggedIn: false
//       });
//     return (
//         <div className="App">
//             <Router >
//                 <UserProvider value={[user, setUser]}>
//                     <Header />
//                     <Switch>
//                         <AuthenticationRoute path="/courses" component={CourseList} />
//                         <AuthenticationRoute exact path="/students" component={StudentList} />
//                         <AuthenticationRoute path="/students/enrol/:id" component={Enrol} />
//                         <Route path="/logout" component={Login} />
//                         <Route exact path="/login" component={Login} />
//                         <Route path="*" component={NotFound} />
//                     </Switch>
//                     <Footer />
//                 </UserProvider>
//             </Router>
//         </div>
//     );
// }
