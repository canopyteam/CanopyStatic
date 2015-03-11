Math.clamp = (n, min, max) ->
  return Math.max(min, Math.min(max, n))

class @CCODraggableScrollView extends Layer
  # Options are:
  # - contentWidth: width of content
  # - contentHeight: height of content
  # - vertical: boolean
  # - horizontal: boolean

  constructor: (options) ->
    super(options)

    @contentWidth = options.contentWidth || Framer.Device.screen.width
    @contentHeight = options.contentHeight || Framer.Device.screen.height

    @_direction = {}
    @_vertical = options.vertical || false
    @_horizontal = options.horizontal || false

    @xMax = 0
    @xMin = -(@contentWidth - @width)
    @yMax = 0
    @yMin = -(@contentHeight - @height)

    @backgroundColor = "transparent"
    @content = new Layer
      superLayer: @
      backgroundColor: null
      width: @contentWidth
      height: @contentHeight
    @content.draggable.Enabled = true

    @content.clip = options.clipContent || false
    @content.force2d = true

    @content.on Events.DragStart, @dragStart
    @content.on Events.DragMove, @dragMove
    @content.on Events.DragEnd, @dragEnd

  dragStart: (e, layer) =>
    @animateStop()
    @momentum?.stop()
    @emit(Events.DragStart, e, layer)

  dragMove: (e, layer) =>
    if @_horizontal
      if layer.x > 0
        @content.draggable.speedX = Math.clamp(Utils.mapRange(layer.x, 100, 0, 0.5, 1), 0.5, 1)
      else if layer.x < @xMin
          @content.draggable.speedX = Math.clamp(Utils.mapRange(layer.x, @xMin - 100, @xMin, 0.5, 1), 0.5, 1)
      else
        @content.draggable.speedX = 1
    else
      @content.draggable.speedX = 0

    if @_vertical
      if layer.y > 0
        @content.draggable.speedY = Math.clamp(Utils.mapRange(layer.y, 100, @yMax, 0.5, 1), 0.5, 1)
      else if layer.y < @yMin
        @content.draggable.speedY = Math.clamp(Utils.mapRange(layer.y, @yMin - 100, @yMin, 0.5, 1), 0.5, 1)
      else
        @content.draggable.speedY = 1
    else
      @content.draggable.speedY = 0

  dragEnd: (e, layer) =>
    velocity = layer.draggable.calculateVelocity()
    if Math.abs(velocity.x) < .1 && Math.abs(velocity.y) < .1
      x = Math.clamp(layer.x, @xMin, 0)
      y = Math.clamp(layer.y, @yMin, 0)
      if x != layer.x || y != layer.y
        @momentum = layer.animate
          properties:
            x: x
            y: y
          curve: "spring"
          curveOptions:
            friction: 100
          time: .15
        @momentum.on Events.AnimationEnd, () =>
          @emit(Events.DragEnd, e, layer)
      else
        @emit(Events.DragEnd, e, layer)
    else
      totalVelocity = Utils.pointTotal Utils.pointAbs velocity
      @momentum = @content.animate
        properties:
          x: Math.clamp(parseInt(layer.x + (velocity.x * 500)), @xMin, 0)
          y: Math.clamp(parseInt(layer.y + (velocity.y * 200)), @yMin, 0)
        curve: "spring"
        curveOptions:
          friction: 100
      @momentum.on Events.AnimationEnd, () =>
        @emit(Events.DragEnd, e, layer)

exports.CCODraggableScrollView
