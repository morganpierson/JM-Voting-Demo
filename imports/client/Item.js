import React, { Component} from 'react';
import Items from '../api/items';

class Item extends Component {

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