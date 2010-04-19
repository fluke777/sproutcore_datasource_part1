/* >>>>>>>>>> BEGIN source/src/theme.js */
SC.AceTheme = SC.EmptyTheme.extend({
  name: "Ace",
  description: "Coolness.",
  classNames: ["ace", "light"]
});

SC.Theme.register("sc-ace", SC.AceTheme);

// until SC build tools automatically do this:
SC.Pane.prototype.baseTheme = "sc-ace";
/* >>>>>>>>>> BEGIN source/src/controls/buttons/button.js */
require("src/theme");

SC.AceTheme.renderers.Button = SC.EmptyTheme.renderers.Button.extend({
  renderContents: function(context) {
    // render background slices
    context.push("<span class='button-left'></span>");
    // render inner html
    context.push("<span class='button-middle'>");
    
    context = context.begin("label").addClass("sc-button-label");
    this._titleRenderer.render(context);
    context = context.end();
    
    context.push('</span>');
    context.push("<span class='button-right'></span>");
  }
});

SC.AceTheme.renderers.button = SC.AceTheme.renderers.Button.create();
/* >>>>>>>>>> BEGIN source/src/controls/segmented/segmented.js */

/* >>>>>>>>>> BEGIN source/src/panels/picker/picker.js */


/* >>>>>>>>>> BEGIN source/src/panels/picker/popover/popover.js */
SC.AceTheme.Popover = SC.AceTheme.subtheme("popover", "popover");
/* >>>>>>>>>> BEGIN source/src/panels/picker/popover/picker.js */
require("src/panels/picker/popover/popover");

SC.AceTheme.Popover.renderers.Picker = SC.EmptyTheme.renderers.Picker.extend({
  render: function(context) {
    context.addClass(this.pointerPos);
  },
  
  update: function() {
    this.$().addClass(this.pointerPos);
  }
});

SC.AceTheme.Popover.renderers.picker = SC.AceTheme.Popover.renderers.Picker.create();
/* >>>>>>>>>> BEGIN source/src/panels/picker/popover/workspace.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/** @class
  @extends SC.EmptyTheme.renderers.Workspace
  @since SproutCore 1.1
*/

// requires popover theme.
require("src/panels/picker/popover/popover");

var theme = SC.AceTheme.Popover;

SC.AceTheme.Popover.renderers.Workspace = SC.EmptyTheme.renderers.Workspace.extend({
  computeClassNames: function() {
    var cn = this._TMP_CLASS_NAMES || {};
    cn["top-toolbar"] = this.hasTopToolbar;
    cn["bottom-toolbar"] = this.hasBottomToolbar;
    this._TMP_CLASS_NAMES = cn;
    return cn;
  },
  
  render: function(context) {
    context.setClass(this.computeClassNames());
    
    context.push("<div class='sc-workspace-overlay'>",
      "<div class='middle'></div>",
      "<div class='top-left-edge'></div>",
      "<div class='top-edge'></div>",
      "<div class='top-right-edge'></div>",
      "<div class='right-edge'></div>",
      "<div class='bottom-right-edge'></div>",
      "<div class='bottom-edge'></div>",
      "<div class='bottom-left-edge'></div>",
      "<div class='left-edge'></div>",
      "<div class='sc-pointer'></div>",
    "</div>");
    
    if (this.contentProvider) this.contentProvider.renderContent(context);
  },
  
  update: function() {
    this.$().setClass(this.computeClassNames());
  }
});

SC.AceTheme.Popover.renderers.workspace = SC.AceTheme.Popover.renderers.Workspace.create();
