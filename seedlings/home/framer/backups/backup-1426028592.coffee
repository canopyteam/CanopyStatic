# This imports all the layers for "stream" into streamLayers
streamLayers = Framer.Importer.load "imported/stream"

CCOAppBar = require "CCOAppBar"
CCOStylesheet = require "CCOStylesheet"
CCOScrollView = require "CCOScrollView"
shortcuts = require "FBShortcuts"

europa = new CCOStylesheet.CCOStylesheet 'css/europa.css'

color =
	canopy_green: '#23DEBF'
	canopy_dark: '#20262A'
	background: '#f2f2f2'
	gray_light: '#ccc'
	gray_middle: '#525252'

appContent = new Layer
	backgroundColor: "white"
	width: Framer.Device.screen.width
	height: Framer.Device.screen.height

appBar = new CCOAppBar.CCOAppBar
	backgroundColor: color.canopy_green
	statusBarTextColor: "white"
	fontFamily: 'Europa, Helvetica'
	viewName: 'Home'

appBar.states.add
	green: {backgroundColor: color.canopy_green}
	dark: {backgroundColor: color.canopy_dark}

appBar.tap () ->
	appBar.states.next("green", "dark")

scrollView = new CCOScrollView.CCODraggableScrollView
	height: Framer.Device.screen.height
	width: Framer.Device.screen.width
	y: appBar.height - 2
	contentHeight: streamLayers.stream.height - 2 + appBar.height - 284
	backgroundColor: 'white'
	vertical: true

scrollView.content.clip = false
scrollView.content.force2d = true

streamLayers.y = appBar.height

scrollView.content.addSubLayer streamLayers.stream

appBar.bringToFront()
