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

      that.getBasicData();

    },
    getBasicData: function() {
      var that = this;
      var model = that.model;
      var collection = that.collection;

      model.me = new Model.Me();
      model.myStatus = new Model.MyStatus();
      collection.rooms = new Collection.Rooms();

      return $.when.apply(null, [
        model.me.fetch(),
        model.myStatus.fetch(),
        collection.rooms.fetch()
      ]);
    }
  });

  window.app = new Controller.Initializer();

}());