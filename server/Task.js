
Tasks= new Meteor.Collection('Tasks');
TasksSchema=new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  distance: {
    type: Number,
    label: "Distance"
  },
  userId: {
    type: String, regEx: SimpleSchema.RegEx.Id, optional: true
  }

});

Tasks.attachSchema(TasksSchema);
