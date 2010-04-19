// ==========================================================================
// Project:   Md.Ds
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Md */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
sc_require('models/person');
sc_require('models/project');

Md.PEOPLE_QUERY             = SC.Query.local(Md.Person, {
    orderBy: 'lastName, firstName'
});

Md.Ds = SC.DataSource.extend(
/** @scope Md.Ds.prototype */ {
  
  _getFromUri: function(uri, options) {
    var notifyMethod;
    if (options.isQuery) {
      notifyMethod = this._didGetQuery;
    } else {
      notifyMethod = this._didRetrieveRecords;
    }
      
    SC.Request.getUrl(uri)
      .set('isJSON', YES)
      .notify(this, notifyMethod, options)
      .send();
    return YES;
  },
  
  fetch: function(store, query) {
      options = {
        store:    store,
        query:    query,
        isQuery:  YES
      };
      console.log("Fetch");
      if (query === Md.PEOPLE_QUERY) {
        console.log("people query");
        options['type'] = Md.Person;
        return this._getFromUri('/people', options);
      }
    return NO;
  },
  
  _didGetQuery: function(response, params) {
      var store     = params.store,
          query     = params.query, 
          type      = params.type,
          deffered  = params.deffered;
          
      if (SC.ok(response)) {
        // notify store that we handled the fetch
        if (query.get('isLocal')) {
            console.log("fetch local");
            var storeKeys = store.loadRecords(type, response.get('body'));
            store.dataSourceDidFetchQuery(query);
        } else if (deffered) {
          console.log("fetch remote deffered");
          var storeKeys = response.get('body').map(function(id) {
            return Md.Person.storeKeyFor(id);
          }, this);
          store.loadQueryResults(query, storeKeys);
        } else {
          console.log("fetch remote");
          var storeKeys = store.loadRecords(type, response.get('body'));
          store.loadQueryResults(query, storeKeys);
        }
      // handle error case
      } else store.dataSourceDidErrorQuery(query, response);
  },
  
  retrieveRecord: function(store, storeKey) {
    this._getFromUri(store.idFor(storeKey), {
      storeKey:       storeKey,
      store:          store,
      type:           store.recordTypeFor(storeKey)
      
    });
    return YES;
  },
  
  _didRetrieveRecords: function(response, params) {
    var store = params.store,
        type = params.type,
        data;
    if (SC.ok(response)) {
      data = response.get('body');
      console.log(data, type);
      store.loadRecords(type, data.isEnumerable ? data : [data]);
    } else store.dataSourceDidError(storeKey, response.get('body'));
  },
    
  createRecord: function(store, storeKey) {
    console.log("createRecord");    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {
    console.log("updateRecord");
    
    SC.Request.putUrl(store.idFor(storeKey)).json()
      .notify(this, this._didUpdateRecord, store, storeKey)
      .send(store.readDataHash(storeKey));
    return YES;
    
  },
  
  _didUpdateRecord: function(response, store, storeKey) {
    if (SC.ok(response)) {
      var data = response.get('body');
      // if (data) data = data.content; // if hash is returned; use it.
      store.dataSourceDidComplete(storeKey) ;
    } else store.dataSourceDidError(storeKey); 
  },
  
  destroyRecord: function(store, storeKey) {
        console.log("destroyRecord");
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;


// SC.ManyArray.prototype.retrieveIfNeeded = function() {
//   var ids = this.get('readOnlyStoreIds'),
//       type = this.get('recordType'),
//       store = this.get('store');
//       
//   ids = ids.filter(function(id) {
//     var storeKey = store.storeKeyFor(type, id);
//     return store.readStatus(storeKey) & SC.Record.EMPTY;
//   }, this);
//   
//   store.retrieveRecords(type, ids);
// };