
import React, { Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

// Layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout'

// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import './default.scss'; 

const initialState = {
  currentUser : null
}

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      ...initialState
    };
  }

  authListener = null;

  componentDidMount(){
     this.authListener = auth.onAuthStateChanged(async userAuth => {
    if(userAuth){
      const userRef = await handleUserProfile(userAuth);
      userRef.onSnapshot(snapshot => {
        this.setState({
          currentUser : {
            id : snapshot.id,
            ...snapshot.data()
          }
        })
      })
    }
    this.setState({
      ...initialState
    });
  })
}

  componentWillUnmount(){
      this.authListener();
  }

  render(){

    const { currentUser } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout currentUser={currentUser}>
              <Homepage />
            </HomepageLayout>
          )}/>
           <Route path="/registration" render={() => currentUser ? <Redirect to ="/"/> : (
            <MainLayout currentUser={currentUser}>
              <Registration />
            </MainLayout>
          )}/>
          <Route path="/login"
           render={() => currentUser ? <Redirect to="/" /> :(
            <MainLayout currentUser={currentUser}>
              <Login />
            </MainLayout>  
          )}/>
        </Switch>
      </div>
    );
  }
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