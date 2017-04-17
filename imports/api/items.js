import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
const Items = new Mongo.Collection('items');
let Client = require('instagram-private-api').V1;
var InstagramPosts, streamOfPosts;
InstagramPosts = require('instagram-screen-scrape').InstagramPosts;
 
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
    },
    testIg() {
      let device = new Client.Device('m_0_m_0_m_0_m_0');
      let storage = new Client.CookieMemoryStorage();
      console.log(`this is device: ${device}`);
      console.log(`this is storage: ${storage}`)
      // And go for login
      Client.Session.create(device, storage, 'm_0_m_0_m_0_m_0', 'mlp3330207')
      .then(function(session) {
      console.log(`this is session: ${session}`);
      // Now you have a session, we can follow / unfollow, anything...
      // And we want to follow Instagram official profile
      return [session, Client.Account.searchForUser(session, 'instagram')]
      })
      .spread(function(session, account) {
      console.log(`this is account ${account}`);
      return Client.Relationship.create(session, account.id);
      })
      .then(function(relationship) {
      console.log(relationship.params)
      // {followedBy: ... , following: ... }
      // Yey, you just followed @instagram
      });
    },
    getLocationPhotos() {
     
      let device = new Client.Device('m_0_m_0_m_0_m_0');
      let storage = new Client.CookieMemoryStorage();
      Client.Session.create(device, storage, 'm_0_m_0_m_0_m_0', 'mlp3330207')
      .then(function(session) {
      console.log(`this is session: ${session}`);
      // Now you have a session, we can follow / unfollow, anything...
      // And we want to follow Instagram official profile
      let _ = require('underscore');
        let Promise = require('bluebird');
        var accountId = '25025320'
        var feed = new Client.Feed.UserMedia(session, accountId);

        Promise.mapSeries(_.range(0, 20), function() {
        return feed.get();
      })
      .then(function(results) {
        console.log("I'm looking for photos")
        // result should be Media[][]
        var media = _.flatten(results);
        console.log("this is media: ", media)
        var urls = _.map(media, function(medium) {
          return _.last(medium.images)
        });
        console.log(urls);
      })
      return [session, Client.Account.searchForUser(session, 'instagram')]
      })
  }
})
}


export default Items;