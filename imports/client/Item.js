import React, { Component} from 'react';
import Items from '../api/items';

class Item extends Component {

  voteOne() {
    Items.update(this.props.item._id, {
      $inc: {
        'item1.value': 1 
      }
    })
  }

  voteTwo() {
    Items.update(this.props.item._id, {
      $inc: {
        'item2.value': 1 
      }
    })
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