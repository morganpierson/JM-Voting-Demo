import { Mongo } from 'meteor/mongo';

const Items = new Mongo.Collection('items');

if(Meteor.isServer) {
  Meteor.publish('allItems', function() {
    return Items.find({}, {
      limit: 50,
      sort: { lastUpdated: 1 }
    })
  });


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
      check(item, Object);
      let date = new Date()
      if(position === 'itemOne') {
        if(Meteor.userId()) {
          Items.update(item._id, {
            $inc: {
              'item1.value': 1 
            },
            $set: {
              'lastUpdated': date
            }
          })
        } 
    } else {
      Items.update(item._id, {
          $inc: {
            'item2.value': 1 
          },
            $set: {
              'lastUpdated': date
            }
        })
      }
    }
  })
}

export default Items;