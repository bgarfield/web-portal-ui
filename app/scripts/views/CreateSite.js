/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var CreateSiteView = Backbone.View.extend({
        template: JST['app/scripts/templates/CreateSite.ejs'],
        el: $('#createsite-dialog'),

        events: {
        	'click #createSiteSubmit': 'createSite'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            $(this.el).html(this.template());
            $('#createsite-dialog').modal({
			  show: false,
			  backdrop: 'static'
			})

            return this;
        },

        show: function() {
        	$('#createsite-dialog').modal('show');
        },

        validate: function() {
        	var formEl = document.getElementById('createSiteForm');
        	var valid = true;
        	if (formEl && formEl.checkValidity !== undefined) {

        		for (var index = 0; index < formEl.elements.length; index ++) {
        			var formField = formEl.elements[index];
        			if (formField.checkValidity() == false) {
        				valid = false;
        				$(formField.parentNode).addClass('has-error');
        			} else {
        				$(formField.parentNode).removeClass('has-error');
        			}
        		}
			}
			return valid;
        },

        createSite: function() {
        	if (this.validate()) {
        		$('#createsite-dialog').modal('hide');	
        	}
        	
        }
    });

    return CreateSiteView;
});
