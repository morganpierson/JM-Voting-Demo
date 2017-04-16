import { Mongo } from 'meteor/mongo';

const Items = new Mongo.Collection('items');

Meteor.methods({
  insertNewItem(itemOne, itemTwo) {
    Items.insert({
      item1: {
        text: itemOne,
        value: 0
      },
      item2: {
        text: itemTwo,
        value: 0
      }
    })
  },
  voteOnItem(item, position) {
    if(position === 'itemOne') {
    if(Meteor.userId()) {
      Items.update(item._id, {
        $inc: {
          'item1.value': 1 
        }
      })
    } 
  } else {
    Items.update(item._id, {
        $inc: {
          'item2.value': 1 
        }
      })
  }
  }
})

export default Items;