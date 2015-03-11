require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"CCOAppBar":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

this.CCOAppBar = (function(superClass) {
  extend(CCOAppBar, superClass);

  function CCOAppBar(options) {
    var constants, statusBarImage;
    if (options == null) {
      options = {};
    }
    CCOAppBar.__super__.constructor.call(this, options);
    constants = {
      nav_bar_height: 98,
      product_cell_height: 720,
      app_bar_height: 128
    };
    if (options.statusBarTextColor === "black") {
      statusBarImage = 'images/CCOAppBar/StatusBar-Black.png';
    } else {
      statusBarImage = 'images/CCOAppBar/StatusBar-White.png';
    }
    this.width = Framer.Device.screen.width;
    this.height = constants.app_bar_height;
    this.backgroundColor = options.backgroundColor;
    this.statusBar = new Layer({
      width: this.width,
      height: 44,
      backgroundColor: options.statusBarColor || "transparent",
      superLayer: this
    });
    this.statusBarImage = new Layer({
      width: this.width,
      height: this.statusBar.height,
      image: statusBarImage,
      superLayer: this.statusBar
    });
    this.appBarContainer = new Layer({
      backgroundColor: null,
      y: this.statusBar.height,
      width: this.statusBar.width,
      height: this.height - this.statusBar.height,
      superLayer: this
    });
    this.viewName = new Layer({
      width: this.width,
      height: 140,
      backgroundColor: null,
      superLayer: this.appBarContainer
    });
    this.viewName.html = options.viewName || 'Name this';
    this.viewName.style.fontFamily = options.fontFamily || 'Helvetica Neue';
    this.viewName.style = {
      'font-size': '40px',
      'color': 'white',
      'text-align': 'center',
      'padding-top': '20px'
    };
  }

  return CCOAppBar;

})(Layer);

exports.CCOAppBar;



},{}],"CCOScrollView":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Math.clamp = function(n, min, max) {
  return Math.max(min, Math.min(max, n));
};

this.CCODraggableScrollView = (function(superClass) {
  extend(CCODraggableScrollView, superClass);

  function CCODraggableScrollView(options) {
    this.dragEnd = bind(this.dragEnd, this);
    this.dragMove = bind(this.dragMove, this);
    this.dragStart = bind(this.dragStart, this);
    CCODraggableScrollView.__super__.constructor.call(this, options);
    this.contentWidth = options.contentWidth || Framer.Device.screen.width;
    this.contentHeight = options.contentHeight || Framer.Device.screen.height;
    this._direction = {};
    this._vertical = options.vertical || false;
    this._horizontal = options.horizontal || false;
    this.xMax = 0;
    this.xMin = -(this.contentWidth - this.width);
    this.yMax = 0;
    this.yMin = -(this.contentHeight - this.height);
    this.backgroundColor = "transparent";
    this.content = new Layer({
      superLayer: this,
      backgroundColor: null,
      width: this.contentWidth,
      height: this.contentHeight
    });
    this.content.draggable.Enabled = true;
    this.content.on(Events.DragStart, this.dragStart);
    this.content.on(Events.DragMove, this.dragMove);
    this.content.on(Events.DragEnd, this.dragEnd);
  }

  CCODraggableScrollView.prototype.dragStart = function(e, layer) {
    var ref;
    this.animateStop();
    if ((ref = this.momentum) != null) {
      ref.stop();
    }
    return this.emit(Events.DragStart, e, layer);
  };

  CCODraggableScrollView.prototype.dragMove = function(e, layer) {
    if (this._horizontal) {
      if (layer.x > 0) {
        this.content.draggable.speedX = Math.clamp(Utils.mapRange(layer.x, 100, 0, 0.5, 1), 0.5, 1);
      } else if (layer.x < this.xMin) {
        this.content.draggable.speedX = Math.clamp(Utils.mapRange(layer.x, this.xMin - 100, this.xMin, 0.5, 1), 0.5, 1);
      } else {
        this.content.draggable.speedX = 1;
      }
    } else {
      this.content.draggable.speedX = 0;
    }
    if (this._vertical) {
      if (layer.y > 0) {
        return this.content.draggable.speedY = Math.clamp(Utils.mapRange(layer.y, 100, this.yMax, 0.5, 1), 0.5, 1);
      } else if (layer.y < this.yMin) {
        return this.content.draggable.speedY = Math.clamp(Utils.mapRange(layer.y, this.yMin - 100, this.yMin, 0.5, 1), 0.5, 1);
      } else {
        return this.content.draggable.speedY = 1;
      }
    } else {
      return this.content.draggable.speedY = 0;
    }
  };

  CCODraggableScrollView.prototype.dragEnd = function(e, layer) {
    var totalVelocity, velocity, x, y;
    console.log('super dragEnd');
    velocity = layer.draggable.calculateVelocity();
    if (Math.abs(velocity.x) < .1 && Math.abs(velocity.y) < .1) {
      x = Math.clamp(layer.x, this.xMin, 0);
      y = Math.clamp(layer.y, this.yMin, 0);
      if (x !== layer.x || y !== layer.y) {
        this.momentum = layer.animate({
          properties: {
            x: x,
            y: y
          },
          curve: "spring",
          curveOptions: {
            friction: 100
          },
          time: .15
        });
        return this.momentum.on(Events.AnimationEnd, (function(_this) {
          return function() {
            return _this.emit(Events.DragEnd, e, layer);
          };
        })(this));
      } else {
        return this.emit(Events.DragEnd, e, layer);
      }
    } else {
      totalVelocity = Utils.pointTotal(Utils.pointAbs(velocity));
      this.momentum = this.content.animate({
        properties: {
          x: Math.clamp(parseInt(layer.x + (velocity.x * 500)), this.xMin, 0),
          y: Math.clamp(parseInt(layer.y + (velocity.y * 200)), this.yMin, 0)
        },
        curve: "spring",
        curveOptions: {
          friction: 100
        }
      });
      return this.momentum.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.emit(Events.DragEnd, e, layer);
        };
      })(this));
    }
  };

  return CCODraggableScrollView;

})(Layer);

exports.CCODraggableScrollView;



},{}],"CCOStylesheet":[function(require,module,exports){
this.CCOStylesheet = (function() {
  function CCOStylesheet(url) {
    var l, wf;
    wf = document.createElement('link');
    wf.href = url;
    wf.rel = 'stylesheet';
    l = document.getElementsByTagName('link')[0];
    l.parentNode.insertBefore(wf, l);
  }

  return CCOStylesheet;

})();

exports.CCOStylesheet;



},{}],"FBShortcuts":[function(require,module,exports){

/*
  Shortcuts for Framer 1.0
  http://github.com/facebook/shortcuts-for-framer

  Copyright (c) 2014, Facebook, Inc.
  All rights reserved.

  Readme:
  https://github.com/facebook/shortcuts-for-framer

  License:
  https://github.com/facebook/shortcuts-for-framer/blob/master/LICENSE.md
 */

/*
  CONFIGURATION
 */
var shortcuts;

shortcuts = {};

Framer.Defaults.FadeAnimation = {
  curve: "bezier-curve",
  time: 0.2
};

Framer.Defaults.SlideAnimation = {
  curve: "spring(400,40,0)"
};


/*
  LOOP ON EVERY LAYER

  Shorthand for applying a function to every layer in the document.

  Example:
  ```shortcuts.everyLayer(function(layer) {
    layer.visible = false;
  });```
 */

shortcuts.everyLayer = function(fn) {
  var _layer, layerName, results1;
  results1 = [];
  for (layerName in window.Layers) {
    _layer = window.Layers[layerName];
    results1.push(fn(_layer));
  }
  return results1;
};


/*
  SHORTHAND FOR ACCESSING LAYERS

  Convert each layer coming from the exporter into a Javascript object for shorthand access.

  This has to be called manually in Framer3 after you've ran the importer.

  myLayers = Framer.Importer.load("...")
  shortcuts.initialize(myLayers)

  If you have a layer in your PSD/Sketch called "NewsFeed", this will create a global Javascript variable called "NewsFeed" that you can manipulate with Framer.

  Example:
  `NewsFeed.visible = false;`

  Notes:
  Javascript has some names reserved for internal function that you can't override (for ex. )
  If you call initialize without anything, it will use all currently available layers.
 */

shortcuts.initialize = function(layers) {
  var layer;
  if (!layers) {
    layer = Framer.CurrentContext._layerList;
  }
  window.Layers = layers;
  return shortcuts.everyLayer(function(layer) {
    var sanitizedLayerName;
    sanitizedLayerName = layer.name.replace(/[-+!?:*\[\]\(\)\/]/g, '').trim().replace(/\s/g, '_');
    window[sanitizedLayerName] = layer;
    shortcuts.saveOriginalFrame(layer);
    return shortcuts.initializeTouchStates(layer);
  });
};


/*
  FIND CHILD LAYERS BY NAME

  Retrieves subLayers of selected layer that have a matching name.

  getChild: return the first sublayer whose name includes the given string
  getChildren: return all subLayers that match

  Useful when eg. iterating over table cells. Use getChild to access the button found in each cell. This is **case insensitive**.

  Example:
  `topLayer = NewsFeed.getChild("Top")` Looks for layers whose name matches Top. Returns the first matching layer.

  `childLayers = Table.getChildren("Cell")` Returns all children whose name match Cell in an array.
 */

Layer.prototype.getChild = function(needle, recursive) {
  var i, j, len, len1, ref, ref1, subLayer;
  if (recursive == null) {
    recursive = false;
  }
  ref = this.subLayers;
  for (i = 0, len = ref.length; i < len; i++) {
    subLayer = ref[i];
    if (subLayer.name.toLowerCase().indexOf(needle.toLowerCase()) !== -1) {
      return subLayer;
    }
  }
  if (recursive) {
    ref1 = this.subLayers;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      subLayer = ref1[j];
      if (subLayer.getChild(needle, recursive)) {
        return subLayer.getChild(needle, recursive);
      }
    }
  }
};

Layer.prototype.getChildren = function(needle, recursive) {
  var i, j, len, len1, ref, ref1, results, subLayer;
  if (recursive == null) {
    recursive = false;
  }
  results = [];
  if (recursive) {
    ref = this.subLayers;
    for (i = 0, len = ref.length; i < len; i++) {
      subLayer = ref[i];
      results = results.concat(subLayer.getChildren(needle, recursive));
    }
    if (this.name.toLowerCase().indexOf(needle.toLowerCase()) !== -1) {
      results.push(this);
    }
    return results;
  } else {
    ref1 = this.subLayers;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      subLayer = ref1[j];
      if (subLayer.name.toLowerCase().indexOf(needle.toLowerCase()) !== -1) {
        results.push(subLayer);
      }
    }
    return results;
  }
};


