define(['backbone', 'collections/sitesPagingCollection'], function(Backbone, sitesPagingCollection) {
    'use strict';

    var SiteListPagingView = Backbone.View.extend({

        template: JST['app/scripts/templates/siteListPagingView.ejs'],
        collection: sitesPagingCollection,
        
        render:function () {
            $(this.el).html(this.template());
            return this;
        },

        initialize: function() {
          this.$input = this.$('#new-todo');
          this.$footer = this.$('#footer');
          this.$main = this.$('#main');

          this.listenTo( this.collection, 'add', this.render );
        },

        FILTER_TYPE__FAVORITE: 'favorite',
        FILTER_TYPE__RECENT: 'recent',
        applyFilter: function(filters) {
        },
        
        addOne: function( todo ) {
          var view = new app.TodoView({ model: todo });
          $('#siteList').append( view.render().el );
        },

        addAll: function() {
          this.$('#siteList').html('');
          webPortalUi.Collections.sitesCollection.each(this.addOne, this);
        }
        
    });
    
    return SiteListPagingView;
});
