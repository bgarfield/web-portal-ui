Backbone.store = Backbone.store || {}; // establish Backbone.store namespace

(function () {
    'use strict';

    var Alfresco = _.extend({}, AbstractApiSync);
    
    Alfresco.login = function(userName, password) {
      var url, request, method = METHOD_LOGIN,
      authToken = this._buildAuth(userName, password);

      url = this._buildServiceUrl(method, false, {
        'authToken': authToken
      });

      request = $.ajax({
        url: url,
        type: 'post',
        format: 'json',
        timeout: 15000,
        context: {method: method},
        success: this._callback,
        error: this._errorCallback
      });

      return true;
    }

    Alfresco.validateTicket = function(ticket) {
      var url, request, method = METHOD_VALIDATE_TICKET;

      url = this._buildServiceUrl(method, false, {
        'ticket': ticket
      });

      request = $.ajax({
        url: url,
        type: 'post',
        format: 'json',
        context: {method: method},
        success: this._callback,
        error: this._errorCallback
      });

      return true;
    }
    
    // group together the API calls that require only the site id
    Alfresco.callSimpleAPI = function(method, siteId, options) {
      var url, request;

      options || (options = {});
      options.pageSize = options.pageSize || 999;
      options.siteId = options.siteId || siteId;

      url = this._buildServiceUrl(method, true, options);

      request = $.ajax({
        url: url,
        type: 'get',
        format: 'json',
        context: {method: method},
        success: this._callback,
        error: this._errorCallback
      });

      return true;
    }
    
    Alfresco.search = function(options) {
      return new $.Deferred();
    }
    
    Alfresco.save = function(options) {
    }
    
    Alfresco.delete = function(options) {
    }
    
    Alfresco.loadCollection = function(collection, options) {
      options || (options = {});

      Alfresco.search({
        index: options.index || collection.model.url || collection.url || 'Backbone',
        // type: options.type || collection.model.url || collection.url || 'Backbone',
        size: options.size || 50,
        // search_type: 'scan',
        body: {
          query: {
            matchAll: {}
          }
        }
      }).then(function(resp) {
        Backbone.Log.log('Record count: ' + resp.hits.total);
        // collection.add(resp.hits.hits);
        _.each(resp.hits.hits, function(record) {
          collection.add(record._source);
        })
      });
    }

    Alfresco.sync = function(method, model, options) {
      options || (options = {});

      switch (method) {
        case 'create':
          if (!model.get(model.idAttribute)) {
            model.set(model.idAttribute, guid());
          }

          Alfresco.save({
            index: options.index || model.url || 'Backbone',
            type: options.type || model.url || 'Backbone',
            id: model.get(model.idAttribute),
            body: model.toJSON()
          }, function(err, resp) {
            // on error
            if(err) {
              Backbone.Log.log('error calling elasticsearch ' + err);
              return;
            }
            
            Backbone.Log.log('success calling elasticsearch. Saved model: ' + JSON.stringify(model));
          });
        break;

        case 'update':
          Alfresco.save({
            index: options.index || model.url || 'Backbone',
            type: options.type || model.url || 'Backbone',
            id: model.get(model.idAttribute),
            body: model.toJSON()
          }, function(err, resp) {
            // on error
            if(err) {
              Backbone.Log.log('error calling elasticsearch ' + err);
              return;
            }
          
            Backbone.Log.log('success calling elasticsearch. Saved model: ' + JSON.stringify(model));
          });
        break;

        case 'delete':
          if (!model.get(model.idAttribute)) {
            Backbone.Log.log('error calling elasticsearch delete. Must supply an id to delete');
            return;
          }

          Alfresco.delete({
            index: options.index || model.url || 'Backbone',
            type: options.type || model.url || 'Backbone',
            id: model.get(model.idAttribute)
          }, function(err, resp) {
            // on error
            if(err) {
              Backbone.Log.log('error calling elasticsearch ' + err);
              return;
            }
          
            Backbone.Log.log('success calling elasticsearch. Saved model: ' + JSON.stringify(model));
          });
        break;

        case 'read':
          if (!model.get(model.idAttribute)) {
            Backbone.Log.log('error calling elasticsearch for read. Must supply an id to delete');
            return;
          }
          
          Alfresco.search({
            index: options.index || model.url || 'Backbone',
            type: options.type || model.url || 'Backbone',
            size: 1,
            body: {
              query: {
                match: {
                  id: model.get(model.idAttribute)
                }
              }
            }
          }).then(function(resp) {
            // on success
            Backbone.Log.log('elasticsearch response: ' + resp);
            if(resp.hits.total==0) {
              Backbone.Log.log('record not found for id: ' + model.get(model.idAttribute) + ' response:' + resp);
              throw 'record not found for id: ' + model.get(model.idAttribute) + ' response:' + resp;
            } else if(resp.hits.total>0) {
              model.set(resp.hits.hits[0]._source);
            }
            
          });
        break;
      }
    };
    
    Backbone.sync = Alfresco.sync;
    Backbone.store = Alfresco;
})();

