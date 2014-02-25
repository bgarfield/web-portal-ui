define(['backbone', 'models/site'], function(Backbone, SiteModel) {  
    'use strict';
    var SitesCollection = Backbone.Collection.extend({

        model: SiteModel,
        url: 'site',
        
        initialize: function() {
          Backbone.es.loadAll(this);
        }
    });

    return SitesCollection;
});
