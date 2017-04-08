import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './components/poll.html';

// import './main.html';
Router.route('/', function () {
// render the Home template with a custom data context
this.render('home', {data: {title: 'My Title'}});
});
// when you navigate to "/one" automatically render the template named "One".
Router.route('/home');
// when you navigate to "/two" automatically render the template named "Two".
Router.route('/profile');
Router.route('/poll');
Router.route('/messages');
Router.route('/about');
Router.route('/pulley');
Router.route('/pollForm');
Router.route('/pollcontainer');
Router.route('/poll1');
Router.route('/createpoll');
Router.route('/testing');

//MESSAGES JS
chatStream = new Meteor.Stream('chat');
chatCollection = new Meteor.Collection(null);

chatStream.on('chat', function(message, username) {
  chatCollection.insert({
    username: username,
    subscriptionId: this.subscriptionId,
    message: message
  });
});

Template.chatBox.helpers({
  "messages": function() {
    return chatCollection.find();
  }
});


var subscribedUsers = {};

Template.chatMessage.helpers({
  "user": function() {
    return (this.username)? this.username: this.subscriptionId;
  }
});

Template.chatBox.events({
  "click #send": function() {
    var message = $('#chat-message').val();
    chatCollection.insert({
      username: 'me',
      message: message
    });
    chatStream.emit('chat', message);
     $('#chat-message').val('');
  }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});


// Template.pollForm.events({
//
//   // handle the form submission
//   'submit form': function(event) {
//
//     // stop the form from submitting
//     // event.preventDefault();
//
//     // get the data we need from the form
//     var newPoll = {
//       question: event.target.question.value,
//       choices: [
//         {  text: event.target.choice1.value, votes: 0 },
//         {  text: event.target.choice2.value, votes: 0 },
//         {  text: event.target.choice3.value, votes: 0 }
//       ]
//     };
//
//     // create the new poll
//     Polls.insert(newPoll);
//   }
//
// });
//
// // attach events to our poll template
// Template.poll.events({
//
//   // event to handle clicking a choice
//   'click .vote': function(event) {
//
//     // prevent the default behavior
//     event.preventDefault();
//
//     // get the parent (poll) id
//     var pollID = $(event.currentTarget).parent('.poll').data('id');
//     var voteID = $(event.currentTarget).data('id');
//
//     // create the incrementing object so we can add to the corresponding vote
//     var voteString = 'choices.' + voteID + '.votes';
//     var action = {};
//     action[voteString] = 1;
//
//     // increment the number of votes for this choice
//     Polls.update(
//       { _id: pollID },
//       { $inc: action }
//     );
//
//   }
//
// });
//
// Template.createpoll.helpers({
//
//   polls: function() {
//     return Polls.find();
//   }
//
// });
//
// UI.registerHelper('indexedArray', function(context, options) {
//   if (context) {
//     return context.map(function(item, index) {
//       item._index = index;
//       return item;
//     });
//   }
// });

///POLLS JS
// Template.pollcontainer.helpers({
//
//   polls: function() {
//     return Polls.find();
//   }
//
// });
//
// UI.registerHelper('indexedArray', function(context, options) {
//   if (context) {
//     return context.map(function(item, index) {
//       item._index = index;
//       return item;
//     });
//   }
// });
//
// Template.pollForm.events({
//
//   // handle the form submission
//   'submit form': function(event) {
//
//     // stop the form from submitting
//     event.preventDefault();
//
//     // get the data we need from the form
//     var newPoll = {
//       question: event.target.question.value,
//       choices: [
//         {  text: event.target.choice1.value, votes: 0 },
//         {  text: event.target.choice2.value, votes: 0 },
//         {  text: event.target.choice3.value, votes: 0 }
//       ]
//     };
//
//     // create the new poll
//     Polls.insert(newPoll);
//   }
//
// });
//
// // attach events to our poll template
// Template.poll.events({
//
//   // event to handle clicking a choice
//   'click .vote': function(event) {
//
//     // prevent the default behavior
//     event.preventDefault();
//
//     // get the parent (poll) id
//     var pollID = $(event.currentTarget).parent('.poll').data('id');
//     var voteID = $(event.currentTarget).data('id');
//
//     // create the incrementing object so we can add to the corresponding vote
//     var voteString = 'choices.' + voteID + '.votes';
//     var action = {};
//     action[voteString] = 1;
//
//     // increment the number of votes for this choice
//     Polls.update(
//       { _id: pollID },
//       { $inc: action }
//     );
//
//   }
//
// });
