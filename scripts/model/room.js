(function() {

  var Model = CWNotifier.namespace('Model');
  var Collection = CWNotifier.namespace('Collection');
  var config = CWNotifier.config;

  Model.Room = Backbone.Model.extend({
    idAttribute:   'room_id',
    fetchMessages: function(options) {
      var that = this;

      // unread_numかmention_numが0の場合は通知が不要なのでmessagesも不要
      if ( that.get('unread_num') < 1 || that.get('mention_num') < 1 ) {
        return;
      }
      if ( that.get('name') !== 'nori' ) {
        return;
      }
      this.messages = new Collection.Messages([], {
        room_id: this.id
      });
      return this.messages.fetch();
    }
  });

}());