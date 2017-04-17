import React, { Component} from 'react';
import Items from '../api/items';
// const axios = require('axios');
// const token = '42856274.cf5eb03.2cbfd9a4ca93443e86cd9b8021491f7d'
// const userid = 42856274 
// const num_photos = 2;

class Item extends Component {

  // componentDidMount() {
  //   axios.get(`https://api.instagram.com/v1/users/${userid}/media/recent`)
  //   .then((response) => {
  //     console.log('Success: ', response)
  //   })
  //   .catch((error) => {
  //     console.log('Error: ', error)
  //   })
  // }

  voteOne() {
    Meteor.call('voteOnItem', this.props.item, 'itemOne')
  }

  voteTwo() {
    Meteor.call('voteOnItem', this.props.item, 'itemTwo')
  }

  render() {
    return (
      <div className='item'>
        <div className='vote-one' onClick={this.voteOne.bind(this)}>
          <span>{this.props.item.item1.value}</span>
          <h2>{this.props.item.item1.text}</h2>
        </div>
        <span>VS.</span>
        <div className='vote-two' onClick={this.voteTwo.bind(this)}>
          <span>{this.props.item.item2.value}</span>
          <h2>{this.props.item.item2.text}</h2>
        </div>
      </div>
    )
  }
}

export default Item