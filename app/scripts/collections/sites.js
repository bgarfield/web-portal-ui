define(['backbone', 'models/site', 'BackboneStoreAPI'], function(Backbone, SiteModel, BackboneStorageAPI) {  
    'use strict';
    var SitesCollection = Backbone.Collection.extend({

        model: SiteModel,
        url: 'site',
        
        initialize: function() {
          Backbone.store.loadAll(this, {'size': 100});
        },

        comparator: function(item) {
        	return item.get('name').toLowerCase();
    	}
    });

    return SitesCollection;
});
