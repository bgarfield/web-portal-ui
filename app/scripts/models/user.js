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
    		// TODO: do a DELETE to invalidate the ticket.
    		me.clear('ticket');
    		me.set('auth', false);
            sessionStorage.removeItem('alf_ticket');
            sessionStorage.removeItem('alf_username');
    	},

    	login: function(username, ticket) {
            var me = this;
    		me.set('username', username);
    		me.set('ticket', ticket);
    		me.set('auth', true);
            sessionStorage.setItem("alf_ticket", ticket);
            sessionStorage.setItem("alf_username", username);
            console.log("User logged in as "+username);
    	},

    	isLoggedIn: function() {
    		return this.get('auth');
    	}
    });

    return UserModel;
});
