window.ContactManager = {
  Models: {},
  Collections: {},
  Views: {},

  start(data) {
    // var contacts = new ContactManager.Collections.Contacts(data.contacts),
    var contacts = new ContactManager.Collections.Contacts()
    var router = new ContactManager.Router();


    contacts.fetch()
      .then(() => {
        console.log("contacts", contacts)
        router.on('route:home', function () {
          router.navigate('contacts', {
            trigger: true,
            replace: true
          });
        });

        router.on('route:showContacts', function () {
          var contactsView = new ContactManager.Views.Contacts({
            collection: contacts
          });

          $('.main-container').html(contactsView.render().$el);
        });

        router.on('route:newContact', function () {
          var newContact = new ContactManager.Models.Contact()
          var newContactForm = new ContactManager.Views.ContactForm({
            model: newContact
          });

          newContactForm.on('form:submitted', function (attrs) {
            attrs.id = contacts.isEmpty() ? 1 : (_.max(contacts.pluck('id')) + 1);
            newContact.save({}, {
              success() {
                contacts.add(newContact);
                router.navigate('contacts', true);
              },
              error() {
                console.error('Error add')
              }
            })
          });

          $('.main-container').html(newContactForm.render().$el);
        });

        router.on('route:editContact', function (id) {

          var editContactModel = contacts.get(id),
            editContactForm;

          editContactModel.fetch({
            success() {
              if (editContactModel) {
                editContactForm = new ContactManager.Views.ContactForm({
                  model: editContactModel
                });

                editContactForm.on('form:submitted', function (attrs) {
                  editContactModel.save({}, {
                    success() {
                      console.log("editContactModel", editContactModel)
                      router.navigate('contacts', true);
                    },
                    error() {
                      console.error('Error edit')
                    }
                  })
                  // contact.set(attrs);
                  // router.navigate('contacts', true);
                });

                $('.main-container').html(editContactForm.render().$el);
              } else {
                router.navigate('contacts', true);
              }
            }
          })
        });

        Backbone.history.start();
      })
  }
};
