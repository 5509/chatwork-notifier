(function() {

  var Model = CWNotifier.namespace('Model');

  Model.MyStatus = Backbone.Model.extend({
    url: CWNotifier.config.endpoint + '/my/status',
    initialize: function () {
      this._eventify();
    },
    _eventify:  function () {
      this.on('sync', function () {
        var mention_num = this.get('mention_num');
        if (mention_num && 0 < mention_num) {
          chrome.browserAction.setBadgeText({text: '' + mention_num});
        }
      });
    }
  });

}());