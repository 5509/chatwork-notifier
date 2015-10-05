(function() {

  var Model = CWNotifier.namespace('Model');

  Model.Contact = Backbone.Model.extend({
    idAttribute: 'account_id'
  });

}());