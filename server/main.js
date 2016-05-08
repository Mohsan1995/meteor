import { Meteor } from 'meteor/meteor';
import './Itinerary.js';

Meteor.startup(() => {
    var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });


  //Create Rou:te for User Collection
  Api.addCollection(Meteor.users, {
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
       var query=Itinerary.findOne({_id:this.urlParams.id});//Itinerary.findOne(this.urlParams.id);

       if(query){
         return query;
       }else{
         return {'status':'not find'};
       }
    },
    delete: {
      action: function () {
        if (Itinerary.remove(this.urlParams.id)) {
          return {status: 'success', data: {message: 'Itineray delete'}};
        }
        return {
          statusCode: 404,
          body: {status: 'fail', message: 'User not add to the bdd'}
        };
      }
    }
  });

  Api.addRoute('itinerary',{authRequired:true},{
    post:{
      action:function(){

        userId=this.request.headers['x-user-id'];
        token=this.request.headers['x-auth-token'];

        response={
          'status':404,
          'message':'Itinerary not add'
        };

        //response= Itinerary.insert(this.bodyParams);
        user=Meteor.users.findOne({_id:"wQcAHTHpHBiXnPQ4T"});

        console.log(user);

        var add=Itinerary.insert({
          'title':this.bodyParams.title,
          'distance':this.bodyParams.distance,
          'creator':userId

        });

        if(add){
          response={
            'status':200,
            'message': 'Itinerary add',
            '_id':add
          };
        }

        return response;

      }
    }
  });
});
