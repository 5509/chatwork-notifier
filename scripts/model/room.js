(function() {

  var Model = CWNotifier.namespace('Model');
  var Collection = CWNotifier.namespace('Collection');
  var config = CWNotifier.config;

  Model.Room = Backbone.Model.extend({
    idAttribute:   'room_id',
    fetchMessages: function (options) {
      this.messages = new Collection.Messages([], {
        room_id: this.id
      });
      this.messages.fetch({beforeSend: config.setHeader});
    }
  });

}());