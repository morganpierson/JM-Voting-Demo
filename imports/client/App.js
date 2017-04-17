import React, { Component } from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import Items from '../api/items';
import { createContainer } from 'meteor/react-meteor-data';
import Item from './Item';
let Client = require('instagram-private-api').V1;

class App extends Component {
  constructor() {
    super();

    this.state = {
      images: []
    }

    this.addItems = this.addItems.bind(this);
    this.showAll = this.showAll.bind(this);
  }

  componentWillMount() { 
   Meteor.call('getLocationPhotos')
  }

  showAll() {
    if(this.props.showAll) {
      Session.set('showAll', false)
    } else {
      Session.set('showAll', true)
    }
  }

  addItems(e) {
    e.preventDefault()
    console.log("images: ",this.state.images)
    const itemOne = this.refs.item1.value.trim()
    const itemTwo = this.refs.item2.value.trim()
    if(itemOne !== '' && itemTwo !== '') {
      check(itemOne, String)
      check(itemTwo, String)
      Meteor.call('getLocationPhotos');
      //Meteor.call('testIg');
      Meteor.call('insertNewItem', itemOne, itemTwo, (err, res) => {
        if(!err) {
          this.refs.item1.value = '';
          this.refs.item2.value = '';
        }
      });  

      
  }
  }

  render() {
    if(!this.props.ready) {
      return <div>Loading...</div>
    }
    return(
      <div>
        <header>
          <h1>Jumper Media Voting</h1>
          <LoginButtons />
          <button onClick={this.showAll}>Show {this.props.showAll ? 'One' : 'All'}</button>
        </header>
        <main>
          <form onSubmit={this.addItems} className='new-items'>
            <input type='text' ref='item1' />
            <input type='text' ref='item2' />
            <button type='submit'>Add Items</button>
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
  let itemsSub = Meteor.subscribe('allItems');
  let showAll = Session.get('showAll');

  return {
    showAll: showAll,
    ready: itemsSub.ready(),
    items: Items.find({}, {
      limit: showAll ? 50 : 1,
      sort: { lastUpdated: 1 }
    }).fetch()
  }
}, App)



class Heading extends Component {
  
  render() {
    return (
        <h1>{this.props.count}</h1>
    )
  }
}

