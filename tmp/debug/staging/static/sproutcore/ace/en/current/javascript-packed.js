/* >>>>>>>>>> BEGIN javascript.js */
/* >>>>>>>>>> BEGIN source/theme.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/** @class
  @extends SC.Theme
  @since SproutCore 1.1
*/
SC.EmptyTheme = SC.Theme.extend({
  classNames: ["sc-empty"]
});

SC.Theme.register("sc-empty", SC.EmptyTheme);

/* >>>>>>>>>> BEGIN source/image.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================
 
/** @class

  This renderer is initially intended for image button
  @extends SC.Renderer
  @since SproutCore 1.1
*/
require("theme");
SC.EmptyTheme.renderers.ImageButton = SC.Renderer.extend({
  render: function(context) {
    var icon = this.icon;
    context.addClass('no-min-width');
    if(icon) context.push("<div class='img "+icon+"'></div>");
    else context.push("<div class='img'></div>");
  },
  
  update: function() {
    var cq = this.$(), src = this.icon;
    if (src) {
      cq.attr('class', "img "+src);
    } else {
      cq.attr('class', "img");
    }  
  }
});
 
SC.EmptyTheme.renderers.imageButton = SC.EmptyTheme.renderers.ImageButton.create();
/* >>>>>>>>>> BEGIN source/renderers/button.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/** @class
  @extends SC.Renderer
  @since SproutCore 1.1
*/
require("theme");
SC.EmptyTheme.renderers.Button = SC.Renderer.extend({
  controlSizeArray: [18, 24, 30, 44], // pre-create for performance (purely optional optimization)
  controlSizes: {
    18: SC.SMALL_CONTROL_SIZE,
    24: SC.REGULAR_CONTROL_SIZE,
    30: SC.HUGE_CONTROL_SIZE,
    44: SC.JUMBO_CONTROL_SIZE
  },
  
  init: function(settings) {
    this._controlRenderer = this.theme.control({
      controlSizes: this.controlSizes,
      controlSizeArray: this.controlSizeArray // purely optional optimization
    });
    
    this._titleRenderer = this.theme.title();
    this.attr(settings);
  },
  render: function(context) {
    // configure sub renderers
    this._controlRenderer.attr({
      isEnabled: this.isEnabled,
      isActive: this.isActive,
      isSelected: this.isSelected,
      controlSize: this.controlSize
    });
    this._titleRenderer.attr({
      title: this.title,
      icon: this.icon,
      needsEllipsis: this.needsEllipsis,
      escapeHTML: this.escapeHTML
    });
    
    // render control renderer
    this._controlRenderer.render(context);
    
    /* Render OUR stuff */
    // add href attr if tagName is anchor...
    var href, toolTip, classes, theme;
    if (this.isAnchor) {
      href = this.href;
      if (!href || (href.length === 0)) href = "javascript:;";
      context.attr('href', href);
    }

    // If there is a toolTip set, grab it and localize if necessary.
    toolTip = this.toolTip;
    if (SC.typeOf(toolTip) === SC.T_STRING) {
      context.attr('title', toolTip) ;
      context.attr('alt', toolTip) ;
    }
    
    // add some standard attributes & classes.
    classes = this._TEMPORARY_CLASS_HASH ? this._TEMPORARY_CLASS_HASH : this._TEMPORARY_CLASS_HASH = {};
    classes.def = this.isDefault;
    classes.cancel = this.isCancel;
    classes.icon = !!this.icon;
    context.attr('role', 'button').setClass(classes);

    theme = this.oldButtonTheme;
    if (theme) context.addClass(theme);
    
    this.renderContents(context);
  },
  
  renderContents: function(context) {
    // render inner html 
    var minWidth = (this.titleMinWidth ? "style='min-width: " + this.titleMinWidth + "px'" : "");
    context = context.push("<span class='sc-button-inner' " + minWidth + ">");
    
    /* Render title */
    context = context.begin("label").addClass("sc-button-label");
    this._titleRenderer.render(context);
    context = context.end();
    
    context.push("</span>") ;
    
    if(this.supportFocusRing) {
      context.push('<div class="focus-ring">',
                    '<div class="focus-left"></div>',
                    '<div class="focus-middle"></div>',
                    '<div class="focus-right"></div></div>');
    }
  },
  
  update: function() {
    this._controlRenderer.attr({
      isEnabled: this.isEnabled,
      isActive: this.isActive,
      isSelected: this.isSelected,
      controlSize: this.controlSize
    });
    this._titleRenderer.attr({
      title: this.title,
      icon: this.icon,
      needsEllipsis: this.needsEllipsis,
      escapeHTML: this.escapeHTML
    });
    
    // do actual updating
    this._controlRenderer.update();    
    var classes, theme, q = this.$();
    
    classes = this._TEMPORARY_CLASS_HASH ? this._TEMPORARY_CLASS_HASH : this._TEMPORARY_CLASS_HASH = {};
    classes.def = this.isDefault;
    classes.cancel = this.isCancel;
    classes.icon = !!this.icon;
    
    q.setClass(classes);
    
    
    // update title
    this.updateContents();
  },
  
  updateContents: function() {
    this._titleRenderer.update();
  },
  
  focus: function() {
    var elem = this.$()[0];
    elem.focus();
  },
  
  didAttachLayer: function(layer){
    this._titleRenderer.attachLayer(this.provide("label"));
    this._controlRenderer.attachLayer(layer);
  },
  
  willDetachLayer: function() {
    this._titleRenderer.detachLayer();
    this._controlRenderer.detachLayer();
  }
});

