define(['backbone'], function(Backbone) {  
    var SiteModel = Backbone.Model.extend({      
    url: 'site',

    initialize: function() {
    },

    defaults: {
      'siteId': '',
      'siteName': '',
      'domain': '',
      'logoUrl': 'https://financialadvisordirect.com/divinvest.ws.catalogmanagement.V_2.0/CatalogViewServlet?_x=Dyr1mr8D-4Sb2R692_ef-9cSEMABkJuw3KPhF8vMtYg.&_d=lDHb2fElVTK_1NE0RcG9ew..',
      'metadata': {},
      'homepage_carousel': {}
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
        return response;
    }
  });
  return SiteModel;
});
