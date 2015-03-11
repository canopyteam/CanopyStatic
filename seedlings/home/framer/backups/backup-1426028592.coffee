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

appContent = new Layer
	backgroundColor: "white"
	width: Framer.Device.screen.width
	height: Framer.Device.screen.height

appBar = new CCOAppBar.CCOAppBar
	backgroundColor: color.canopy_green
	statusBarTextColor: "white"
	fontFamily: 'Europa, Helvetica'
	viewName: 'Home'

scrollView = new CCOScrollView.CCODraggableScrollView
	height: Framer.Device.screen.height
	width: Framer.Device.screen.width
	# hide leading divider under appBar
	y: appBar.height - 2
	contentHeight: streamLayers.stream.height - 2 - appBar.height - 30
	backgroundColor: 'white'
	vertical: true

scrollView.content.addSubLayer streamLayers.stream

appBar.bringToFront()

appBar.states.add
	green: {backgroundColor: color.canopy_green}
	dark: {backgroundColor: color.canopy_dark}
appBar.tap () ->
	appBar.states.next("green", "dark")