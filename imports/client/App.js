import React, { Component } from 'react';

let hello = 'Hello World!'
// let headingClick = () => {
//   console.log('This is clicked')
// }


class App extends Component {
  constructor() {
    super();

    this.state = {
      count: 0
    }

    this.headingClick = this.headingClick.bind(this);
  }

 headingClick() {
  this.setState({ count: this.state.count += 1 })
  }


  render() {
    return(
        <header onClick={this.headingClick}>
          <Heading count={this.state.count} />
        </header>
 
    )
  }
}

class Heading extends Component {
  render() {
    return (
        <h1>{this.props.count}</h1>
    )
  }
}

export default App;