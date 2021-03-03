import React, { Component } from 'react';
import './App.css';
import { Input } from './Input';

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  submit = async(event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/api/user/create', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });

    const { success } = await response.json();
    alert(`Result: ${success}`);
  }

  changeValue =  (key, value) => {
    this.setState({
      [key]: value
    });

    console.log(this.state);
  }
  //JSX
  render = () => {
    return (
      <div>
        <div>
          <h1>Log In</h1>
          <p>Type in your email and password.</p>
          <div>
            <form>
              <label>
                Email Address
                <input 
                  type='email'
                  name='email'
                  value={this.state.email}
                  onChange={(event) => this.changeValue('email', event.target.value)}
                />
              </label> 

              <label>
                Password  
                <input
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange={(event) => this.changeValue('password', event.target.value)}
                />
              </label> 
              <input type = 'submit' value='Submit' />

            </form>

            <Input 
              active={true}
              label='Test'
            />
          </div>
        </div>

        <div>

        </div>
      </div>
    );
  }
}
