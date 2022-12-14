ContactManager.Views.Contact = Backbone.View.extend({
  tagName: 'li',
  className: 'media col-md-12 col-lg-6',
  template: _.template($('#tpl-contact').html()),

  events: {
    'click .delete-contract': 'onClickDelete'
  },

  initialize: function() {
    this.listenTo(this.model, 'remove', this.remove);
  },

  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.append(html);
    return this;
  },

  onClickDelete: function(e) {
    e.preventDefault();
    this.model.destroy({
      success() {
        // this.model.collection.remove(this.model);
      }
    })
  }
});