/*
  CONVERT A NUMBER RANGE TO ANOTHER

  Converts a number within one range to another range

  Example:
  We want to map the opacity of a layer to its x location.

  The opacity will be 0 if the X coordinate is 0, and it will be 1 if the X coordinate is 640. All the X coordinates in between will result in intermediate values between 0 and 1.

  `myLayer.opacity = convertRange(0, 640, myLayer.x, 0, 1)`

  By default, this value might be outside the bounds of NewMin and NewMax if the OldValue is outside OldMin and OldMax. If you want to cap the final value to NewMin and NewMax, set capped to true.
  Make sure NewMin is smaller than NewMax if you're using this. If you need an inverse proportion, try swapping OldMin and OldMax.
 */

shortcuts.convertRange = function(OldMin, OldMax, OldValue, NewMin, NewMax, capped) {
  var NewRange, NewValue, OldRange;
  OldRange = OldMax - OldMin;
  NewRange = NewMax - NewMin;
  NewValue = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin;
  if (capped) {
    if (NewValue > NewMax) {
      return NewMax;
    } else if (NewValue < NewMin) {
      return NewMin;
    } else {
      return NewValue;
    }
  } else {
    return NewValue;
  }
};


/*
  ORIGINAL FRAME

  Stores the initial location and size of a layer in the "originalFrame" attribute, so you can revert to it later on.

  Example:
  The x coordinate of MyLayer is initially 400 (from the PSD)

  ```MyLayer.x = 200; // now we set it to 200.
  MyLayer.x = MyLayer.originalFrame.x // now we set it back to its original value, 400.```
 */

shortcuts.saveOriginalFrame = function(layer) {
  return layer.originalFrame = layer.frame;
};


/*
  SHORTHAND HOVER SYNTAX

  Quickly define functions that should run when I hover over a layer, and hover out.

  Example:
  `MyLayer.hover(function() { OtherLayer.show() }, function() { OtherLayer.hide() });`
 */

Layer.prototype.hover = function(enterFunction, leaveFunction) {
  this.on('mouseenter', enterFunction);
  return this.on('mouseleave', leaveFunction);
};


/*
  SHORTHAND TAP SYNTAX

  Instead of `MyLayer.on(Events.TouchEnd, handler)`, use `MyLayer.tap(handler)`
 */

Layer.prototype.tap = function(handler) {
  return this.on(Events.TouchEnd, handler);
};


/*
  SHORTHAND CLICK SYNTAX

  Instead of `MyLayer.on(Events.Click, handler)`, use `MyLayer.click(handler)`
 */

Layer.prototype.click = function(handler) {
  return this.on(Events.Click, handler);
};


/*
  SHORTHAND ANIMATION SYNTAX

  A shorter animation syntax that mirrors the jQuery syntax:
  layer.animate(properties, [time], [curve], [callback])

  All parameters except properties are optional and can be omitted.

  Old:
  ```MyLayer.animate({
    properties: {
      x: 500
    },
    time: 500,
    curve: 'bezier-curve'
  })```

  New:
  ```MyLayer.animateTo({
    x: 500
  })```

  Optionally (with 1000ms duration and spring):
    ```MyLayer.animateTo({
    x: 500
  }, 1000, "spring(100,10,0)")
 */

Layer.prototype.animateTo = function(properties, first, second, third) {
  var callback, curve, thisLayer, time;
  thisLayer = this;
  time = curve = callback = null;
  if (typeof first === "number") {
    time = first;
    if (typeof second === "string") {
      curve = second;
      callback = third;
    }
    if (typeof second === "function") {
      callback = second;
    }
  } else if (typeof first === "string") {
    curve = first;
    if (typeof second === "function") {
      callback = second;
    }
  } else if (typeof first === "function") {
    callback = first;
  }
  if ((time != null) && (curve == null)) {
    curve = 'bezier-curve';
  }
  if (curve == null) {
    curve = Framer.Defaults.Animation.curve;
  }
  if (time == null) {
    time = Framer.Defaults.Animation.time;
  }
  thisLayer.animationTo = new Animation({
    layer: thisLayer,
    properties: properties,
    curve: curve,
    time: time
  });
  thisLayer.animationTo.on('start', function() {
    return thisLayer.isAnimating = true;
  });
  thisLayer.animationTo.on('end', function() {
    thisLayer.isAnimating = null;
    if (callback != null) {
      return callback();
    }
  });
  return thisLayer.animationTo.start();
};


/*
  ANIMATE MOBILE LAYERS IN AND OUT OF THE VIEWPORT

  Shorthand syntax for animating layers in and out of the viewport. Assumes that the layer you are animating is a whole screen and has the same dimensions as your container.

  Enable the device preview in Framer Studio to use this – it lets this script figure out what the bounds of your screen are.

  Example:
  * `MyLayer.slideToLeft()` will animate the layer **to** the left corner of the screen (from its current position)

  * `MyLayer.slideFromLeft()` will animate the layer into the viewport **from** the left corner (from x=-width)

  Configuration:
  * (By default we use a spring curve that approximates iOS. To use a time duration, change the curve to bezier-curve.)
  * Framer.Defaults.SlideAnimation.time
  * Framer.Defaults.SlideAnimation.curve


  How to read the configuration:
  ```slideFromLeft:
    property: "x"     // animate along the X axis
    factor: "width"
    from: -1          // start value: outside the left corner ( x = -width_phone )
    to: 0             // end value: inside the left corner ( x = width_layer )
  ```
 */

shortcuts.slideAnimations = {
  slideFromLeft: {
    property: "x",
    factor: "width",
    from: -1,
    to: 0
  },
  slideToLeft: {
    property: "x",
    factor: "width",
    to: -1
  },
  slideFromRight: {
    property: "x",
    factor: "width",
    from: 1,
    to: 0
  },
  slideToRight: {
    property: "x",
    factor: "width",
    to: 1
  },
  slideFromTop: {
    property: "y",
    factor: "height",
    from: -1,
    to: 0
  },
  slideToTop: {
    property: "y",
    factor: "height",
    to: -1
  },
  slideFromBottom: {
    property: "y",
    factor: "height",
    from: 1,
    to: 0
  },
  slideToBottom: {
    property: "y",
    factor: "height",
    to: 1
  }
};

_.each(shortcuts.slideAnimations, function(opts, name) {
  return Layer.prototype[name] = function(time) {
    var _animationConfig, _curve, _factor, _phone, _property, _time, err, ref, ref1;
    _phone = (ref = Framer.Device) != null ? (ref1 = ref.screen) != null ? ref1.frame : void 0 : void 0;
    if (!_phone) {
      err = "Please select a device preview in Framer Studio to use the slide preset animations.";
      print(err);
      console.log(err);
      return;
    }
    _property = opts.property;
    _factor = _phone[opts.factor];
    if (opts.from != null) {
      this[_property] = opts.from * _factor;
    }
    _animationConfig = {};
    _animationConfig[_property] = opts.to * _factor;
    if (time) {
      _time = time;
      _curve = "bezier-curve";
    } else {
      _time = Framer.Defaults.SlideAnimation.time;
      _curve = Framer.Defaults.SlideAnimation.curve;
    }
    return this.animate({
      properties: _animationConfig,
      time: _time,
      curve: _curve
    });
  };
});


/*
  EASY FADE IN / FADE OUT

  .show() and .hide() are shortcuts to affect opacity and pointer events. This is essentially the same as hiding with `visible = false` but can be animated.

  .fadeIn() and .fadeOut() are shortcuts to fade in a hidden layer, or fade out a visible layer.

  These shortcuts work on individual layer objects as well as an array of layers.

  Example:
  * `MyLayer.fadeIn()` will fade in MyLayer using default timing.
  * `[MyLayer, OtherLayer].fadeOut(4)` will fade out both MyLayer and OtherLayer over 4 seconds.

  To customize the fade animation, change the variables time and curve inside `Framer.Defaults.FadeAnimation`.
 */

Layer.prototype.show = function() {
  this.opacity = 1;
  this.style.pointerEvents = 'auto';
  return this;
};

Layer.prototype.hide = function() {
  this.opacity = 0;
  this.style.pointerEvents = 'none';
  return this;
};

Layer.prototype.fadeIn = function(time) {
  if (time == null) {
    time = Framer.Defaults.FadeAnimation.time;
  }
  if (this.opacity === 1) {
    return;
  }
  if (!this.visible) {
    this.opacity = 0;
    this.visible = true;
  }
  return this.animateTo({
    opacity: 1
  }, time, Framer.Defaults.FadeAnimation.curve);
};

Layer.prototype.fadeOut = function(time) {
  var that;
  if (time == null) {
    time = Framer.Defaults.FadeAnimation.time;
  }
  if (this.opacity === 0) {
    return;
  }
  that = this;
  return this.animateTo({
    opacity: 0
  }, time, Framer.Defaults.FadeAnimation.curve, function() {
    return that.style.pointerEvents = 'none';
  });
};

_.each(['show', 'hide', 'fadeIn', 'fadeOut'], function(fnString) {
  return Object.defineProperty(Array.prototype, fnString, {
    enumerable: false,
    value: function(time) {
      _.each(this, function(layer) {
        if (layer instanceof Layer) {
          return Layer.prototype[fnString].call(layer, time);
        }
      });
      return this;
    }
  });
});


