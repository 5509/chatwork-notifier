(function() {

  var Model = CWNotifier.namespace('Model');
  var Collection = CWNotifier.namespace('Collection');

  Collection.Messages = Backbone.Collection.extend({
    model: Model.Message,
    initialize: function (arr, options) {
      this.room_id = options.room_id;
    },
    url: function () {
      // force=1はテスト用で毎回全て取得する、force=0にしておいて常に差分しか取らないようにする
      return CWNotifier.config.endpoint + '/rooms/' + this.room_id + '/messages?force=1'
    }
  });

}());