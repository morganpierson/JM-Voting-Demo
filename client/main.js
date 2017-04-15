import React, { Component } from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'))
})

class App extends Component {
  render() {
    return(
      <div>
        <h1>Hello World!</h1>
      </div>
    )
  }
}