import React, { Component } from 'react';
import '../css/App.css';
import NavBar from './NavBar';
import { liftTokenToState } from '../actions/index'
import { connect } from 'react-redux';



import Login from './Login';
// import UserAccess from './UserAccess';
import Signup from './Signup';
import { UserProfile } from './UserProfile';

// import Home from './Home';
import Projects from './Projects';

import axios from 'axios';

import Paper from 'material-ui/Paper';
import {GridTile} from 'material-ui/GridList';
// import {GridList, GridTile} from 'material-ui/GridList';

// import CreateProjectForm from './CreateProjectForm';

const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 700,
    height: 400,
    display: 'inline',
  },
  layout: {
    zDepth: 15,
    margin: 10
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    liftTokenToState: userToken => dispatch(liftTokenToState(userToken)),
  }
}



class ConnectedApp extends Component {
  constructor(props) {
    super()
    this.state = {
      token:'',
      user: {}
    }
    // this.liftTokenToState = this.liftTokenToState.bind(this)
    this.logout = this.logout.bind(this)
  }

  // liftTokenToState(data) {
  //   this.setState({
  //     token: data.token,
  //     user: data.user
  //   })
  // }

  logout() {
    console.log('Logging out')
    localStorage.removeItem('mernToken')
    this.setState({
      token: '',
      user: {}
    })
  }

  componentDidMount() {
    var token = localStorage.getItem('mernToken')
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      console.log("Token was undefined in localStorage")
      localStorage.removeItem('mernToken')
      this.setState({
        token:'',
        user: {}

      })
    } else {
      console.log("Token was FOUND!")
      console.log(this.props.user)
      axios.post('/auth/me/from/token', {
        token
      }).then( result => {
        console.log("This is the result after /auth/me/from/token:")
        console.log(result)
        localStorage.setItem('mernToken', result.data.token)
        console.log(localStorage.mernToken)

        // this.setState({
        //   token: result.data.token,
        //   user: result.data.user
        // })
        this.props.liftTokenToState(result.data)
      }).catch( err => console.log(err) )
    }
  }

  render() {
    //this.props.user
    let theUser = this.props.user
    if (typeof theUser === 'object' && Object.keys(theUser).length > 0) {
      return (
        <div>
          <NavBar state={this.state}/>
          {/* <Paper style={style.layout}>
            <div className='row'>
              <div className="col s6 m6 l6">
                <UserProfile user={theUser} logout={this.logout} />
              </div>
            </div>
          </Paper> */}
          {/* <Projects /> */}
        </div>
      )
    } else {
      return (
        <div>
          <NavBar state={this.state}/>
          {/* <Paper style={style.layout}>
            <GridTile>
              <div className="col s6 m6 l6">
                <Signup liftToken={this.liftTokenToState} />
              </div>
            </GridTile>

            <GridTile>
              <div className="col s6 m6 l6">
                <Login liftToken={this.liftTokenToState} />
              </div>
            </GridTile>
          </Paper> */}
        </div>
      )
    }
  }

}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp)
export default App;
