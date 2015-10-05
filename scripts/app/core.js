/**
 * @name core.js
 */

(function() {

var CWNotifier;

// use namespace `CodeGrid`
if ( !('CWNotifier' in window) ) {
  CWNotifier = window.CWNotifier = {};
}

// version
CWNotifier.version = '1.0.0';
CWNotifier.config = {
  endpoint: 'https://api.chatwork.com/v1',
  apiKey: (function() {
    var apiKey = localStorage.getItem('cw_notifier_api_key');
    if ( !apiKey ) {
      return false;
    }
    return apiKey;
  }()),
  // global setRequestHeader func
  setHeader: function (xhr) {
    xhr.setRequestHeader('X-ChatWorkToken', CWNotifier.config.apiKey);
  }
};

// override Backbone.sync to use the beforeSend
var sync = Backbone.sync;
Backbone.sync = function(method, model, options) {
  options.beforeSend = CWNotifier.config.setHeader;
  return sync(method, model, options);
};

/*
 * Define namespace under CWNotifier
 *
 * Examples:
 *   var Utils = CWNotifier.namespace('Utils');
 *   Utils.foo = 'bar';
 *   console.log(CWNotifier.Utils.foo); //=> bar
 *
 *   var Bar = CWNotifier.namespace('Foo.Bar');
 *   Bar.baz = 'val';
 *   console.log(CWNotifier.Foo.Bar.baz); //=> val
 *
 *   CWNotifier.namespace('Foo.Bar');
 *   CWNotifier.Foo.Bar.baz = 'val';
 *   console.log(CWNotifier.Foo.Bar.baz); //=> val
 *
 * @params {String}
 * @return {Object}
 *
 */
CWNotifier.namespace = function(ns, base) {
  var parent = base || CWNotifier;
  ns.split('.').forEach(function(part) {
    if (typeof parent[part] === 'undefined') {
      parent[part] = {};
    }
    parent = parent[part];
  });

  return parent;
};

})();
