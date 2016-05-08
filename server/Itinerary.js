

Itinerary= new Meteor.Collection('Itinerary');


ItinerarySchema=new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  distance: {
    type: Number,
    label: "Distance"
  },
  creator:{
    type:String,
    regEx: SimpleSchema.RegEx.Id,
  }
});

Itinerary.attachSchema(ItinerarySchema);