/*
  EASY HOVER AND TOUCH/CLICK STATES FOR LAYERS

  By naming your layer hierarchy in the following way, you can automatically have your layers react to hovers, clicks or taps.

  Button_touchable
  - Button_default (default state)
  - Button_down (touch/click state)
  - Button_hover (hover)
 */

shortcuts.initializeTouchStates = function(layer) {
  var _default, _down, _hover, hitTarget;
  _default = layer.getChild('default');
  if (layer.name.toLowerCase().indexOf('touchable') && _default) {
    if (!Framer.Utils.isMobile()) {
      _hover = layer.getChild('hover');
    }
    _down = layer.getChild('down');
    if (_hover != null) {
      _hover.hide();
    }
    if (_down != null) {
      _down.hide();
    }
    if (_hover || _down) {
      hitTarget = new Layer({
        background: 'transparent',
        frame: _default.frame
      });
      hitTarget.superLayer = layer;
      hitTarget.bringToFront();
    }
    if (_hover) {
      layer.hover(function() {
        _default.hide();
        return _hover.show();
      }, function() {
        _default.show();
        return _hover.hide();
      });
    }
    if (_down) {
      layer.on(Events.TouchStart, function() {
        _default.hide();
        if (_hover != null) {
          _hover.hide();
        }
        return _down.show();
      });
      return layer.on(Events.TouchEnd, function() {
        _down.hide();
        if (_hover) {
          return _hover.show();
        } else {
          return _default.show();
        }
      });
    }
  }
};

