import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });
  
 Users = new Mongo.Collection('users');
 Itinerary = new Mongo.Collection('itinerary');

 Api.addCollection(Users);
 
  Api.addCollection(Meteor.users, {
    excludedEndpoints: ['getAll', 'put', 'get', 'post'],
    routeOptions: {
      authRequired: true
    },
    endpoints: {
      post: {
        authRequired: false
      },
      delete: {
        roleRequired: 'admin'
      }
    }
  });

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
}
});
