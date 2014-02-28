define(['backbone', 'views/Login'], function(Backbone, LoginView) {  
    'use strict';

    var AppRouter = Backbone.Router.extend({
      routes: {
        "site/:id" : "editSite",
        "sites": "listSites",
        "create": "createSite",
        "login": "login",
        "logout": "logout",
        "": "listSites"
      },

      initialize: function() {
        Backbone.history.start();
      },
      
      editSite: function(siteId) {
        Backbone.Log.log("You are trying to reach site " + siteId);
        this.navigate("#/site/" + siteId);
      },
      
      listSites: function() {
        Backbone.Log.log("Router: listSites");
        // webPortalUi.Views.pagedSiteListView.render();
        this.navigate("#/sites");
      },
      
      login: function() {
        webPortalUi.Views.loginView.show();
      },

      createSite: function() {
        webPortalUi.Views.createSiteView.show();
      },

      logout: function() {
       webPortalUi.session.logout();
       window.location.replace("/");
      }
    });
    
    return AppRouter;
});
