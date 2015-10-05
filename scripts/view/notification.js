(function() {

  var View = CWNotifier.namespace('View');

  View.Notification = Backbone.View.extend({
    tag: 'div',
    className: 'notification',
    events: {
      'click': 'openLink'
    },
    initialize: function() {
      var that = this;
      that._eventify();
    },
    _eventify: function() {
      var that = this;
      Backbone.on('found:mention', function(obj) {
        console.log('found:mention', obj);
        console.log(obj.message.get('account').avatar_image_url);
        var message = obj.message;
        chrome.notifications.create('CWNotifier' + Date.now(), {
          type: 'basic',
          title: '新着メッセージがあります',
          message: message.get('body'),
          iconUrl: message.get('account').avatar_image_url
        });
        chrome.notifications.onButtonClicked.addListener(function() {
          window.open('https://www.chatwork.com/#rid' + obj.room_id + '-' + obj.message.get('id'))
        });
      });
    }
  });

}());