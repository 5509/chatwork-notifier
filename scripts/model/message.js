(function() {

  var Model = CWNotifier.namespace('Model');

  Model.Message = Backbone.Model.extend({
    idAttribute: 'message_id'
  });

}());