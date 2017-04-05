import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

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
Router.route('/pollform');

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
