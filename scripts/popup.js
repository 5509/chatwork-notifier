(function() {

  var apiKey = CWNotifier.config.apiKey;
  var settingArea = $('#setting_area');
  var displayArea = $('#display_area');

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
  })

}());