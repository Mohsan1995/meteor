import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });


 Itinerary = new Mongo.Collection('itinerary');

  //Create Rou:te for User Collection
  Api.addCollection(Meteor.users);

  Api.addRoute('itinerary/:id', {authRequired: true}, {
    get: function () {
      return Itinerary.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ['id', 'name'],
      action: function () {
        if (Itinerary.remove(this.urlParams.id)) {
          return {status: 'success', data: {message: 'UserAdd'}};
        }
        return {
          statusCode: 404,
          body: {status: 'fail', message: 'User not add to the bdd'}
        };
      }
    }
  });
});
