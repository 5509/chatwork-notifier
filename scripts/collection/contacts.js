(function() {

  var Model = CWNotifier.namespace('Model');
  var Collection = CWNotifier.namespace('Collection');

  Collection.Contacts = Backbone.Collection.extend({
    model: Model.Contact,
    url: CWNotifier.config.endpoint + '/contacts'
  })

}());