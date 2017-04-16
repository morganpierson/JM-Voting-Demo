import React, { Component} from 'react';


class Item extends Component {
  render() {
    return (
      <div className='item'>
        <div className='vote-one'>
          <span>{this.props.item.item1.value}</span>
          <h2>{this.props.item.item1.text}</h2>
        </div>
        <span>VS.</span>
        <div className='vote-two'>
          <span>{this.props.item.item2.value}</span>
          <h2>{this.props.item.item2.text}</h2>
        </div>
      </div>
    )
  }
}

export default Item