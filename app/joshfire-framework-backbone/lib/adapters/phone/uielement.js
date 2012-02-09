define(["joshlib!adapters/none/uielement","joshlib!vendor/iscroll","joshlib!vendor/underscore","joshlib!utils/dollar"], function(UIElement,iScroll,_,$) {

  var UIElementPhone = UIElement.extend({

    initialize:function(options) {
      if (this.options.scroller) {
        $(this.el).css({overflow:"hidden"});
      }
      UIElement.prototype.initialize.call(this, options);
    },

    enhance:function() {
      var self = this;
      if (this.options.scroller) {
        if (!this.hasScroller) {
          setTimeout(function() {self.insertScroller();},10);
        } else {
          setTimeout(function() {self.iScroller.refresh();},10);
        }

        // Resize on image load
        var $imgs = self.$('img');

        if($imgs.length) {
          self.$('img').bind('load', function() {
            setTimeout(function() {self.iScroller.refresh();},10);
          });
        }
      }
      UIElement.prototype.enhance.call(this);
    },

    insertScroller: function() {
      var self = this;

      this.hasScroller = true;
      var scrolling = false;

      //if (self.scrollOptions.active) {  && self.data && self.data.length && self.htmlEl.children.length
      if (self.iScroller) self.iScroller.destroy();
      self.iScroller = new iScroll(self.$(self.el).get(0), _.extend({
        useTransition:true,
        /*
          onTouchEnd:function(evt,wasScrolling) {
            if (wasScrolling) {
              evt.preventDefault();
              return false;
          }
        }*/
        /*onScrollMove: function(e) {
          if(scrolling) return;console.log('start')
          self.$('a').bind('click.iscrollprevent', function(e){ e.preventDefault();});
          scrolling = true;
        },
        onScrollEnd : function(){
          if(!scrolling) return;console.log('end')
          self.$('a').unbind('click.iscrollprevent');
          scrolling = false;
        }*/
      },self.options.scrollOptions||{}));

      // until https://github.com/cubiq/iscroll/issues/90
      document.addEventListener("orientationChanged", function(e) {
        if (self.iScroller) self.iScroller.refresh();
      });
    }
    /*

    insertScroller:function() {
      var self = this;

      self.$(self.el).addClass("container").css({"overflow":"hidden"});
      self.$(self.el).children().first().addClass("scrollable vertical");
    }
    */
  });

  return UIElementPhone;

});