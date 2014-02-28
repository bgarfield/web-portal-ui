define(['backbone', 'collections/sitesPagingCollection', 'jquery', 'jquery-ui'], function(Backbone, sitesPagingCollection) {
    'use strict';

    var LoginView = Backbone.View.extend({
        
        template: JST['app/scripts/templates/Login.ejs'],
        el: $('#login-dialog'),
        
        initialize: function () {
            console.log('Initializing Login View');
            this.render();
            var me = this;
             $( "#login-dialog" ).dialog({
                autoOpen: false,
                height: 330,
                width: 350,
                modal: true,
                buttons: {
                    "Sign in": function() {
                        var bValid = document.getElementById("login-form").checkValidity();
                        
                        if ( bValid ) {
                            $(".alert-error").hide();
                            me.login();
                        } else {
                            $(".alert-error").show();
                        }
                    },
                    //Cancel: function() {
                    //    me.hide();
                    //},
                    close: function() {
                        me.hide();
                    }
                }
            });
        },

        //events: {
        //    "click #loginButton": "login"
        //},

        render: function () {
            $(this.el).html(this.template());
            return this;
        },

        show: function() {
            $( "#login-dialog" ).dialog("open");
        },

        hide: function() {
            $( "#login-dialog" ).dialog("close");
        },

        login: function () {
            $('.alert-error').hide(); // Hide any errors on a new submit
            console.log('Logging in... ');
            var session = window.webPortalUi.session;
            session.login($('#inputUsername').val(), $('#inputPassword').val());
            this.hide();
            
        }
    });

    return LoginView;
});
