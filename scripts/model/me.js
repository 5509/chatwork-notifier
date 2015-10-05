(function() {

  var Model = CWNotifier.namespace('Model');

  Model.Me = Backbone.Model.extend({
    url:        CWNotifier.config.endpoint + '/me',
    initialize: function () {
      console.log('hoge');
    }
  });

}());