_.extend(exports, shortcuts);



},{}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYnJpYW5hcm1zdHJvbmcvR2l0aHViL0Nhbm9weVByb3RvdHlwZXMvQ2Fub3B5SG9tZS5mcmFtZXIvbW9kdWxlcy9DQ09BcHBCYXIuY29mZmVlIiwiL1VzZXJzL2JyaWFuYXJtc3Ryb25nL0dpdGh1Yi9DYW5vcHlQcm90b3R5cGVzL0Nhbm9weUhvbWUuZnJhbWVyL21vZHVsZXMvQ0NPU2Nyb2xsVmlldy5jb2ZmZWUiLCIvVXNlcnMvYnJpYW5hcm1zdHJvbmcvR2l0aHViL0Nhbm9weVByb3RvdHlwZXMvQ2Fub3B5SG9tZS5mcmFtZXIvbW9kdWxlcy9DQ09TdHlsZXNoZWV0LmNvZmZlZSIsIi9Vc2Vycy9icmlhbmFybXN0cm9uZy9HaXRodWIvQ2Fub3B5UHJvdG90eXBlcy9DYW5vcHlIb21lLmZyYW1lci9tb2R1bGVzL0ZCU2hvcnRjdXRzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ01BLElBQUE7NkJBQUE7O0FBQUEsSUFBTyxDQUFBO0FBQ04sK0JBQUEsQ0FBQTs7QUFBYSxFQUFBLG1CQUFDLE9BQUQsR0FBQTtBQUNaLFFBQUEseUJBQUE7O01BRGEsVUFBVTtLQUN2QjtBQUFBLElBQUEsMkNBQU0sT0FBTixDQUFBLENBQUE7QUFBQSxJQUVBLFNBQUEsR0FDQztBQUFBLE1BQUEsY0FBQSxFQUFnQixFQUFoQjtBQUFBLE1BQ0EsbUJBQUEsRUFBcUIsR0FEckI7QUFBQSxNQUVBLGNBQUEsRUFBZ0IsR0FGaEI7S0FIRCxDQUFBO0FBT0EsSUFBQSxJQUFHLE9BQU8sQ0FBQyxrQkFBUixLQUE4QixPQUFqQztBQUNDLE1BQUEsY0FBQSxHQUFpQixzQ0FBakIsQ0FERDtLQUFBLE1BQUE7QUFHQyxNQUFBLGNBQUEsR0FBaUIsc0NBQWpCLENBSEQ7S0FQQTtBQUFBLElBWUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxNQUFN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QUFBLEtBQUssQ0FBQyxLQUFOLENBQVksU0FBQSxHQUFBO0FBQ1YsUUFBQSxRQUFRLENBQUMsSUFBVCxDQUFBLENBQUEsQ0FBQTtlQUNBLE1BQU0sQ0FBQyxJQUFQLENBQUEsRUFGVTtNQUFBLENBQVosRUFHRSxTQUFBLEdBQUE7QUFDQSxRQUFBLFFBQVEsQ0FBQyxJQUFULENBQUEsQ0FBQSxDQUFBO2VBQ0EsTUFBTSxDQUFDLElBQVAsQ0FBQSxFQUZBO01BQUEsQ0FIRixDQUFBLENBREY7S0FsQkE7QUEyQkEsSUFBQSxJQUFHLEtBQUg7QUFDRSxNQUFBLEtBQUssQ0FBQyxFQUFOLENBQVMsTUFBTSxDQUFDLFVBQWhCLEVBQTRCLFNBQUEsR0FBQTtBQUMxQixRQUFBLFFBQVEsQ0FBQyxJQUFULENBQUEsQ0FBQSxDQUFBOztVQUNBLE1BQU0sQ0FBRSxJQUFSLENBQUE7U0FEQTtlQUVBLEtBQUssQ0FBQyxJQUFOLENBQUEsRUFIMEI7TUFBQSxDQUE1QixDQUFBLENBQUE7YUFLQSxLQUFLLENBQUMsRUFBTixDQUFTLE1BQU0sQ0FBQyxRQUFoQixFQUEwQixTQUFBLEdBQUE7QUFDeEIsUUFBQSxLQUFLLENBQUMsSUFBTixDQUFBLENBQUEsQ0FBQTtBQUVBLFFBQUEsSUFBRyxNQUFIO2lCQUVFLE1BQU0sQ0FBQyxJQUFQLENBQUEsRUFGRjtTQUFBLE1BQUE7aUJBSUUsUUFBUSxDQUFDLElBQVQsQ0FBQSxFQUpGO1NBSHdCO01BQUEsQ0FBMUIsRUFORjtLQTdCRjtHQUhnQztBQUFBLENBemJsQyxDQUFBOztBQUFBLENBeWVDLENBQUMsTUFBRixDQUFTLE9BQVQsRUFBa0IsU0FBbEIsQ0F6ZUEsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIjIEFkZCB0aGUgZm9sb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby5cbiMgbW9kdWxlID0gcmVxdWlyZSBcIm1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBtb2R1bGUubXlGdW5jKCkgb3IgbW9kdWxlLm15VmFyXG5cbiMgQ0xBU1M6IEFwcEJhclxuIyBDcmVhdGVzIGFuIGlPUyBhcHAgYmFyXG5jbGFzcyBAQ0NPQXBwQmFyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0Y29uc3RhbnRzID1cblx0XHRcdG5hdl9iYXJfaGVpZ2h0OiA5OFxuXHRcdFx0cHJvZHVjdF9jZWxsX2hlaWdodDogNzIwXG5cdFx0XHRhcHBfYmFyX2hlaWdodDogMTI4XG5cblx0XHRpZiBvcHRpb25zLnN0YXR1c0JhclRleHRDb2xvciA9PSBcImJsYWNrXCJcblx0XHRcdHN0YXR1c0JhckltYWdlID0gJ2ltYWdlcy9DQ09BcHBCYXIvU3RhdHVzQmFyLUJsYWNrLnBuZydcblx0XHRlbHNlXG5cdFx0XHRzdGF0dXNCYXJJbWFnZSA9ICdpbWFnZXMvQ0NPQXBwQmFyL1N0YXR1c0Jhci1XaGl0ZS5wbmcnXG5cblx0XHRAd2lkdGggPSBGcmFtZXIuRGV2aWNlLnNjcmVlbi53aWR0aFxuXHRcdEBoZWlnaHQgPSBjb25zdGFudHMuYXBwX2Jhcl9oZWlnaHRcblx0XHRAYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdEBzdGF0dXNCYXIgPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdGhlaWdodDogNDRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy5zdGF0dXNCYXJDb2xvciB8fCBcInRyYW5zcGFyZW50XCJcblx0XHRcdHN1cGVyTGF5ZXI6IEBcblxuXHRcdEBzdGF0dXNCYXJJbWFnZSA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0aGVpZ2h0OiBAc3RhdHVzQmFyLmhlaWdodFxuXHRcdFx0aW1hZ2U6IHN0YXR1c0JhckltYWdlXG5cdFx0XHRzdXBlckxheWVyOiBAc3RhdHVzQmFyXG5cblx0XHRAYXBwQmFyQ29udGFpbmVyID0gbmV3IExheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHk6IEBzdGF0dXNCYXIuaGVpZ2h0XG5cdFx0XHR3aWR0aDogQHN0YXR1c0Jhci53aWR0aFxuXHRcdFx0aGVpZ2h0OiBAaGVpZ2h0IC0gQHN0YXR1c0Jhci5oZWlnaHRcblx0XHRcdHN1cGVyTGF5ZXI6IEBcblxuXHRcdEB2aWV3TmFtZSA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0aGVpZ2h0OiAxNDBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0c3VwZXJMYXllcjogQGFwcEJhckNvbnRhaW5lclxuXHRcdEB2aWV3TmFtZS5odG1sID0gb3B0aW9ucy52aWV3TmFtZSB8fCAnTmFtZSB0aGlzJ1xuXHRcdEB2aWV3TmFtZS5zdHlsZS5mb250RmFtaWx5ID0gb3B0aW9ucy5mb250RmFtaWx5IHx8ICdIZWx2ZXRpY2EgTmV1ZSdcblx0XHRAdmlld05hbWUuc3R5bGUgPSB7XG5cdFx0XHQnZm9udC1zaXplJzonNDBweCcsXG5cdFx0XHQnY29sb3InOiAnd2hpdGUnXG5cdFx0XHQndGV4dC1hbGlnbic6ICdjZW50ZXInXG5cdFx0XHQncGFkZGluZy10b3AnOiAnMjBweCdcblx0XHR9XG5cbmV4cG9ydHMuQ0NPQXBwQmFyXG4iLCJNYXRoLmNsYW1wID0gKG4sIG1pbiwgbWF4KSAtPlxuICByZXR1cm4gTWF0aC5tYXgobWluLCBNYXRoLm1pbihtYXgsIG4pKVxuXG5jbGFzcyBAQ0NPRHJhZ2dhYmxlU2Nyb2xsVmlldyBleHRlbmRzIExheWVyXG4gICMgT3B0aW9ucyBhcmU6XG4gICMgLSBjb250ZW50V2lkdGg6IHdpZHRoIG9mIGNvbnRlbnRcbiAgIyAtIGNvbnRlbnRIZWlnaHQ6IGhlaWdodCBvZiBjb250ZW50XG4gICMgLSB2ZXJ0aWNhbDogYm9vbGVhblxuICAjIC0gaG9yaXpvbnRhbDogYm9vbGVhblxuXG4gIGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cbiAgICBzdXBlcihvcHRpb25zKVxuXG4gICAgQGNvbnRlbnRXaWR0aCA9IG9wdGlvbnMuY29udGVudFdpZHRoIHx8IEZyYW1lci5EZXZpY2Uuc2NyZWVuLndpZHRoXG4gICAgQGNvbnRlbnRIZWlnaHQgPSBvcHRpb25zLmNvbnRlbnRIZWlnaHQgfHwgRnJhbWVyLkRldmljZS5zY3JlZW4uaGVpZ2h0XG5cbiAgICBAX2RpcmVjdGlvbiA9IHt9XG4gICAgQF92ZXJ0aWNhbCA9IG9wdGlvbnMudmVydGljYWwgfHwgZmFsc2VcbiAgICBAX2hvcml6b250YWwgPSBvcHRpb25zLmhvcml6b250YWwgfHwgZmFsc2VcblxuICAgIEB4TWF4ID0gMFxuICAgIEB4TWluID0gLShAY29udGVudFdpZHRoIC0gQHdpZHRoKVxuICAgIEB5TWF4ID0gMFxuICAgIEB5TWluID0gLShAY29udGVudEhlaWdodCAtIEBoZWlnaHQpXG5cbiAgICBAYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG4gICAgQGNvbnRlbnQgPSBuZXcgTGF5ZXJcbiAgICAgIHN1cGVyTGF5ZXI6IEBcbiAgICAgIGJhY2tncm91bmRDb2xvcjogbnVsbFxuICAgICAgd2lkdGg6IEBjb250ZW50V2lkdGhcbiAgICAgIGhlaWdodDogQGNvbnRlbnRIZWlnaHRcbiAgICBAY29udGVudC5kcmFnZ2FibGUuRW5hYmxlZCA9IHRydWVcblxuICAgIEBjb250ZW50Lm9uIEV2ZW50cy5EcmFnU3RhcnQsIEBkcmFnU3RhcnRcbiAgICBAY29udGVudC5vbiBFdmVudHMuRHJhZ01vdmUsIEBkcmFnTW92ZVxuICAgIEBjb250ZW50Lm9uIEV2ZW50cy5EcmFnRW5kLCBAZHJhZ0VuZFxuXG4gIGRyYWdTdGFydDogKGUsIGxheWVyKSA9PlxuICAgIEBhbmltYXRlU3RvcCgpXG4gICAgQG1vbWVudHVtPy5zdG9wKClcbiAgICBAZW1pdChFdmVudHMuRHJhZ1N0YXJ0LCBlLCBsYXllcilcblxuICBkcmFnTW92ZTogKGUsIGxheWVyKSA9PlxuICAgIGlmIEBfaG9yaXpvbnRhbFxuICAgICAgaWYgbGF5ZXIueCA+IDBcbiAgICAgICAgQGNvbnRlbnQuZHJhZ2dhYmxlLnNwZWVkWCA9IE1hdGguY2xhbXAoVXRpbHMubWFwUmFuZ2UobGF5ZXIueCwgMTAwLCAwLCAwLjUsIDEpLCAwLjUsIDEpXG4gICAgICBlbHNlIGlmIGxheWVyLnggPCBAeE1pblxuICAgICAgICAgIEBjb250ZW50LmRyYWdnYWJsZS5zcGVlZFggPSBNYXRoLmNsYW1wKFV0aWxzLm1hcFJhbmdlKGxheWVyLngsIEB4TWluIC0gMTAwLCBAeE1pbiwgMC41LCAxKSwgMC41LCAxKVxuICAgICAgZWxzZVxuICAgICAgICBAY29udGVudC5kcmFnZ2FibGUuc3BlZWRYID0gMVxuICAgIGVsc2VcbiAgICAgIEBjb250ZW50LmRyYWdnYWJsZS5zcGVlZFggPSAwXG5cbiAgICBpZiBAX3ZlcnRpY2FsXG4gICAgICBpZiBsYXllci55ID4gMFxuICAgICAgICBAY29udGVudC5kcmFnZ2FibGUuc3BlZWRZID0gTWF0aC5jbGFtcChVdGlscy5tYXBSYW5nZShsYXllci55LCAxMDAsIEB5TWF4LCAwLjUsIDEpLCAwLjUsIDEpXG4gICAgICBlbHNlIGlmIGxheWVyLnkgPCBAeU1pblxuICAgICAgICBAY29udGVudC5kcmFnZ2FibGUuc3BlZWRZID0gTWF0aC5jbGFtcChVdGlscy5tYXBSYW5nZShsYXllci55LCBAeU1pbiAtIDEwMCwgQHlNaW4sIDAuNSwgMSksIDAuNSwgMSlcbiAgICAgIGVsc2VcbiAgICAgICAgQGNvbnRlbnQuZHJhZ2dhYmxlLnNwZWVkWSA9IDFcbiAgICBlbHNlXG4gICAgICBAY29udGVudC5kcmFnZ2FibGUuc3BlZWRZID0gMFxuXG4gIGRyYWdFbmQ6IChlLCBsYXllcikgPT5cbiAgICBjb25zb2xlLmxvZyAnc3VwZXIgZHJhZ0VuZCdcbiAgICB2ZWxvY2l0eSA9IGxheWVyLmRyYWdnYWJsZS5jYWxjdWxhdGVWZWxvY2l0eSgpXG4gICAgaWYgTWF0aC5hYnModmVsb2NpdHkueCkgPCAuMSAmJiBNYXRoLmFicyh2ZWxvY2l0eS55KSA8IC4xXG4gICAgICB4ID0gTWF0aC5jbGFtcChsYXllci54LCBAeE1pbiwgMClcbiAgICAgIHkgPSBNYXRoLmNsYW1wKGxheWVyLnksIEB5TWluLCAwKVxuICAgICAgaWYgeCAhPSBsYXllci54IHx8IHkgIT0gbGF5ZXIueVxuICAgICAgICBAbW9tZW50dW0gPSBsYXllci5hbmltYXRlXG4gICAgICAgICAgcHJvcGVydGllczpcbiAgICAgICAgICAgIHg6IHhcbiAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICBjdXJ2ZTogXCJzcHJpbmdcIlxuICAgICAgICAgIGN1cnZlT3B0aW9uczpcbiAgICAgICAgICAgIGZyaWN0aW9uOiAxMDBcbiAgICAgICAgICB0aW1lOiAuMTVcbiAgICAgICAgQG1vbWVudHVtLm9uIEV2ZW50cy5BbmltYXRpb25FbmQsICgpID0+XG4gICAgICAgICAgQGVtaXQoRXZlbnRzLkRyYWdFbmQsIGUsIGxheWVyKVxuICAgICAgZWxzZVxuICAgICAgICBAZW1pdChFdmVudHMuRHJhZ0VuZCwgZSwgbGF5ZXIpXG4gICAgZWxzZVxuICAgICAgdG90YWxWZWxvY2l0eSA9IFV0aWxzLnBvaW50VG90YWwgVXRpbHMucG9pbnRBYnMgdmVsb2NpdHlcbiAgICAgIEBtb21lbnR1bSA9IEBjb250ZW50LmFuaW1hdGVcbiAgICAgICAgcHJvcGVydGllczpcbiAgICAgICAgICB4OiBNYXRoLmNsYW1wKHBhcnNlSW50KGxheWVyLnggKyAodmVsb2NpdHkueCAqIDUwMCkpLCBAeE1pbiwgMClcbiAgICAgICAgICB5OiBNYXRoLmNsYW1wKHBhcnNlSW50KGxheWVyLnkgKyAodmVsb2NpdHkueSAqIDIwMCkpLCBAeU1pbiwgMClcbiAgICAgICAgY3VydmU6IFwic3ByaW5nXCJcbiAgICAgICAgY3VydmVPcHRpb25zOlxuICAgICAgICAgIGZyaWN0aW9uOiAxMDBcbiAgICAgIEBtb21lbnR1bS5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCAoKSA9PlxuICAgICAgICBAZW1pdChFdmVudHMuRHJhZ0VuZCwgZSwgbGF5ZXIpXG5cbmV4cG9ydHMuQ0NPRHJhZ2dhYmxlU2Nyb2xsVmlld1xuIiwiY2xhc3MgQENDT1N0eWxlc2hlZXRcblx0Y29uc3RydWN0b3I6ICh1cmwpLT5cblx0XHR3ZiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxuXHRcdHdmLmhyZWYgPSB1cmxcblx0XHR3Zi5yZWwgPSAnc3R5bGVzaGVldCdcblx0XHRsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpbmsnKVswXVxuXHRcdGwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod2YsIGwpXG5cbmV4cG9ydHMuQ0NPU3R5bGVzaGVldFxuIiwiIyMjXG4gIFNob3J0Y3V0cyBmb3IgRnJhbWVyIDEuMFxuICBodHRwOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9zaG9ydGN1dHMtZm9yLWZyYW1lclxuXG4gIENvcHlyaWdodCAoYykgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuICBSZWFkbWU6XG4gIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9zaG9ydGN1dHMtZm9yLWZyYW1lclxuXG4gIExpY2Vuc2U6XG4gIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9zaG9ydGN1dHMtZm9yLWZyYW1lci9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4jIyNcblxuXG5cblxuIyMjXG4gIENPTkZJR1VSQVRJT05cbiMjI1xuXG5zaG9ydGN1dHMgPSB7fVxuXG5GcmFtZXIuRGVmYXVsdHMuRmFkZUFuaW1hdGlvbiA9XG4gIGN1cnZlOiBcImJlemllci1jdXJ2ZVwiXG4gIHRpbWU6IDAuMlxuXG5GcmFtZXIuRGVmYXVsdHMuU2xpZGVBbmltYXRpb24gPVxuICBjdXJ2ZTogXCJzcHJpbmcoNDAwLDQwLDApXCJcblxuXG5cbiMjI1xuICBMT09QIE9OIEVWRVJZIExBWUVSXG5cbiAgU2hvcnRoYW5kIGZvciBhcHBseWluZyBhIGZ1bmN0aW9uIHRvIGV2ZXJ5IGxheWVyIGluIHRoZSBkb2N1bWVudC5cblxuICBFeGFtcGxlOlxuICBgYGBzaG9ydGN1dHMuZXZlcnlMYXllcihmdW5jdGlvbihsYXllcikge1xuICAgIGxheWVyLnZpc2libGUgPSBmYWxzZTtcbiAgfSk7YGBgXG4jIyNcbnNob3J0Y3V0cy5ldmVyeUxheWVyID0gKGZuKSAtPlxuICBmb3IgbGF5ZXJOYW1lIG9mIHdpbmRvdy5MYXllcnNcbiAgICBfbGF5ZXIgPSB3aW5kb3cuTGF5ZXJzW2xheWVyTmFtZV1cbiAgICBmbiBfbGF5ZXJcblxuXG4jIyNcbiAgU0hPUlRIQU5EIEZPUiBBQ0NFU1NJTkcgTEFZRVJTXG5cbiAgQ29udmVydCBlYWNoIGxheWVyIGNvbWluZyBmcm9tIHRoZSBleHBvcnRlciBpbnRvIGEgSmF2YXNjcmlwdCBvYmplY3QgZm9yIHNob3J0aGFuZCBhY2Nlc3MuXG5cbiAgVGhpcyBoYXMgdG8gYmUgY2FsbGVkIG1hbnVhbGx5IGluIEZyYW1lcjMgYWZ0ZXIgeW91J3ZlIHJhbiB0aGUgaW1wb3J0ZXIuXG5cbiAgbXlMYXllcnMgPSBGcmFtZXIuSW1wb3J0ZXIubG9hZChcIi4uLlwiKVxuICBzaG9ydGN1dHMuaW5pdGlhbGl6ZShteUxheWVycylcblxuICBJZiB5b3UgaGF2ZSBhIGxheWVyIGluIHlvdXIgUFNEL1NrZXRjaCBjYWxsZWQgXCJOZXdzRmVlZFwiLCB0aGlzIHdpbGwgY3JlYXRlIGEgZ2xvYmFsIEphdmFzY3JpcHQgdmFyaWFibGUgY2FsbGVkIFwiTmV3c0ZlZWRcIiB0aGF0IHlvdSBjYW4gbWFuaXB1bGF0ZSB3aXRoIEZyYW1lci5cblxuICBFeGFtcGxlOlxuICBgTmV3c0ZlZWQudmlzaWJsZSA9IGZhbHNlO2BcblxuICBOb3RlczpcbiAgSmF2YXNjcmlwdCBoYXMgc29tZSBuYW1lcyByZXNlcnZlZCBmb3IgaW50ZXJuYWwgZnVuY3Rpb24gdGhhdCB5b3UgY2FuJ3Qgb3ZlcnJpZGUgKGZvciBleC4gKVxuICBJZiB5b3UgY2FsbCBpbml0aWFsaXplIHdpdGhvdXQgYW55dGhpbmcsIGl0IHdpbGwgdXNlIGFsbCBjdXJyZW50bHkgYXZhaWxhYmxlIGxheWVycy5cbiMjI1xuc2hvcnRjdXRzLmluaXRpYWxpemUgPSAobGF5ZXJzKSAtPlxuXG4gIGxheWVyID0gRnJhbWVyLkN1cnJlbnRDb250ZXh0Ll9sYXllckxpc3QgaWYgbm90IGxheWVyc1xuXG4gIHdpbmRvdy5MYXllcnMgPSBsYXllcnNcblxuICBzaG9ydGN1dHMuZXZlcnlMYXllciAobGF5ZXIpIC0+XG4gICAgc2FuaXRpemVkTGF5ZXJOYW1lID0gbGF5ZXIubmFtZS5yZXBsYWNlKC9bLSshPzoqXFxbXFxdXFwoXFwpXFwvXS9nLCAnJykudHJpbSgpLnJlcGxhY2UoL1xccy9nLCAnXycpXG4gICAgd2luZG93W3Nhbml0aXplZExheWVyTmFtZV0gPSBsYXllclxuICAgIHNob3J0Y3V0cy5zYXZlT3JpZ2luYWxGcmFtZSBsYXllclxuICAgIHNob3J0Y3V0cy5pbml0aWFsaXplVG91Y2hTdGF0ZXMgbGF5ZXJcblxuXG4jIyNcbiAgRklORCBDSElMRCBMQVlFUlMgQlkgTkFNRVxuXG4gIFJldHJpZXZlcyBzdWJMYXllcnMgb2Ygc2VsZWN0ZWQgbGF5ZXIgdGhhdCBoYXZlIGEgbWF0Y2hpbmcgbmFtZS5cblxuICBnZXRDaGlsZDogcmV0dXJuIHRoZSBmaXJzdCBzdWJsYXllciB3aG9zZSBuYW1lIGluY2x1ZGVzIHRoZSBnaXZlbiBzdHJpbmdcbiAgZ2V0Q2hpbGRyZW46IHJldHVybiBhbGwgc3ViTGF5ZXJzIHRoYXQgbWF0Y2hcblxuICBVc2VmdWwgd2hlbiBlZy4gaXRlcmF0aW5nIG92ZXIgdGFibGUgY2VsbHMuIFVzZSBnZXRDaGlsZCB0byBhY2Nlc3MgdGhlIGJ1dHRvbiBmb3VuZCBpbiBlYWNoIGNlbGwuIFRoaXMgaXMgKipjYXNlIGluc2Vuc2l0aXZlKiouXG5cbiAgRXhhbXBsZTpcbiAgYHRvcExheWVyID0gTmV3c0ZlZWQuZ2V0Q2hpbGQoXCJUb3BcIilgIExvb2tzIGZvciBsYXllcnMgd2hvc2UgbmFtZSBtYXRjaGVzIFRvcC4gUmV0dXJucyB0aGUgZmlyc3QgbWF0Y2hpbmcgbGF5ZXIuXG5cbiAgYGNoaWxkTGF5ZXJzID0gVGFibGUuZ2V0Q2hpbGRyZW4oXCJDZWxsXCIpYCBSZXR1cm5zIGFsbCBjaGlsZHJlbiB3aG9zZSBuYW1lIG1hdGNoIENlbGwgaW4gYW4gYXJyYXkuXG4jIyNcbkxheWVyOjpnZXRDaGlsZCA9IChuZWVkbGUsIHJlY3Vyc2l2ZSA9IGZhbHNlKSAtPlxuICAjIFNlYXJjaCBkaXJlY3QgY2hpbGRyZW5cbiAgZm9yIHN1YkxheWVyIGluIEBzdWJMYXllcnNcbiAgICByZXR1cm4gc3ViTGF5ZXIgaWYgc3ViTGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YobmVlZGxlLnRvTG93ZXJDYXNlKCkpIGlzbnQgLTEgXG5cbiAgIyBSZWN1cnNpdmVseSBzZWFyY2ggY2hpbGRyZW4gb2YgY2hpbGRyZW5cbiAgaWYgcmVjdXJzaXZlXG4gICAgZm9yIHN1YkxheWVyIGluIEBzdWJMYXllcnNcbiAgICAgIHJldHVybiBzdWJMYXllci5nZXRDaGlsZChuZWVkbGUsIHJlY3Vyc2l2ZSkgaWYgc3ViTGF5ZXIuZ2V0Q2hpbGQobmVlZGxlLCByZWN1cnNpdmUpIFxuXG5cbkxheWVyOjpnZXRDaGlsZHJlbiA9IChuZWVkbGUsIHJlY3Vyc2l2ZSA9IGZhbHNlKSAtPlxuICByZXN1bHRzID0gW11cblxuICBpZiByZWN1cnNpdmVcbiAgICBmb3Igc3ViTGF5ZXIgaW4gQHN1YkxheWVyc1xuICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0IHN1YkxheWVyLmdldENoaWxkcmVuKG5lZWRsZSwgcmVjdXJzaXZlKVxuICAgIHJlc3VsdHMucHVzaCBAIGlmIEBuYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUudG9Mb3dlckNhc2UoKSkgaXNudCAtMVxuICAgIHJldHVybiByZXN1bHRzXG5cbiAgZWxzZVxuICAgIGZvciBzdWJMYXllciBpbiBAc3ViTGF5ZXJzXG4gICAgICBpZiBzdWJMYXllci5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUudG9Mb3dlckNhc2UoKSkgaXNudCAtMSBcbiAgICAgICAgcmVzdWx0cy5wdXNoIHN1YkxheWVyIFxuICAgIHJldHVybiByZXN1bHRzXG5cblxuXG4jIyNcbiAgQ09OVkVSVCBBIE5VTUJFUiBSQU5HRSBUTyBBTk9USEVSXG5cbiAgQ29udmVydHMgYSBudW1iZXIgd2l0aGluIG9uZSByYW5nZSB0byBhbm90aGVyIHJhbmdlXG5cbiAgRXhhbXBsZTpcbiAgV2Ugd2FudCB0byBtYXAgdGhlIG9wYWNpdHkgb2YgYSBsYXllciB0byBpdHMgeCBsb2NhdGlvbi5cblxuICBUaGUgb3BhY2l0eSB3aWxsIGJlIDAgaWYgdGhlIFggY29vcmRpbmF0ZSBpcyAwLCBhbmQgaXQgd2lsbCBiZSAxIGlmIHRoZSBYIGNvb3JkaW5hdGUgaXMgNjQwLiBBbGwgdGhlIFggY29vcmRpbmF0ZXMgaW4gYmV0d2VlbiB3aWxsIHJlc3VsdCBpbiBpbnRlcm1lZGlhdGUgdmFsdWVzIGJldHdlZW4gMCBhbmQgMS5cblxuICBgbXlMYXllci5vcGFjaXR5ID0gY29udmVydFJhbmdlKDAsIDY0MCwgbXlMYXllci54LCAwLCAxKWBcblxuICBCeSBkZWZhdWx0LCB0aGlzIHZhbHVlIG1pZ2h0IGJlIG91dHNpZGUgdGhlIGJvdW5kcyBvZiBOZXdNaW4gYW5kIE5ld01heCBpZiB0aGUgT2xkVmFsdWUgaXMgb3V0c2lkZSBPbGRNaW4gYW5kIE9sZE1heC4gSWYgeW91IHdhbnQgdG8gY2FwIHRoZSBmaW5hbCB2YWx1ZSB0byBOZXdNaW4gYW5kIE5ld01heCwgc2V0IGNhcHBlZCB0byB0cnVlLlxuICBNYWtlIHN1cmUgTmV3TWluIGlzIHNtYWxsZXIgdGhhbiBOZXdNYXggaWYgeW91J3JlIHVzaW5nIHRoaXMuIElmIHlvdSBuZWVkIGFuIGludmVyc2UgcHJvcG9ydGlvbiwgdHJ5IHN3YXBwaW5nIE9sZE1pbiBhbmQgT2xkTWF4LlxuIyMjXG5zaG9ydGN1dHMuY29udmVydFJhbmdlID0gKE9sZE1pbiwgT2xkTWF4LCBPbGRWYWx1ZSwgTmV3TWluLCBOZXdNYXgsIGNhcHBlZCkgLT5cbiAgT2xkUmFuZ2UgPSAoT2xkTWF4IC0gT2xkTWluKVxuICBOZXdSYW5nZSA9IChOZXdNYXggLSBOZXdNaW4pXG4gIE5ld1ZhbHVlID0gKCgoT2xkVmFsdWUgLSBPbGRNaW4pICogTmV3UmFuZ2UpIC8gT2xkUmFuZ2UpICsgTmV3TWluXG5cbiAgaWYgY2FwcGVkXG4gICAgaWYgTmV3VmFsdWUgPiBOZXdNYXhcbiAgICAgIE5ld01heFxuICAgIGVsc2UgaWYgTmV3VmFsdWUgPCBOZXdNaW5cbiAgICAgIE5ld01pblxuICAgIGVsc2VcbiAgICAgIE5ld1ZhbHVlXG4gIGVsc2VcbiAgICBOZXdWYWx1ZVxuXG5cbiMjI1xuICBPUklHSU5BTCBGUkFNRVxuXG4gIFN0b3JlcyB0aGUgaW5pdGlhbCBsb2NhdGlvbiBhbmQgc2l6ZSBvZiBhIGxheWVyIGluIHRoZSBcIm9yaWdpbmFsRnJhbWVcIiBhdHRyaWJ1dGUsIHNvIHlvdSBjYW4gcmV2ZXJ0IHRvIGl0IGxhdGVyIG9uLlxuXG4gIEV4YW1wbGU6XG4gIFRoZSB4IGNvb3JkaW5hdGUgb2YgTXlMYXllciBpcyBpbml0aWFsbHkgNDAwIChmcm9tIHRoZSBQU0QpXG5cbiAgYGBgTXlMYXllci54ID0gMjAwOyAvLyBub3cgd2Ugc2V0IGl0IHRvIDIwMC5cbiAgTXlMYXllci54ID0gTXlMYXllci5vcmlnaW5hbEZyYW1lLnggLy8gbm93IHdlIHNldCBpdCBiYWNrIHRvIGl0cyBvcmlnaW5hbCB2YWx1ZSwgNDAwLmBgYFxuIyMjXG5zaG9ydGN1dHMuc2F2ZU9yaWdpbmFsRnJhbWUgPSAobGF5ZXIpIC0+XG4gIGxheWVyLm9yaWdpbmFsRnJhbWUgPSBsYXllci5mcmFtZVxuXG4jIyNcbiAgU0hPUlRIQU5EIEhPVkVSIFNZTlRBWFxuXG4gIFF1aWNrbHkgZGVmaW5lIGZ1bmN0aW9ucyB0aGF0IHNob3VsZCBydW4gd2hlbiBJIGhvdmVyIG92ZXIgYSBsYXllciwgYW5kIGhvdmVyIG91dC5cblxuICBFeGFtcGxlOlxuICBgTXlMYXllci5ob3ZlcihmdW5jdGlvbigpIHsgT3RoZXJMYXllci5zaG93KCkgfSwgZnVuY3Rpb24oKSB7IE90aGVyTGF5ZXIuaGlkZSgpIH0pO2BcbiMjI1xuTGF5ZXI6OmhvdmVyID0gKGVudGVyRnVuY3Rpb24sIGxlYXZlRnVuY3Rpb24pIC0+XG4gIHRoaXMub24gJ21vdXNlZW50ZXInLCBlbnRlckZ1bmN0aW9uXG4gIHRoaXMub24gJ21vdXNlbGVhdmUnLCBsZWF2ZUZ1bmN0aW9uXG5cblxuIyMjXG4gIFNIT1JUSEFORCBUQVAgU1lOVEFYXG5cbiAgSW5zdGVhZCBvZiBgTXlMYXllci5vbihFdmVudHMuVG91Y2hFbmQsIGhhbmRsZXIpYCwgdXNlIGBNeUxheWVyLnRhcChoYW5kbGVyKWBcbiMjI1xuXG5MYXllcjo6dGFwID0gKGhhbmRsZXIpIC0+XG4gIHRoaXMub24gRXZlbnRzLlRvdWNoRW5kLCBoYW5kbGVyXG5cblxuIyMjXG4gIFNIT1JUSEFORCBDTElDSyBTWU5UQVhcblxuICBJbnN0ZWFkIG9mIGBNeUxheWVyLm9uKEV2ZW50cy5DbGljaywgaGFuZGxlcilgLCB1c2UgYE15TGF5ZXIuY2xpY2soaGFuZGxlcilgXG4jIyNcblxuTGF5ZXI6OmNsaWNrID0gKGhhbmRsZXIpIC0+XG4gIHRoaXMub24gRXZlbnRzLkNsaWNrLCBoYW5kbGVyXG5cblxuXG4jIyNcbiAgU0hPUlRIQU5EIEFOSU1BVElPTiBTWU5UQVhcblxuICBBIHNob3J0ZXIgYW5pbWF0aW9uIHN5bnRheCB0aGF0IG1pcnJvcnMgdGhlIGpRdWVyeSBzeW50YXg6XG4gIGxheWVyLmFuaW1hdGUocHJvcGVydGllcywgW3RpbWVdLCBbY3VydmVdLCBbY2FsbGJhY2tdKVxuXG4gIEFsbCBwYXJhbWV0ZXJzIGV4Y2VwdCBwcm9wZXJ0aWVzIGFyZSBvcHRpb25hbCBhbmQgY2FuIGJlIG9taXR0ZWQuXG5cbiAgT2xkOlxuICBgYGBNeUxheWVyLmFuaW1hdGUoe1xuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHg6IDUwMFxuICAgIH0sXG4gICAgdGltZTogNTAwLFxuICAgIGN1cnZlOiAnYmV6aWVyLWN1cnZlJ1xuICB9KWBgYFxuXG4gIE5ldzpcbiAgYGBgTXlMYXllci5hbmltYXRlVG8oe1xuICAgIHg6IDUwMFxuICB9KWBgYFxuXG4gIE9wdGlvbmFsbHkgKHdpdGggMTAwMG1zIGR1cmF0aW9uIGFuZCBzcHJpbmcpOlxuICAgIGBgYE15TGF5ZXIuYW5pbWF0ZVRvKHtcbiAgICB4OiA1MDBcbiAgfSwgMTAwMCwgXCJzcHJpbmcoMTAwLDEwLDApXCIpXG4jIyNcblxuXG5cbkxheWVyOjphbmltYXRlVG8gPSAocHJvcGVydGllcywgZmlyc3QsIHNlY29uZCwgdGhpcmQpIC0+XG4gIHRoaXNMYXllciA9IHRoaXNcbiAgdGltZSA9IGN1cnZlID0gY2FsbGJhY2sgPSBudWxsXG5cbiAgaWYgdHlwZW9mKGZpcnN0KSA9PSBcIm51bWJlclwiXG4gICAgdGltZSA9IGZpcnN0XG4gICAgaWYgdHlwZW9mKHNlY29uZCkgPT0gXCJzdHJpbmdcIlxuICAgICAgY3VydmUgPSBzZWNvbmRcbiAgICAgIGNhbGxiYWNrID0gdGhpcmRcbiAgICBjYWxsYmFjayA9IHNlY29uZCBpZiB0eXBlb2Yoc2Vjb25kKSA9PSBcImZ1bmN0aW9uXCJcbiAgZWxzZSBpZiB0eXBlb2YoZmlyc3QpID09IFwic3RyaW5nXCJcbiAgICBjdXJ2ZSA9IGZpcnN0XG4gICAgY2FsbGJhY2sgPSBzZWNvbmQgaWYgdHlwZW9mKHNlY29uZCkgPT0gXCJmdW5jdGlvblwiXG4gIGVsc2UgaWYgdHlwZW9mKGZpcnN0KSA9PSBcImZ1bmN0aW9uXCJcbiAgICBjYWxsYmFjayA9IGZpcnN0XG5cbiAgaWYgdGltZT8gJiYgIWN1cnZlP1xuICAgIGN1cnZlID0gJ2Jlemllci1jdXJ2ZSdcbiAgXG4gIGN1cnZlID0gRnJhbWVyLkRlZmF1bHRzLkFuaW1hdGlvbi5jdXJ2ZSBpZiAhY3VydmU/XG4gIHRpbWUgPSBGcmFtZXIuRGVmYXVsdHMuQW5pbWF0aW9uLnRpbWUgaWYgIXRpbWU/XG5cbiAgdGhpc0xheWVyLmFuaW1hdGlvblRvID0gbmV3IEFuaW1hdGlvblxuICAgIGxheWVyOiB0aGlzTGF5ZXJcbiAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzXG4gICAgY3VydmU6IGN1cnZlXG4gICAgdGltZTogdGltZVxuXG4gIHRoaXNMYXllci5hbmltYXRpb25Uby5vbiAnc3RhcnQnLCAtPlxuICAgIHRoaXNMYXllci5pc0FuaW1hdGluZyA9IHRydWVcblxuICB0aGlzTGF5ZXIuYW5pbWF0aW9uVG8ub24gJ2VuZCcsIC0+XG4gICAgdGhpc0xheWVyLmlzQW5pbWF0aW5nID0gbnVsbFxuICAgIGlmIGNhbGxiYWNrP1xuICAgICAgY2FsbGJhY2soKVxuXG4gIHRoaXNMYXllci5hbmltYXRpb25Uby5zdGFydCgpXG5cbiMjI1xuICBBTklNQVRFIE1PQklMRSBMQVlFUlMgSU4gQU5EIE9VVCBPRiBUSEUgVklFV1BPUlRcblxuICBTaG9ydGhhbmQgc3ludGF4IGZvciBhbmltYXRpbmcgbGF5ZXJzIGluIGFuZCBvdXQgb2YgdGhlIHZpZXdwb3J0LiBBc3N1bWVzIHRoYXQgdGhlIGxheWVyIHlvdSBhcmUgYW5pbWF0aW5nIGlzIGEgd2hvbGUgc2NyZWVuIGFuZCBoYXMgdGhlIHNhbWUgZGltZW5zaW9ucyBhcyB5b3VyIGNvbnRhaW5lci5cblxuICBFbmFibGUgdGhlIGRldmljZSBwcmV2aWV3IGluIEZyYW1lciBTdHVkaW8gdG8gdXNlIHRoaXMg4oCTwqBpdCBsZXRzIHRoaXMgc2NyaXB0IGZpZ3VyZSBvdXQgd2hhdCB0aGUgYm91bmRzIG9mIHlvdXIgc2NyZWVuIGFyZS5cblxuICBFeGFtcGxlOlxuICAqIGBNeUxheWVyLnNsaWRlVG9MZWZ0KClgIHdpbGwgYW5pbWF0ZSB0aGUgbGF5ZXIgKip0byoqIHRoZSBsZWZ0IGNvcm5lciBvZiB0aGUgc2NyZWVuIChmcm9tIGl0cyBjdXJyZW50IHBvc2l0aW9uKVxuXG4gICogYE15TGF5ZXIuc2xpZGVGcm9tTGVmdCgpYCB3aWxsIGFuaW1hdGUgdGhlIGxheWVyIGludG8gdGhlIHZpZXdwb3J0ICoqZnJvbSoqIHRoZSBsZWZ0IGNvcm5lciAoZnJvbSB4PS13aWR0aClcblxuICBDb25maWd1cmF0aW9uOlxuICAqIChCeSBkZWZhdWx0IHdlIHVzZSBhIHNwcmluZyBjdXJ2ZSB0aGF0IGFwcHJveGltYXRlcyBpT1MuIFRvIHVzZSBhIHRpbWUgZHVyYXRpb24sIGNoYW5nZSB0aGUgY3VydmUgdG8gYmV6aWVyLWN1cnZlLilcbiAgKiBGcmFtZXIuRGVmYXVsdHMuU2xpZGVBbmltYXRpb24udGltZVxuICAqIEZyYW1lci5EZWZhdWx0cy5TbGlkZUFuaW1hdGlvbi5jdXJ2ZVxuXG5cbiAgSG93IHRvIHJlYWQgdGhlIGNvbmZpZ3VyYXRpb246XG4gIGBgYHNsaWRlRnJvbUxlZnQ6XG4gICAgcHJvcGVydHk6IFwieFwiICAgICAvLyBhbmltYXRlIGFsb25nIHRoZSBYIGF4aXNcbiAgICBmYWN0b3I6IFwid2lkdGhcIlxuICAgIGZyb206IC0xICAgICAgICAgIC8vIHN0YXJ0IHZhbHVlOiBvdXRzaWRlIHRoZSBsZWZ0IGNvcm5lciAoIHggPSAtd2lkdGhfcGhvbmUgKVxuICAgIHRvOiAwICAgICAgICAgICAgIC8vIGVuZCB2YWx1ZTogaW5zaWRlIHRoZSBsZWZ0IGNvcm5lciAoIHggPSB3aWR0aF9sYXllciApXG4gIGBgYFxuIyMjXG5cblxuc2hvcnRjdXRzLnNsaWRlQW5pbWF0aW9ucyA9XG4gIHNsaWRlRnJvbUxlZnQ6XG4gICAgcHJvcGVydHk6IFwieFwiXG4gICAgZmFjdG9yOiBcIndpZHRoXCJcbiAgICBmcm9tOiAtMVxuICAgIHRvOiAwXG5cbiAgc2xpZGVUb0xlZnQ6XG4gICAgcHJvcGVydHk6IFwieFwiXG4gICAgZmFjdG9yOiBcIndpZHRoXCJcbiAgICB0bzogLTFcblxuICBzbGlkZUZyb21SaWdodDpcbiAgICBwcm9wZXJ0eTogXCJ4XCJcbiAgICBmYWN0b3I6IFwid2lkdGhcIlxuICAgIGZyb206IDFcbiAgICB0bzogMFxuXG4gIHNsaWRlVG9SaWdodDpcbiAgICBwcm9wZXJ0eTogXCJ4XCJcbiAgICBmYWN0b3I6IFwid2lkdGhcIlxuICAgIHRvOiAxXG5cbiAgc2xpZGVGcm9tVG9wOlxuICAgIHByb3BlcnR5OiBcInlcIlxuICAgIGZhY3RvcjogXCJoZWlnaHRcIlxuICAgIGZyb206IC0xXG4gICAgdG86IDBcblxuICBzbGlkZVRvVG9wOlxuICAgIHByb3BlcnR5OiBcInlcIlxuICAgIGZhY3RvcjogXCJoZWlnaHRcIlxuICAgIHRvOiAtMVxuXG4gIHNsaWRlRnJvbUJvdHRvbTpcbiAgICBwcm9wZXJ0eTogXCJ5XCJcbiAgICBmYWN0b3I6IFwiaGVpZ2h0XCJcbiAgICBmcm9tOiAxXG4gICAgdG86IDBcblxuICBzbGlkZVRvQm90dG9tOlxuICAgIHByb3BlcnR5OiBcInlcIlxuICAgIGZhY3RvcjogXCJoZWlnaHRcIlxuICAgIHRvOiAxXG5cblxuXG5fLmVhY2ggc2hvcnRjdXRzLnNsaWRlQW5pbWF0aW9ucywgKG9wdHMsIG5hbWUpIC0+XG4gIExheWVyLnByb3RvdHlwZVtuYW1lXSA9ICh0aW1lKSAtPlxuICAgIF9waG9uZSA9IEZyYW1lci5EZXZpY2U/LnNjcmVlbj8uZnJhbWVcblxuICAgIHVubGVzcyBfcGhvbmVcbiAgICAgIGVyciA9IFwiUGxlYXNlIHNlbGVjdCBhIGRldmljZSBwcmV2aWV3IGluIEZyYW1lciBTdHVkaW8gdG8gdXNlIHRoZSBzbGlkZSBwcmVzZXQgYW5pbWF0aW9ucy5cIlxuICAgICAgcHJpbnQgZXJyXG4gICAgICBjb25zb2xlLmxvZyBlcnJcbiAgICAgIHJldHVyblxuXG4gICAgX3Byb3BlcnR5ID0gb3B0cy5wcm9wZXJ0eVxuICAgIF9mYWN0b3IgPSBfcGhvbmVbb3B0cy5mYWN0b3JdXG5cbiAgICBpZiBvcHRzLmZyb20/XG4gICAgICAjIEluaXRpYXRlIHRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgYW5pbWF0aW9uIChpLmUuIG9mZiBzY3JlZW4gb24gdGhlIGxlZnQgY29ybmVyKVxuICAgICAgdGhpc1tfcHJvcGVydHldID0gb3B0cy5mcm9tICogX2ZhY3RvclxuXG4gICAgIyBEZWZhdWx0IGFuaW1hdGlvbiBzeW50YXggbGF5ZXIuYW5pbWF0ZSh7X3Byb3BlcnR5OiAwfSkgd291bGQgdHJ5IHRvIGFuaW1hdGUgJ19wcm9wZXJ0eScgbGl0ZXJhbGx5LCBpbiBvcmRlciBmb3IgaXQgdG8gYmxvdyB1cCB0byB3aGF0J3MgaW4gaXQgKGVnIHgpLCB3ZSB1c2UgdGhpcyBzeW50YXhcbiAgICBfYW5pbWF0aW9uQ29uZmlnID0ge31cbiAgICBfYW5pbWF0aW9uQ29uZmlnW19wcm9wZXJ0eV0gPSBvcHRzLnRvICogX2ZhY3RvclxuXG4gICAgaWYgdGltZVxuICAgICAgX3RpbWUgPSB0aW1lXG4gICAgICBfY3VydmUgPSBcImJlemllci1jdXJ2ZVwiXG4gICAgZWxzZVxuICAgICAgX3RpbWUgPSBGcmFtZXIuRGVmYXVsdHMuU2xpZGVBbmltYXRpb24udGltZVxuICAgICAgX2N1cnZlID0gRnJhbWVyLkRlZmF1bHRzLlNsaWRlQW5pbWF0aW9uLmN1cnZlXG5cbiAgICB0aGlzLmFuaW1hdGVcbiAgICAgIHByb3BlcnRpZXM6IF9hbmltYXRpb25Db25maWdcbiAgICAgIHRpbWU6IF90aW1lXG4gICAgICBjdXJ2ZTogX2N1cnZlXG5cblxuXG4jIyNcbiAgRUFTWSBGQURFIElOIC8gRkFERSBPVVRcblxuICAuc2hvdygpIGFuZCAuaGlkZSgpIGFyZSBzaG9ydGN1dHMgdG8gYWZmZWN0IG9wYWNpdHkgYW5kIHBvaW50ZXIgZXZlbnRzLiBUaGlzIGlzIGVzc2VudGlhbGx5IHRoZSBzYW1lIGFzIGhpZGluZyB3aXRoIGB2aXNpYmxlID0gZmFsc2VgIGJ1dCBjYW4gYmUgYW5pbWF0ZWQuXG5cbiAgLmZhZGVJbigpIGFuZCAuZmFkZU91dCgpIGFyZSBzaG9ydGN1dHMgdG8gZmFkZSBpbiBhIGhpZGRlbiBsYXllciwgb3IgZmFkZSBvdXQgYSB2aXNpYmxlIGxheWVyLlxuXG4gIFRoZXNlIHNob3J0Y3V0cyB3b3JrIG9uIGluZGl2aWR1YWwgbGF5ZXIgb2JqZWN0cyBhcyB3ZWxsIGFzIGFuIGFycmF5IG9mIGxheWVycy5cblxuICBFeGFtcGxlOlxuICAqIGBNeUxheWVyLmZhZGVJbigpYCB3aWxsIGZhZGUgaW4gTXlMYXllciB1c2luZyBkZWZhdWx0IHRpbWluZy5cbiAgKiBgW015TGF5ZXIsIE90aGVyTGF5ZXJdLmZhZGVPdXQoNClgIHdpbGwgZmFkZSBvdXQgYm90aCBNeUxheWVyIGFuZCBPdGhlckxheWVyIG92ZXIgNCBzZWNvbmRzLlxuXG4gIFRvIGN1c3RvbWl6ZSB0aGUgZmFkZSBhbmltYXRpb24sIGNoYW5nZSB0aGUgdmFyaWFibGVzIHRpbWUgYW5kIGN1cnZlIGluc2lkZSBgRnJhbWVyLkRlZmF1bHRzLkZhZGVBbmltYXRpb25gLlxuIyMjXG5MYXllcjo6c2hvdyA9IC0+XG4gIEBvcGFjaXR5ID0gMVxuICBAc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJ1xuICBAXG5cbkxheWVyOjpoaWRlID0gLT5cbiAgQG9wYWNpdHkgPSAwXG4gIEBzdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnXG4gIEBcblxuTGF5ZXI6OmZhZGVJbiA9ICh0aW1lID0gRnJhbWVyLkRlZmF1bHRzLkZhZGVBbmltYXRpb24udGltZSkgLT5cbiAgcmV0dXJuIGlmIEBvcGFjaXR5ID09IDFcblxuICB1bmxlc3MgQHZpc2libGVcbiAgICBAb3BhY2l0eSA9IDBcbiAgICBAdmlzaWJsZSA9IHRydWVcblxuICBAYW5pbWF0ZVRvIG9wYWNpdHk6IDEsIHRpbWUsIEZyYW1lci5EZWZhdWx0cy5GYWRlQW5pbWF0aW9uLmN1cnZlXG5cbkxheWVyOjpmYWRlT3V0ID0gKHRpbWUgPSBGcmFtZXIuRGVmYXVsdHMuRmFkZUFuaW1hdGlvbi50aW1lKSAtPlxuICByZXR1cm4gaWYgQG9wYWNpdHkgPT0gMFxuXG4gIHRoYXQgPSBAXG4gIEBhbmltYXRlVG8gb3BhY2l0eTogMCwgdGltZSwgRnJhbWVyLkRlZmF1bHRzLkZhZGVBbmltYXRpb24uY3VydmUsIC0+IHRoYXQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJ1xuXG4jIGFsbCBvZiB0aGUgZWFzeSBpbi9vdXQgaGVscGVycyB3b3JrIG9uIGFuIGFycmF5IG9mIHZpZXdzIGFzIHdlbGwgYXMgaW5kaXZpZHVhbCB2aWV3c1xuXy5lYWNoIFsnc2hvdycsICdoaWRlJywgJ2ZhZGVJbicsICdmYWRlT3V0J10sIChmblN0cmluZyktPiAgXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBBcnJheS5wcm90b3R5cGUsIGZuU3RyaW5nLCBcbiAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgIHZhbHVlOiAodGltZSkgLT5cbiAgICAgIF8uZWFjaCBALCAobGF5ZXIpIC0+XG4gICAgICAgIExheWVyLnByb3RvdHlwZVtmblN0cmluZ10uY2FsbChsYXllciwgdGltZSkgaWYgbGF5ZXIgaW5zdGFuY2VvZiBMYXllclxuICAgICAgQFxuXG5cbiMjI1xuICBFQVNZIEhPVkVSIEFORCBUT1VDSC9DTElDSyBTVEFURVMgRk9SIExBWUVSU1xuXG4gIEJ5IG5hbWluZyB5b3VyIGxheWVyIGhpZXJhcmNoeSBpbiB0aGUgZm9sbG93aW5nIHdheSwgeW91IGNhbiBhdXRvbWF0aWNhbGx5IGhhdmUgeW91ciBsYXllcnMgcmVhY3QgdG8gaG92ZXJzLCBjbGlja3Mgb3IgdGFwcy5cblxuICBCdXR0b25fdG91Y2hhYmxlXG4gIC0gQnV0dG9uX2RlZmF1bHQgKGRlZmF1bHQgc3RhdGUpXG4gIC0gQnV0dG9uX2Rvd24gKHRvdWNoL2NsaWNrIHN0YXRlKVxuICAtIEJ1dHRvbl9ob3ZlciAoaG92ZXIpXG4jIyNcblxuc2hvcnRjdXRzLmluaXRpYWxpemVUb3VjaFN0YXRlcyA9IChsYXllcikgLT5cbiAgX2RlZmF1bHQgPSBsYXllci5nZXRDaGlsZCgnZGVmYXVsdCcpXG5cbiAgaWYgbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ3RvdWNoYWJsZScpIGFuZCBfZGVmYXVsdFxuXG4gICAgdW5sZXNzIEZyYW1lci5VdGlscy5pc01vYmlsZSgpXG4gICAgICBfaG92ZXIgPSBsYXllci5nZXRDaGlsZCgnaG92ZXInKVxuICAgIF9kb3duID0gbGF5ZXIuZ2V0Q2hpbGQoJ2Rvd24nKVxuXG4gICAgIyBUaGVzZSBsYXllcnMgc2hvdWxkIGJlIGhpZGRlbiBieSBkZWZhdWx0XG4gICAgX2hvdmVyPy5oaWRlKClcbiAgICBfZG93bj8uaGlkZSgpXG5cbiAgICAjIENyZWF0ZSBmYWtlIGhpdCB0YXJnZXQgKHNvIHdlIGRvbid0IHJlLWZpcmUgZXZlbnRzKVxuICAgIGlmIF9ob3ZlciBvciBfZG93blxuICAgICAgaGl0VGFyZ2V0ID0gbmV3IExheWVyXG4gICAgICAgIGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCdcbiAgICAgICAgZnJhbWU6IF9kZWZhdWx0LmZyYW1lXG5cbiAgICAgIGhpdFRhcmdldC5zdXBlckxheWVyID0gbGF5ZXJcbiAgICAgIGhpdFRhcmdldC5icmluZ1RvRnJvbnQoKVxuXG4gICAgIyBUaGVyZSBpcyBhIGhvdmVyIHN0YXRlLCBzbyBkZWZpbmUgaG92ZXIgZXZlbnRzIChub3QgZm9yIG1vYmlsZSlcbiAgICBpZiBfaG92ZXJcbiAgICAgIGxheWVyLmhvdmVyIC0+XG4gICAgICAgIF9kZWZhdWx0LmhpZGUoKVxuICAgICAgICBfaG92ZXIuc2hvdygpXG4gICAgICAsIC0+XG4gICAgICAgIF9kZWZhdWx0LnNob3coKVxuICAgICAgICBfaG92ZXIuaGlkZSgpXG5cbiAgICAjIFRoZXJlIGlzIGEgZG93biBzdGF0ZSwgc28gZGVmaW5lIGRvd24gZXZlbnRzXG4gICAgaWYgX2Rvd25cbiAgICAgIGxheWVyLm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LCAtPlxuICAgICAgICBfZGVmYXVsdC5oaWRlKClcbiAgICAgICAgX2hvdmVyPy5oaWRlKCkgIyB0b3VjaCBkb3duIHN0YXRlIG92ZXJyaWRlcyBob3ZlciBzdGF0ZVxuICAgICAgICBfZG93bi5zaG93KClcblxuICAgICAgbGF5ZXIub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuICAgICAgICBfZG93bi5oaWRlKClcblxuICAgICAgICBpZiBfaG92ZXJcbiAgICAgICAgICAjIElmIHRoZXJlIHdhcyBhIGhvdmVyIHN0YXRlLCBnbyBiYWNrIHRvIHRoZSBob3ZlciBzdGF0ZVxuICAgICAgICAgIF9ob3Zlci5zaG93KClcbiAgICAgICAgZWxzZVxuICAgICAgICAgIF9kZWZhdWx0LnNob3coKVxuXG5cbl8uZXh0ZW5kKGV4cG9ydHMsIHNob3J0Y3V0cylcblxuIl19
