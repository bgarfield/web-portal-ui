/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({
        defaults: {
        	'usernamne': '',
        	'ticket': '',
        	'auth': false
        },

        initialize: function() {
    		console.log("initializing session");
    		var storedTicket = sessionStorage.getItem('alf_ticket');
    		var storedUser = sessionStorage.getItem('alf_username');
    		if (storedTicket != null && storedUser != null) {
    			this.login(storedUser, storedTicket);
    		}
    	},

    	logout: function( options ) {
    		var me = this;
    		options = options || {};
    		me.clear('ticket');
    		me.set('auth', false);
            // TODO: do DELETE call to invalidate ticket.
            sessionStorage.removeItem('alf_ticket');
            sessionStorage.removeItem('alf_username');
    	},

    	login: function(username, password) {
            var me = this;
            var authToken = this._buildAuth(username, password);
            var ticket = "dummy-ticket";
    		me.set('username', username);
    		me.set('ticket', ticket);
    		me.set('auth', true);
            /*
            $.ajax({
                url:url,
                type:'POST',
                dataType:"json",
                data: formValues,
                success:function (data) {
                    console.log(["Login request details: ", data]);

                    if(data.error) {  // If there is an error, show the error messages
                        $('.alert-error').text(data.error.text).show();
                    }
                    else { // If not, send them back to the home page
                        window.location.replace('#');
                    }
                }
            });
            */
            sessionStorage.setItem("alf_ticket", ticket);
            sessionStorage.setItem("alf_username", username);
            console.log("User logged in as "+username);
    	},

    	isLoggedIn: function() {
    		return this.get('auth');
    	},

        _buildAuth: function(user, password) {
            var token;
            token = user + ':' + password;
            return this._encode64(token);
        },

        // Adapted from Tyler Akins:
        // This code was written by Tyler Akins and has been placed in the
        // public domain.  It would be nice if you left this header intact.
        // Base64 code from Tyler Akins -- http://rumkin.com
        _encode64: function(input) {
            var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            while (i < input.length) {
              chr1 = input.charCodeAt(i++);
              chr2 = input.charCodeAt(i++);
              chr3 = input.charCodeAt(i++);

              enc1 = chr1 >> 2;
              enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
              enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
              enc4 = chr3 & 63;

              if (isNaN(chr2)) {
                enc3 = enc4 = 64;
              } else if (isNaN(chr3)) {
                enc4 = 64;
              }

              output += keyStr.charAt(enc1);
              output += keyStr.charAt(enc2);
              output += keyStr.charAt(enc3);
              output += keyStr.charAt(enc4);
            }

            return output;
        },
    });

    return UserModel;
});
