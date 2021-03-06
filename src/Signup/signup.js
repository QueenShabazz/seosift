import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import 'firebase/auth';
import * as firebase from 'firebase/app';
import Alert from 'react-bootstrap/Alert';



function AlertDismissibleExample(props) {
  if (props.err) {
    return (
      <Alert variant="danger" onClose={() => {props.setShow()}} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
       {props.err}
      </Alert>
    );
  }
   return (<></>)
}

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      email: '',
      password: '',
      err: '',
      show: true
    }
    this.signup = this.signup.bind(this);
    // this.authListener = this.authListener.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  signup(e) {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((u) => { 
      // window.location.reload(false)
      // (console.log(history))
      // history.push("/login")
      // this.props.history.push('/');
            
            //  localStorage.setItem('user', u)
            //  console.log(u);
            //  authListener() {
              firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  this.setState({ user })
                  localStorage.setItem('user', user.uid)
                } else {
                  this.setState({ user: null })
                  localStorage.removeItem('user')
                }
              })
              this.props.history.push('/login');
            // }
             
      
    })
    .catch((error) => {
        this.setState({ err: error.message })
    })
  }

 
  render() {
    return (
      <div style={{flexDirection:"column"}}>
      <div  id="signup" style={{height: "15vh"}}></div>
        <h1 id="#login">
          Signup 
        </h1>
        {/* {this.state.err} */}
        <AlertDismissibleExample 
          show={true}
          setShow={()=>{this.setState({err: ""}); this.state.err=""}}
          err={this.state.err}
        />
        <div style={{ padding: 30 }}>
          <InputGroup className="mb-3" name="email" onChange={this.handleChange}>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1"><span aria-label="password" role="img">📧</span></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="email"
              placeholder="email"
              aria-label="email"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup className="mb-3" name="password" onChange={this.handleChange}>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1"><span aria-label="password" role="img">🔒</span></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="password"
              placeholder="password"
              aria-label="password"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <Button onClick={(e) => this.signup(e)}>
            Sign Up
          </Button>

        </div>
       
      </div>
    )
  }
}
