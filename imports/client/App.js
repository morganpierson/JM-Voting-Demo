import React, { Component } from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import Items from '../api/items';
import { createContainer } from 'meteor/react-meteor-data';
import Item from './Item';

class App extends Component {
  constructor() {
    super();

    this.addItems = this.addItems.bind(this);
  }

  addItems(e) {
    e.preventDefault()

    const itemOne = this.refs.item1.value.trim();
    const itemTwo = this.refs.item2.value.trim();
    if(itemOne !== '' && itemTwo !== '') {
      check(itemOne, String)
      check(itemTwo, String)
      Meteor.call('insertNewItem', itemOne, itemTwo, (err, res) => {
        if(!err) {
          this.refs.item1.value = '';
          this.refs.item2.value = '';
        }
      });

      
  }
  }

  render() {
    return(
      <div>
        <header>
          <h1>Level up voting</h1>
          <LoginButtons />
        </header>
        <main>
          <form onSubmit={this.addItems} className='new-items'>
            <input type='text' ref='item1' />
            <input type='text' ref='item2' />
            <button type='submit'>Submit vote</button>
          </form>
          {this.props.items.map((item) => {
            return (
              <Item item={item} key={item._id}/>
            )
          })}
        </main>
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    items: Items.find({}).fetch()
  }
}, App)



class Heading extends Component {
  render() {
    return (
        <h1>{this.props.count}</h1>
    )
  }
}

