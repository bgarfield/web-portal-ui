define(['backbone', 'models/site', 'backboneElasticsearchStorage'], function(Backbone, SiteModel, backboneElasticsearchStorage) {  
    'use strict';
    var SitesCollection = Backbone.Collection.extend({

        model: SiteModel,
        url: 'site',
        
        initialize: function() {
          Backbone.es.loadAll(this);
        },

        comparator: function(item) {
        	return item.get('name').toLowerCase();
    	}
    });

    return SitesCollection;
});