SC.EmptyTheme.renderers.button = SC.EmptyTheme.renderers.Button.create();
/* >>>>>>>>>> BEGIN source/renderers/checkbox.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/** @class
  @extends SC.Renderer
  @since SproutCore 1.1
*/
require("theme");
SC.EmptyTheme.renderers.Checkbox = SC.Renderer.extend({
  controlSizeArray: [14, 16], // pre-create for performance (purely optional optimization)
  controlSizes: {
    14: SC.SMALL_CONTROL_SIZE,
    16: SC.REGULAR_CONTROL_SIZE
  },
  
  init: function(settings) {
    this._controlRenderer = this.theme.control({
      controlSizes: this.controlSizes,
      controlSizeArray: this.controlSizeArray // purely optional optimization
    });
    
    this._titleRenderer = this.theme.title();
    this.attr(settings);
  },
  render: function(context) {
    // configure sub renderers
    this._controlRenderer.attr({
      isEnabled: this.isEnabled,
      isActive: this.isActive,
      isSelected: this.isSelected,
      controlSize: this.controlSize
    });
    this._titleRenderer.attr({
      title: this.title,
      icon: this.icon,
      needsEllipsis: this.needsEllipsis,
      escapeHTML: this.escapeHTML
    });
    
    // render control renderer
    this._controlRenderer.render(context);
    
    /* Render OUR stuff */
    // write button
    context.attr('role', 'checkbox');
    if (SC.browser.msie) context.attr('for', guid);
    context.push('<span class="button"></span>');
    
    // write label
    context = context.begin("span").addClass("label");
    this._titleRenderer.render(context);
    context = context.end();
    
    // set name
    context.attr('name', this.name);
    context.attr("aria-checked", this.ariaValue);
    this.resetChanges();
  },
  
  update: function() {
    this._controlRenderer.attr({
      isEnabled: this.isEnabled,
      isActive: this.isActive,
      isSelected: this.isSelected,
      controlSize: this.controlSize
    });
    this._titleRenderer.attr({
      title: this.title,
      icon: this.icon,
      needsEllipsis: this.needsEllipsis,
      escapeHTML: this.escapeHTML
    });
    
    // do actual updating
    this._controlRenderer.update();    
    var classes, theme, q = this.$();
    
    this._titleRenderer.update();
    
    if (this.didChange('ariaValue')) q.attr("aria-checked", this.ariaValue);
    this.resetChanges();
  },
  
  didAttachLayer: function(layer){
    this._titleRenderer.attachLayer(this.provide("span.label"));
    this._controlRenderer.attachLayer(layer);
  },
  
  willDetachLayer: function() {
    this._titleRenderer.detachLayer();
    this._controlRenderer.detachLayer();
  }
});

