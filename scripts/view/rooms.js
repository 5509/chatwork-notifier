(function() {

  var View = CWNotifier.namespace('View');

  View.Rooms = Backbone.View.extend({
    class: 'rooms',
    initialize: function(rooms) {

      console.warn('initialize view.room', rooms);

      var that = this;
      that.rooms = rooms;

      that.render();
    },
    events: {
      'click input': '_onClickRoom'
    },
    render: function() {
      var that = this;
      var checkedRoom = localStorage.getItem('cw_notifier_checked_rooms');
      var template = _.template(that.html);

      if ( checkedRoom ) {
        checkedRoom = JSON.parse(checkedRoom);
      }

      that.$el.html(
        template({
          rooms: that.rooms.models,
          checkedRoom: checkedRoom || undefined
        })
      );
    },
    html: '<ul>\
  <% _.each(rooms, function(room) { %>\
  <li>\
    <label>\
      <input type="checkbox" value="<%= room.get(\'room_id\') %>"\
       <% if ( checkedRoom && checkedRoom[room.get(\'room_id\')] ) { %> checked<% } %>\
      >\
      <%= room.get(\'name\') %>\
    </label>\
  </li>\
  <% }); %>\
</ul>',
    _onClickRoom: function(ev) {
      var that = this;
      var $input = $(ev.currentTarget);

      that._saveRoomChecked($input.val(), $input.get(0).checked);
    },
    _saveRoomChecked: function(room_id, check) {
      var checkedRoom = localStorage.getItem('cw_notifier_checked_rooms');

      if ( !checkedRoom ) {
        checkedRoom = {};
      } else {
        checkedRoom = JSON.parse(checkedRoom);
      }
      checkedRoom[room_id] = check;

      checkedRoom = JSON.stringify(checkedRoom);
      localStorage.setItem('cw_notifier_checked_rooms', checkedRoom);
    }
  });

}());