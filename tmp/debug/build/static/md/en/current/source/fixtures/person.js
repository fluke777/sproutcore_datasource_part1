// ==========================================================================
// Project:   Md.Person Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Md */

sc_require('models/person');

Md.Person.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

  { guid: 1,
    name: "Michael",
    project: 1,
    age: 20 },
  
  { guid: 2,
    name: "Dwight",
    project: 2,
    age: 30 },
  
  { guid: 3,
    name: "Jim",
    project: 2,
    age: 60 }
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