SC.EmptyTheme.renderers.checkbox = SC.EmptyTheme.renderers.Checkbox.create();
/* >>>>>>>>>> BEGIN source/renderers/control.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/** @class
  @extends SC.Renderer
  @since SproutCore 1.1
*/
require("theme");
SC.EmptyTheme.renderers.Control = SC.Renderer.extend({
  /**
    Returns the control size for a given numeric size.
  */
  controlSizeForSize: function(size) {
    var controlSizes = this.controlSizeArray, controlSizeNames = this.controlSizes;
    
    // create map if it isn't around
    if (!controlSizes) {
      var key;
      controlSizes = [];
      for (key in controlSizeNames) controlSizes.push(Number(key));
      controlSizes = controlSizes.sort();
      this.controlSizeArray = controlSizes;
    }
    
    // return exact matches immediately: 
    if (controlSizeNames[size]) return controlSizeNames[size];
    
    var idx, len, val = null;
    len = controlSizes.length;
    
    // if we haven't got nothing, don't do nothing.
    if (len === 0) return null;
    
    // find best match
    for (idx = 0; idx < len; idx++) {
      if (controlSizes[idx] > size) break;
      val = controlSizes[idx];
    }
    
    // and now find actual size.
    if (!val) return null;
    return controlSizeNames[val];
  },
  
  /**
    Returns a control size for a layout object, calling controlSizeForSize.
  */
  controlSizeForLayout: function(layout) {
    if (!SC.none(layout.height)) return this.controlSizeForSize(layout.height);
    return null;
  },
  
  /**
    Figures out the actual control size.
  */
  resolveControlSize: function() {
    var cs = this.controlSize;
    if (!cs) return null; // this way we know not to set anything.
    
    // if it is a string, it is a precreated size name
    if (SC.typeOf(cs) === SC.T_STRING) {
      return cs;
    }
    
    // if it is a number, it is a size
    if (SC.typeOf(cs) === SC.T_NUMBER) {
      return this.controlSizeForSize(cs);
    }
    
    // if it is a hash, it is a layout
    if (SC.typeOf(cs) === SC.T_HASH) {
      return this.controlSizeForLayout(cs);
    }
    
    // nothing valid here
    return null;
  },
  
  
  /** 
    Calculate appropriate hashes.
  */
  calculateClasses: function() {
    var sel = this.isSelected, disabled = !this.isEnabled,
        names = this._TMP_CLASSNAMES ? this._TMP_CLASSNAMES : this._TMP_CLASSNAMES = {};
    names.mixed = sel === SC.MIXED_STATE;
    names.sel = sel && (sel !== SC.MIXED_STATE) ;
    names.active = this.isActive;
    
    return names;
  },
  render: function(context) {
    // update the CSS classes for the control.  note we reuse the same hash
    // to avoid consuming more memory
    context.setClass(this.calculateClasses());
    
    
    var controlSize = this.resolveControlSize();
    if (!controlSize) controlSize = SC.REGULAR_CONTROL_SIZE;
    
    if (controlSize) context.addClass(controlSize);
    this._last_control_size = controlSize;
  },
  
  update: function() {
    if (this.didChange('controlSize')) {
      var controlSize = this.resolveControlSize();
      if (!controlSize) controlSize = SC.REGULAR_CONTROL_SIZE;
      
      if (this._last_control_size != this.controlSize) this.$().setClass(this._last_control_size, NO);
      if (controlSize) this.$().setClass(controlSize, YES);
    }
    
    this.$().setClass(this.calculateClasses());
  }
});

SC.EmptyTheme.renderers.control = SC.EmptyTheme.renderers.Control.create();
/* >>>>>>>>>> BEGIN source/renderers/image.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/** @class
  @extends SC.Renderer
  @since SproutCore 1.1
*/
require("theme");
SC.EmptyTheme.renderers.Image = SC.Renderer.extend({
  render: function(context) {
    var src = this.src, toolTip = this.toolTip || '', image = '';
    
    if ((this.isSprite !== YES && src.indexOf('/') >= 0) || this.isSprite === NO) {
      context.attr('src', src);
      this._last_sprite_class = NO;
    } else {
      context.attr('src', SC.BLANK_IMAGE_URL);
      context.addClass(src);
      this._last_sprite_class = src;
    }
    
    context.attr('title', toolTip);
    context.attr('alt', toolTip);
  },
  
  update: function() {
    var cq = this.$();
    
    var src = this.src, toolTip = this.toolTip || '', image = '';
    
    if ((this.isSprite !== YES && src.indexOf('/') >= 0) || this.isSprite === NO) {
      cq.attr('src', src);
      this._last_sprite_class = NO;
    } else {
      if (this._last_sprite_class) context.setClass(this._last_sprite_class, NO);
      cq.attr('src', SC.BLANK_IMAGE_URL);
      cq.setClass(src, YES);
      this._last_sprite_class = src;
    }
    
    cq.attr('title', toolTip);
    cq.attr('alt', toolTip);

  }
});

