
import React, { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import {setCurrentUser} from './redux/User/user.actions';

//hoc
import WithAuth from './hoc/withAuth';

// Layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import './default.scss'; 

const App = props => {
  const dispatch = useDispatch(); 

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
   if(userAuth){
     const userRef = await handleUserProfile(userAuth);
     userRef.onSnapshot(snapshot => {
       dispatch(setCurrentUser({
         id : snapshot.id,
           ...snapshot.data()
       }))
     })
   }
   dispatch(setCurrentUser(userAuth));
 });

    return () => {
      authListener();
    };

  },[]);

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}/>
           <Route path="/registration" render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}/>
          <Route path="/login"
           render={() =>(
            <MainLayout>
              <Login />
            </MainLayout>  
          )}/>
          <Route path="/recovery" render={() =>(
            <MainLayout>
              <Recovery />
            </MainLayout>
          )} />
           <Route path="/dashboard" render={() =>(
              <WithAuth>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </WithAuth>
          )} />
        </Switch>
      </div>
    );
  }

export default App;

/*class elements{
  constructor(options){
    this.score = options.score;
    this.average = options.average;
    this.pass = options.pass;
  };
};

class makeClasses extends elements{
  constructor(options){
    super(options);
    this.firstName = options.firstName;
    this.lastName = options.lastName;
  }
}

const get_Classes = new makeClasses({firstName : 'Augustine', lastName : 'Odoemene'},{score : '68', average : '53', pass : 'pass'});
const make_String  = `${get_Classes.firstName} ${get_Classes.lastName} your score is ${get_Classes.score} with an average of ${get_Classes.average} and you have ${pass} mark as your remark`
console.log(make_String);*/