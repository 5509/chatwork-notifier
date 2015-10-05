(function() {

  var Model = CWNotifier.namespace('Model');
  var Collection = CWNotifier.namespace('Collection');

  Collection.Messages = Backbone.Collection.extend({
    model: Model.Message,
    url: function () {
      var that = this;
      // force=1はテスト用で毎回全て取得する、force=0にしておいて常に差分しか取らないようにする
      return CWNotifier.config.endpoint + '/rooms/' + that.room_id + '/messages?force=1'
    },
    initialize: function (arr, options) {
      var that = this;

      that.me = CWNotifier.config.me;
      that.room_id = options.room_id;
      that._eventify();
    },
    _eventify: function() {
      var that = this;

      that.on('sync', function() {
        that._findLatestMention();
      });
    },
    _findLatestMention: function() {
      var that = this;
      var myId = that.me.get('account_id');
      var message = undefined;
      var body = undefined;

      console.log('_findLatestMention', myId);
      for ( var i = 0; i < that.length; i++ ) {
        message = that.models[that.length - (1 + i)];
        body = message.get('body');

        console.log(body);

        if ( new RegExp("[To:" + myId + "]").test(body) ) {
          Backbone.trigger('found:mention', {
            message: message,
            room_id: that.room_id
          });
          break;
        }
      }
    }
  });

}());