SC.EmptyTheme.renderers.image = SC.EmptyTheme.renderers.Image.create();
/* >>>>>>>>>> BEGIN source/renderers/masterDetail.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/** @class
  @extends SC.Renderer
  @since SproutCore 1.1
*/

require("theme");
SC.EmptyTheme.renderers.MasterDetail = SC.Renderer.extend({
  BORDER: 1,
  render: function(context) {
    if (this.contentProvider) this.contentProvider.renderContent(context);
  },
  
  update: function() {
  }
});

SC.EmptyTheme.renderers.masterDetail = SC.EmptyTheme.renderers.MasterDetail.create();
/* >>>>>>>>>> BEGIN source/renderers/panel.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/** @class
  @extends SC.Renderer
  @since SproutCore 1.1
*/
require("theme");
SC.EmptyTheme.renderers.Panel = SC.Renderer.extend({
  render: function(context) {
    if (this.contentProvider) this.contentProvider.renderContent(context);
    context.push(
      "<div class='middle'></div>",
      "<div class='top-left-edge'></div>",
      "<div class='top-edge'></div>",
      "<div class='top-right-edge'></div>",
      "<div class='right-edge'></div>",
      "<div class='bottom-right-edge'></div>",
      "<div class='bottom-edge'></div>",
      "<div class='bottom-left-edge'></div>",
      "<div class='left-edge'></div>"
    );
  },
  
  update: function() {
    // we NEVER update child views. They get to do that on their own.
  }
});

SC.EmptyTheme.renderers.panel = SC.EmptyTheme.renderers.Panel.create();
/* >>>>>>>>>> BEGIN source/renderers/picker.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/** @class
  @extends SC.Renderer
  @since SproutCore 1.1
*/

require("theme");
SC.EmptyTheme.renderers.Picker = SC.Renderer.extend({
  init: function(attr) {
    this.attr(attr);
    
    this.panelRenderer = this.theme.panel();
  },
  render: function(context) {
    this.panelRenderer.attr("contentProvider", this.contentProvider);
    this.panelRenderer.render(context);
    
    if (this.preferType == SC.PICKER_POINTER || this.preferType == SC.PICKER_MENU_POINTER) {
      context.push('<div class="sc-pointer '+this.pointerPos+'" style="margin-top: '+this.pointerPosY+'px"></div>');
      context.addClass(this.pointerPos);
    }
  },
  
  update: function() {
    this.panelRenderer.attr("contentProvider", this.contentProvider);
    this.panelRenderer.update();
    
    if (this.preferType == SC.PICKER_POINTER || this.preferType == SC.PICKER_MENU_POINTER) {
      var el = this.$('.sc-pointer');
      el.attr('class', "sc-pointer "+this.pointerPos);
      el.attr('style', "margin-top: "+this.pointerPosY+"px");
      this.$().addClass(this.pointerPos);
    }
  },
  
  didAttachLayer: function(l) {
    this.panelRenderer.attachLayer(l);
  },
  
  willDetachLayer: function() {
    this.panelRenderer.detachLayer();
  }
});

SC.EmptyTheme.renderers.picker = SC.EmptyTheme.renderers.Picker.create();

