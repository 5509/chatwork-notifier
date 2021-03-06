(function() {

  var Model = CWNotifier.namespace('Model');
  var Collection = CWNotifier.namespace('Collection');

  Collection.Rooms = Backbone.Collection.extend({
    model: Model.Room,
    url: CWNotifier.config.endpoint + '/rooms',
    initialize: function() {
      var that = this;

      that._eventify();
    },
    _eventify: function() {
      var that = this;

      // 未読件数はここで得る
      that.on('sync', function() {
        // popup用にroomsを保存
        localStorage.setItem('cw_notifier_rooms', JSON.stringify(that.toJSON()));

        // 未読件数
        var readInfo = that._getReadInfo();
        var mention = readInfo.total.mention;
        if (mention && 0 < mention) {
          chrome.browserAction.setBadgeText({ text: '' + mention });
        }

        Backbone.trigger('fetch:rooms');

        // roomのmessages取得
        that.each(function(room) {
          room.fetchMessages();
        });
      });
    },
    _getReadInfo: function() {
      var that = this;
      var obj = {
        total: {
          unread: 0,
          mention: 0
        }
      };

      that.each(function(room) {
        var unread = room.get('unread_num');
        var mention = room.get('mention_num');

        if ( !unread ) {
          return;
        }

        obj.total.unread = obj.total.unread + unread;
        obj.total.mention = obj.total.mention + mention;
      });

      return obj;
    }
  });

}());