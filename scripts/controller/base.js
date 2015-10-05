(function() {

  var Controller = CWNotifier.namespace('Controller');

  var Base = Controller.Base = function() {
    return this.initialize();
  };

  _.extend(Base.prototype, Backbone.Events, {
    initialize: function() {}
  });

  // from Backbone
  var ctor = function(){};
  var inherits = function(parent, protoProps, staticProps) {
    var child;
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ parent.apply(this, arguments); };
    }

    _.extend(child, parent);
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    if (protoProps) _.extend(child.prototype, protoProps);
    if (staticProps) _.extend(child, staticProps);

    child.prototype.constructor = child;
    child.__super__ = parent.prototype;
    return child;
  };

  var extend = function (protoProps, classProps) {
    var child = inherits(this, protoProps, classProps);
    child.extend = this.extend;
    return child;
  };

  Base.extend = extend;

}());