/* >>>>>>>>>> BEGIN source/renderers/segment.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/** @class
  @extends SC.Renderer
  @since SproutCore 1.1
*/
require("theme");
SC.EmptyTheme.renderers.Segment = SC.Renderer.extend({
  init: function(settings) {
    this._buttonRenderer = this.theme.button();
    this.attr(settings);
  },
  
  updateButtonRenderer: function() {
    this._buttonRenderer.attr({
      title: this.title,
      icon: this.icon,
      toolTip: this.toolTip,
      isEnabled: this.isEnabled,
      isSelected: this.isSelected,
      isActive: this.isActive
    });
  },
  
  computeClasses: function() {
    var classes = this._class_hash || {};
    
    classes["sc-first-segment"] = this.isFirstSegment;
    classes["sc-middle-segment"] = this.isMiddleSegment;
    classes["sc-last-segment"] = this.isLastSegment;
    classes["sc-segment"] = YES;
    
    this._class_hash = classes;
    return classes;
  },
  
  render: function(context) {
    // configure sub renderers
    this.updateButtonRenderer();
    this._buttonRenderer.render(context);
    
    /* Render OUR stuff */
    context.setClass(this.computeClasses());
    if (this.width) context.addStyle('width', this.width + 'px');

    if (this.layoutDirection === SC.LAYOUT_HORIZONTAL) context.addStyle('display', 'inline-block');
    this.resetChanges();
  },
  
  update: function() {
    // well, if we haven't changed, why not be a bit lazy
    if (!this.hasChanges()) return;
    
    this.updateButtonRenderer();
    this._buttonRenderer.update();
    
    // update OUR stuff
    this.$().setClass(this.computeClasses());
    if (this.didChange("width")) this.$().css('width', this.width ? this.width+'px' : '');
    if (this.didChange('layoutDirection')) this.$().css('display', this.layoutDirection == SC.LAYOUT_HORIZONTAL ? 'inline-block' : '');
    this.resetChanges();
  },
  
  didAttachLayer: function(layer){
    this._buttonRenderer.attachLayer(layer);
  },
  
  willDetachLayer: function() {
    this._buttonRenderer.detachLayer();
  }
});

SC.EmptyTheme.renderers.segment = SC.EmptyTheme.renderers.Segment.create();
/* >>>>>>>>>> BEGIN source/renderers/segmented.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/** @class
  @extends SC.Renderer
  @since SproutCore 1.1
*/
require("theme");
SC.EmptyTheme.renderers.Segmented = SC.Renderer.extend({
  init: function(attrs) {
    this._segments = [];
    this.attr(attrs);
  },
  
  // renderers are renderers and that's all they are.
  render: function(context) {
    var segments = this.segments, idx, len, segs = [],
        reusables = this._segments,
        segment, ren;
    
    // clean up; get rid of layers on our existing segments
    for (idx = 0, len = reusables.length; idx < len; idx++) reusables[idx].detachLayer();
    
    // now, create new stuff
    for (idx = 0, len = segments.length; idx < len; idx++) {
      segment = segments[idx];
      
      // create an <a>
      context = context.begin("a");
      context.addClass('segment-' + idx);
      
      // check if we have a reusable renderer (waste not, want not)
      if (reusables.length > idx) {
        ren = reusables[idx];
      } else { // otherwise, create a new one.
        ren = this.theme.segment();
      }
      
      // set attributes
      ren.attr(segment);
      ren.attr('layoutDirection', this.layoutDirection);
      ren.attr('isFirstSegment', idx === 0);
      ren.attr('isLastSegment', idx === len - 1);
      ren.attr('isMiddleSegment', idx < len - 1 && idx > 0);
      
      // render to context
      ren.render(context);
      
      // finish context
      context = context.end();
      
      // add renderer to our list
      segs.push(ren);
      
      // finally, if we have a layer, we need to attach the renderer to the layer.
      ren.attachLayer(this.provide(".segment-" + idx));
    }
    
    this._segments = segs;
  },
  
  
  update: function() {
    // this is actually performance-oriented. If we are completely changing the list of segments...
    // it may be faster to just re-render them all in one go. Plus it's easy.
    // Otherwise, we'd have to try to append or something crazy like that, which wouldn't be so good;
    // or who knows what.
    if (this._segments.length !== this.segments.length) {
      var layer = this.layer();
      if (!layer) return;
      
      // re-render
      var context = SC.RenderContext(layer);
      this.render(context);
      context.update();
      
      // and done!
      return;
    }
    
    // otherwise, just update each renderer
    var segments = this.segments, idx, len = segments.length, renderers = this._segments,
        segment, renderer;
    
    // loop through renderers+segments, and update them all
    for (idx = 0; idx < len; idx ++) {
      segment = segments[idx]; renderer = renderers[idx];
      renderer.attr(segment);
      renderer.attr('layoutDirection', this.layoutDirection);
      renderer.update();
    }
  },
  
  didAttachLayer: function(provier) {
    var segments = this._segments, segment, idx, len = segments.length;
    for (idx = 0; idx < len; idx++) {
      segment = segments[idx];
      
      // make a layer provider
      segment.attachLayer(this.provide(".segment-" + idx));
    }
  },
  
  willDetachLayer: function() {
    var segments = this._segments, segment, idx, len = segments.length;
    
    // just detach the layer.
    for (idx = 0; idx < len; idx++) {
      segments[idx].detachLayer();
    }
  },
  
  indexForEvent: function(evt) {
    var elem = SC.$(evt.target) ;
    if (!elem || elem===document) return -1; // nothing found
    
    // start at the target event and go upwards until we reach either the 
    // root responder or find an element with an 'sc-segment' class.
    var root = this.$(), match = null ;
    while(!match && (elem.length>0) && (elem[0]!==root[0])) {
      if (elem.hasClass('sc-segment')) {
        match = elem;
      } else elem = elem.parent();
    }
    
    elem = root = null;

    // if a match was found, return the index of the match in subtags
    var ret = (match) ? this.$('.sc-segment').index(match) : -1;
    return ret;
  }
});

