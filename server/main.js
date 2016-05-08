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
      roleRequired: ['id', 'name'],
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
        let response="YESSS";
        Itinerary.insert(this.bodyParams, function(err, result){
          if(err)
          response= {
                    statusCode: 401,
                    body: {status: 'error', message: 'Erreur '}
                };

          response= JSON.stringify(result);


        });

        return response;

      }
    }
  });
});
