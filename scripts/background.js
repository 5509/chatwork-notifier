(function() {

  'use strict';

  if ( !CWNotifier.config.apiKey ) {
    return console.warn('APIキーを設定してください');
  }

  var Model = CWNotifier.namespace('Model');
  var Collection = CWNotifier.namespace('Collection');
  var View = CWNotifier.namespace('View');
  var Controller = CWNotifier.namespace('Controller');

  Controller.Initializer = CWNotifier.Controller.Base.extend({
    initialize: function() {
      var that = this;

      that.model = {};
      that.collection = {};
      that.view = {};

      that._eventify();
      that.getBasicData();
      that.getDataInterval();
    },
    _eventify: function() {
      var that = this;

      Backbone.on('found:mention', that._showNotification);
    },
    getBasicData: function() {
      var that = this;
      var model = that.model;
      var collection = that.collection;

      model.me = new Model.Me();
      CWNotifier.config.me = model.me;

      collection.contacts = new Collection.Contacts();
      collection.rooms = new Collection.Rooms();
      CWNotifier.config.contacts = collection.contacts;

      return $.when.apply(null, [
        model.me.fetch(),
        collection.contacts.fetch(),
        collection.rooms.fetch()
      ]);
    },
    getDataInterval: function() {
      var that = this;
      var collection = that.collection;

      that.timer = setInterval(function() {
        collection.rooms.fetch();
      // configで決められたほうがよさそう
      }, 30000);
    },
    _showNotification: function(obj) {
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
    }
  });

  window.app = new Controller.Initializer();

}());