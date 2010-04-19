// ==========================================================================
// Project:   Md.Project Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Md */

sc_require('models/project');

Md.Project.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

  { guid: 1,
    name: "GDC",
    people: [1] },
  
  { guid: 2,
    name: "SFDC",
    people: [2, 3] }
  //
  // { guid: 3,
  //   firstName: "Jim",
  //   lastName: "Halpert" },
  //
  // { guid: 4,
  //   firstName: "Pam",
  //   lastName: "Beesly" },
  //
  // { guid: 5,
  //   firstName: "Ryan",
  //   lastName: "Howard" }

];
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('md');