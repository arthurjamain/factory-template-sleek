define(["joshlib!uielement","joshlib!utils/dollar","joshlib!vendor/underscore"], function(UIElement,$,_) {

  var UIText = UIElement.extend({

    initialize: function(options) {
      if (options.templateEl) {
        this.template = this.compileTemplate($(options.templateEl).html());
      }

      this.setTextContent(options.textContent);

      UIElement.prototype.initialize.call(this, options);
    },

    setTextContent: function(content, render) {
      this.textContent = content;

      if(render) this.render();
    },

    generate: function(cb) {
      var context = {
        textContent:  this.textContent
      }

      _.extend(context, this.data);

      cb(null, this.template(context));
    },

    setContent: function(html) {
      this.$('> div')[0].innerHTML = html;
    }
  });

  return UIText;
});