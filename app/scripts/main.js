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
    'jquery-ui': {
      deps: ['jquery'],
      exports: 'jQuery.dialog'
    },
    twitter: {
      deps: ['jquery'],
      exports: 'twitter'
    },
    'backbone.paginator': {
      deps: ['backbone', 'underscore', 'jquery'],
      exports: 'Backbone.Paginator'
    },
    backboneElasticsearchStorage: {
      deps: ['backbone', 'elasticsearch.jquery'],
      exports: 'Backbone.es'
    },
    templates: {
      exports: 'JST'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    'jquery-ui': '../bower_components/jquery-ui/ui/jquery-ui',
    twitter: '../bower_components/twitter/dist/js/bootstrap',
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
    'backbone-logger': '../bower_components/backbone-logger/backbone-logger',
    'backbone.paginator': '../bower_components/backbone.paginator/dist/backbone.paginator',
    'elasticsearch.jquery': '../bower_components/elasticsearch/elasticsearch.jquery', 
    backboneElasticsearchStorage: 'sync/elasticsearch-sync',
    text: '../bower_components/requirejs-text/text',
    templates: '../scripts/templates'
  }
});

require([
  'backbone',
  'views/siteListPagingView',
  'views/Login',
  'views/CreateSite',
  'routers/router',
  'models/site',
  'models/user',
  'collections/sites',
  'templates',
  'backbone-logger',
  'jquery-ui',
  'twitter'
], function (Backbone, SiteListPagingView, LoginView, CreateSiteView, AppRouter, SiteModel, UserModel, SitesCollection, templates, logger, jqueryUi, twitter) {
  /*jshint nonew:false*/

  var webPortalUi = {
      Models: {},
      Collections: {},
      Views: {},
      Routers: {},
      session: null,
      init: function () {
          'use strict';
          console.log('webPortalUI.init()');
          this.Models.SiteModel = SiteModel;
          this.session = new UserModel();

          this.Views.loginView = new LoginView();
          this.Views.createSiteView = new CreateSiteView();

          // Backbone.emulateHTTP = true;

          // webPortalUi.Collections.sitesPagingCollection = new webPortalUi.Collections.SitesPagingCollection([
          //   new webPortalUi.Models.SiteModel({name:'site 1'}),
          //   new webPortalUi.Models.SiteModel({name:'site 2'}),
          //   new webPortalUi.Models.SiteModel({name:'site 3'})]);
          // Backbone.Log.log("Collection size: " + webPortalUi.Collections.sitesPagingCollection.length);

          // create the main collection of sites. It will load an initial set of records automatically
          this.Collections.sitesCollection = new SitesCollection();
          Backbone.Log.log("Collection size: " + webPortalUi.Collections.sitesCollection.length);

          webPortalUi.Views.pagedSiteListView = new SiteListPagingView({
            el: $('#site-list'), 
            collection: webPortalUi.Collections.sitesCollection
          });

          var appRouter = new AppRouter();
          this.Routers.appRouter = appRouter;

          $('#createSite').click(function() {
            window.location.replace('/#create');  
          });

          if (this.session.isLoggedIn()) {
            appRouter.listSites();
          } else {
            appRouter.login();
          }

          $.ajaxSetup({
              statusCode: {
                  401: function(){
                      // Redirect the to the login page.
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

  window.webPortalUi = webPortalUi;
  window.webPortalUi.init();
  return webPortalUi;
});

// 
// $(function(){
//     'use strict';
//     webPortalUi.init();
// });
