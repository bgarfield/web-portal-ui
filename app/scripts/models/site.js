define(['backbone'], function(Backbone) {  
    var SiteModel = Backbone.Model.extend({      
    url: 'site',

    initialize: function() {
    },

    defaults: {
      'siteId': '',
      'name': '',
      'title': '',
      'description': '',
      'plans': [],
      'domain': '',
      'launchDate': '',
      'globalContentSite': false,
      'updateRequired': true,
      'businessPriority': 'Level A (Critical)',
      'testingEffort': 'Small (1-3 Days)',
      'layout': '',
      'logoUrl': 'https://financialadvisordirect.com/divinvest.ws.catalogmanagement.V_2.0/CatalogViewServlet?_x=Dyr1mr8D-4Sb2R692_ef-9cSEMABkJuw3KPhF8vMtYg.&_d=lDHb2fElVTK_1NE0RcG9ew..'
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
        return response;
    }
  });
  return SiteModel;
});
