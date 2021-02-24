import React, { Component } from 'react';
import './App.css';
import { Input } from './Input';

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = {

    };
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
                />
              </label> 

              <label>
                Password  
                <input
                  type='password'
                  email='password'
                />
              </label>            
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
