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

        createSite: function() {

        }
    });

    return CreateSiteView;
});