SC.EmptyTheme.renderers.segmented = SC.EmptyTheme.renderers.Segmented.create();
/* >>>>>>>>>> BEGIN source/renderers/title.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/** @class
  @extends SC.Renderer
  @since SproutCore 1.1
*/
require("theme");
SC.EmptyTheme.renderers.Title = SC.Renderer.extend({
  render: function(context) {
    var icon = this.icon,
        image = '' ,
        title = this.title ,
        needsTitle = (!SC.none(title) && title.length>0), imgTitle;
    if(this.escapeHTML) title = SC.RenderContext.escapeHTML(title) ;
        
    // get the icon.  If there is an icon, then get the image and update it.
    // if there is no image element yet, create it and insert it just before
    // title.
    
    if (icon) {
      var blank = SC.BLANK_IMAGE_URL;

      if (icon.indexOf('/') >= 0) {
        image = '<img src="'+icon+'" alt="" class="icon" />';
      } else {
        image = '<img src="'+blank+'" alt="" class="'+icon+'" />';
      }
      needsTitle = YES ;
    }
    imgTitle = image + title;
    
    // handle ellipsis
    if(this.needsEllipsis){
      context.addClass('sc-button-label');
    }
    
    // push title.
    context.push(imgTitle);
    
    this._ImageTitleCached = imgTitle;
  },
  
  update: function() {
    var icon = this.icon,
        image = '' ,
        title = this.title ,
        needsTitle = (!SC.none(title) && title.length>0), imgTitle,
        elem, htmlNode;
    if(this.escapeHTML) title = SC.RenderContext.escapeHTML(title);
    
    if (icon) {
      var blank = SC.BLANK_IMAGE_URL;

      if (icon.indexOf('/') >= 0) {
        image = '<img src="'+icon+'" alt="" class="icon" />';
      } else {
        image = '<img src="'+blank+'" alt="" class="'+icon+'" />';
      }
      needsTitle = YES ;
    }
    imgTitle = image + title;
    
    elem = this.$();  
    if ( (htmlNode = elem[0])){
      if(needsTitle) { 
        if(this.needsEllipsis){
          elem.addClass('ellipsis');
          if(this._ImageTitleCached !== imgTitle) {
            this._ImageTitleCached = imgTitle; // Update the cache
            htmlNode.innerHTML = imgTitle;
          }
        }else{
          elem.removeClass('ellipsis');
          if(this._ImageTitleCached !== imgTitle) {
            this._ImageTitleCached = imgTitle; // Update the cache
            htmlNode.innerHTML = imgTitle;
          }
        } 
      }
      else { htmlNode.innerHTML = ''; } 
    }    
  }
});

SC.EmptyTheme.renderers.title = SC.EmptyTheme.renderers.Title.create();
/* >>>>>>>>>> BEGIN source/renderers/workspace.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/** @class
  @extends SC.Renderer
  @since SproutCore 1.1
*/

require("theme");
SC.EmptyTheme.renderers.Workspace = SC.Renderer.extend({
  render: function(context) {
    if (this.contentProvider) this.contentProvider.renderContent(context);
  },
  
  update: function() {
  }
});

SC.EmptyTheme.renderers.workspace = SC.EmptyTheme.renderers.Workspace.create();

/* >>>>>>>>>> BEGIN javascript.js */
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

