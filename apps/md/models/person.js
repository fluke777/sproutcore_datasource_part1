// ==========================================================================
// Project:   Md.Person
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Md */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Md.Person = SC.Record.extend(
/** @scope Md.Person.prototype */ {

  // TODO: Add your own code here.
  name:             SC.Record.attr(String),
  firstName:        SC.Record.attr(String),
  lastName:         SC.Record.attr(String),
  age:              SC.Record.attr(Number),
  isOld:            function() {
      return this.get('age') > 50;
  }.property('age').cacheable(),
  
  // Computed Property
  description: function(key, val) {
      if (val !== undefined) {
          var parts = val.split(" ");
          this.set("age", parts[0]);
          this.set("firstName", parts[1]);
      }
      return "%@ %@".fmt(this.get("age"), this.get("firstName"));
  }.property('age', 'firstName').cacheable(),
  
  // Transient
  lastTimeSeenAtWork: null,
  // Mapping
  project:  SC.Record.toOne("Md.Project", { 
    inverse: "people", isMaster: YES 
  }),
  
  
  addToProject: function(aProject) {
      this.set('project', aProject);
  },
  
  quitProject: function() {
      this.set('project', null);
  },
  
  firstNameDidChange: function() {
    console.log("firstNameDidChange");
  }.observes('name')
  
});