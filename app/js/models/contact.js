ContactManager.Models.Contact = Backbone.Model.extend({
  defaults: {
    name: null,
    tel: null,
    email: null,
    avatar: null
  },

  urlRoot: 'https://638730dee399d2e473f768f2.mockapi.io/api/contacts',

  validate(attrs) {
      if (!attrs.name) {
        return 'Name must not be empty!'
      }
       
  },

  // initialize: function() {
  //   this.set('avatar', _.random(1, 15) + '.jpg');
  // }
});
