/*global Backbone $.es*/

Backbone.es = Backbone.es || {}; // establish Backbone.es namespace

(function () {
    'use strict';

    // Generate four random hex digits.
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };

    // Generate a pseudo-GUID by concatenating random hexadecimal.
    function guid() {
       return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    };

    Backbone.es.client = new $.es.Client({
      host: 'localhost:9200',
      log: 'trace'
    });
    
    Backbone.es.loadAll = function(collection, options) {
      options || (options = {});

      Backbone.es.client.search({
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

    Backbone.sync = function(method, model, options) {
      options || (options = {});

      switch (method) {
        case 'create':
          if (!model.get(model.idAttribute)) {
            model.set(model.idAttribute, guid());
          }

          Backbone.es.client.index({
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
          Backbone.es.client.index({
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

          Backbone.es.client.delete({
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
            Backbone.Log.log('error calling elasticsearch for read. Must supply an id to read');
            return;
          }
          
          Backbone.es.client.search({
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

})();

