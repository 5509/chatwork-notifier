(function() {

  var Model = CWNotifier.namespace('Model');
  var Collection = CWNotifier.namespace('Collection');

  Collection.Rooms = Backbone.Collection.extend({
    model: Model.Room,
    url: CWNotifier.config.endpoint + '/rooms',
    findByUnread: function () {

    }
  });

}());