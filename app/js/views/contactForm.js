ContactManager.Views.ContactForm = Backbone.View.extend({
  template: _.template($('#tpl-new-contact').html()),

  events: {
    'submit .contact-form': 'onFormSubmit'
  },

  render: function () {
    var html = this.template(_.extend(this.model.toJSON(), {
      isNew: this.model.isNew()
    }));
    this.$el.append(html);
    return this;
  },

  onFormSubmit: function (e) {
    e.preventDefault();
    const a = {
      name: this.$('.contact-name-input').val(),
      tel: this.$('.contact-tel-input').val(),
      email: this.$('.contact-email-input').val(),
      avatar: this.$('.contact-avatar-input').val()
    }
    this.model.set(a)

    if (this.model.isValid()){
      this.trigger('form:submitted', a);

    }
    else {
      this.$('.input-name').append(_.template($('#tpl-message').html(), {
        message: this.model.validationError
      }))
    }

    // console.log(this.model.isValid()) 
    // console.log(this.model.validationError)
  }
});
