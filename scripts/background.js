(function() {

  if ( !CWNotifier.config.apiKey ) {
    return console.warn('APIキーを設定してください');
  }

  var Model = CWNotifier.namespace('Model');
  var Collection = CWNotifier.namespace('Collection');
  var View = CWNotifier.namespace('View');
  var Controller = CWNotifier.namespace('Controller');
  var config = CWNotifier.config;

  var me = new Model.Me();
  me.fetch({beforeSend: config.setHeader});

  var myStatus = new Model.MyStatus();
  myStatus.fetch({beforeSend: config.setHeader});

  var rooms = new Collection.Rooms();
  rooms.fetch({beforeSend: config.setHeader}).then(function () {
    rooms.find(function (model) {
      return model.get('name') === 'nori';
    }).fetchMessages();
  });

}());