Template.testing.helpers({

  polls: function() {
    return Polls.find().fetch().reverse();
  }


});

Template.displayfeed.helpers({

  polls: function() {
    return Polls.find().fetch().reverse();
  }
});

UI.registerHelper('indexedArray', function(context, options) {
  if (context) {
    return context.map(function(item, index) {
      item._index = index;
      return item;
    });
  }
});
