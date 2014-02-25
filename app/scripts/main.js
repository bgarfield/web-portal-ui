/*global require*/
'use strict';

require.config({
  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    'backbone.paginator': {
      deps: ['backbone', 'underscore', 'jquery'],
      exports: 'Backbone.Paginator'
    },
    backboneElasticsearchStorage: {
      deps: ['backbone', 'elasticsearch.jquery'],
      exports: 'Store'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
    'backbone.paginator': '../bower_components/backbone.paginator/dist/backbone.paginator',
    backboneElasticsearchStorage: 'sync/elasticsearch-sync',
    text: '../bower_components/requirejs-text/text'
  }
});

require([
  'backbone',
  'views/siteListPagingView',
  'routers/router',
  'models/site',
  'collections/sites'
], function (Backbone, AppView, Workspace) {
  /*jshint nonew:false*/

  window.webPortalUi = {
      Models: {},
      Collections: {},
      Views: {},
      Routers: {},
      init: function () {
          'use strict';
          console.log('webPortalUI.init()');

          // Backbone.emulateHTTP = true;

          // webPortalUi.Collections.sitesPagingCollection = new webPortalUi.Collections.SitesPagingCollection([
          //   new webPortalUi.Models.SiteModel({name:'site 1'}),
          //   new webPortalUi.Models.SiteModel({name:'site 2'}),
          //   new webPortalUi.Models.SiteModel({name:'site 3'})]);
          // Backbone.Log.log("Collection size: " + webPortalUi.Collections.sitesPagingCollection.length);

          // create the main collection of sites. It will load an initial set of records automatically
          webPortalUi.Collections.sitesCollection = new webPortalUi.Collections.SitesCollection();
          Backbone.Log.log("Collection size: " + webPortalUi.Collections.sitesCollection.length);

          webPortalUi.Views.pagedSiteListView = new webPortalUi.Views.SiteListPagingView({
            el: $('#siteList'), 
            collection: webPortalUi.Collections.sitesCollection
          });

          webPortalUi.Routers.appRouter = new webPortalUi.Routers.AppRouter();
          Backbone.history.start();

          $.ajaxSetup({
              statusCode: {
                  401: function(){
                      // Redirec the to the login page.
                      window.location.replace('/#login');

                  },
                  403: function() {
                      // 403 -- Access denied
                      window.location.replace('/#denied');
                  }
              }
          });        
      }
  };

  return window.webPortalUi;
});

// 
// $(function(){
//     'use strict';
//     webPortalUi.init();
// });
