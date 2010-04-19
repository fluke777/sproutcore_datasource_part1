// ==========================================================================
// Project:   Md.Task
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Md */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Md.Task = SC.Record.extend(
/** @scope Md.Task.prototype */ {

  // TODO: Add your own code here.
  project:  SC.Record.toOne("Md.Project", { 
    inverse: "tasks", isMaster: YES 
  }),
  
}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('md');