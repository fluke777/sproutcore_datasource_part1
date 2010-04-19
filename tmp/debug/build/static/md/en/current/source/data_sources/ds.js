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
      if (query === Md.PEOPLE_QUERY) {
        options['type'] = Md.Person;
        return this._getFromUri('/all', options);
      }
    return NO;
  },
  
  _loadRecordsOfType: function(type, data, store) {
    var recordType = type.capitalize();
    store.loadRecords(Md.getPath(recordType), data);
  },
  
  _didGetQuery: function(response, params) {
      var store     = params.store,
          query     = params.query, 
          type      = params.type,
          deffered  = params.deffered,
          data      = response.get('body'),
          storeKeys,
          recordType,
          recordData;
      
      if (SC.ok(response)) {
        for (recordType in data) {
          if (data.hasOwnProperty(recordType)) {
            this._loadRecordsOfType(recordType, data[recordType], store);
          }
        }
        store.dataSourceDidFetchQuery(query);
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
// };; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('md');