import { Meteor } from 'meteor/meteor';

const Tests = new Mongo.Collection('tests')

Meteor.startup(() => {
  Tests.insert({
    name: 'Hi',
    value: 1
  })
})