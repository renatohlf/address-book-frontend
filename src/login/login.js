import React, { Component } from 'react';
import securityService from '../services/security-service';
import './login.css';
export default class Login extends Component {

  constructor(props) {
    super(props)


    this.state = {
      username: '',
      password: '',
      error: '',
      token: ''
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };



  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {

    securityService.login(this.state.username, this.state.password)
      .then(data => {
        console.log(data);
        this.setState({ token: data.token });
        // UserService.getAll(this.state.token).then(data => console.log(data));

      },
        error => {
          //console.log(error);
          this.setState({ error, isLoading: false })
        })

  }


  render() {
    return (
      <div className="content">
        <div>
          <input className="loginFields" type='text' placeholder='Username' value={this.state.username} onChange={this.handleChangeUsername} />
        </div>
        <div>
          <input className="loginFields" type='password' placeholder='Password' value={this.state.password} onChange={this.handleChangePassword} />
        </div>
        <button className="btnLogin" onClick={this.handleSubmit}>Login</button>
      </div>
    )
  }
}
