import React, {useContext} from 'react';
 
import UserContext from '../../common/UseContext'  
import { Redirect, Route } from 'react-router-dom';

 
function AuthenticationRoute(props) {
    const [user,setUser] = useContext(UserContext);
    // if(!user.loggedIn){
    //    return <Redirect to='login'/>
    // }else{
    //     return <Route  {...props}/>
    // }
    return <Route    {...props}/>
}

export default AuthenticationRoute;