(function() {

  var apiKey = CWNotifier.config.apiKey;
  var Collection = CWNotifier.namespace('Collection');
  var View = CWNotifier.namespace('View');
  var settingArea = $('#setting_area');
  var displayArea = $('#display_area');
  var cw_notifier_rooms = localStorage.getItem('cw_notifier_rooms');

  if ( !apiKey ) {
    settingArea.show();
    displayArea.hide();
  } else {
    settingArea.hide();
    displayArea.show();
  }

  var $form = $('#api_key_set');
  $form.on('submit', function(ev) {
    ev.preventDefault();

    var api_key_val = $('#api_key').val();
    console.log(api_key_val);
    if ( api_key_val ) {
      localStorage.setItem('cw_notifier_api_key', api_key_val);
    }
  });

  window.addEventListener('load', function() {
    renderDisplay();
  }, false);

  function renderDisplay() {
    var rooms = undefined;
    if ( !cw_notifier_rooms ) {
      displayArea.html('<p>表示できるルームがありません</p>');
      return;
    }

    cw_notifier_rooms = JSON.parse(cw_notifier_rooms);

    roomsData = new Collection.Rooms(cw_notifier_rooms);
    roomsView = new View.Rooms(roomsData);

    displayArea.html(roomsView.$el);
  }

}());