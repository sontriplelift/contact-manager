ContactManager.Collections.Contacts = Backbone.Collection.extend({
  model: ContactManager.Models.Contact,
  url: 'https://638730dee399d2e473f768f2.mockapi.io/api/contacts'
});
