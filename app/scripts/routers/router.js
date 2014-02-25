define(['backbone'], function(Backbone) {  
    'use strict';

    var AppRouter = Backbone.Router.extend({
      routes: {
        "site/:id" : "getSite",
        "sites": "listSites",
        "login": "login",
        "*doSomething": "doSomething",
        "": "listSites"
      },
      
      getSite: function(siteId) {
        Backbone.Log.log("You are trying to reach site " + siteId);
        this.navigate("#/site/" + siteId);
      },
      
      doSomething: function() {
        Backbone.Log.log("doSomething");
        this.navigate("#/doSomething");
      },
      
      listSites: function() {
        Backbone.Log.log("listSites");
        // webPortalUi.Views.pagedSiteListView.render();
        this.navigate("#/sites");
      },
      
      login: function() {
        $('#content').html(new LoginView().render().el);
      }
    });
    
    return AppRouter;
});
