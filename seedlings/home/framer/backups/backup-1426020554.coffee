# This imports all the layers for "stream" into streamLayers
streamLayers = Framer.Importer.load "imported/stream"

CCOAppBar = require "CCOAppBar"
CCOStylesheet = require "CCOStylesheet"
CCOScrollView = require "CCOScrollView"

europa = new CCOStylesheet.CCOStylesheet 'css/europa.css'

color =
	canopy_green: '#23DEBF'
	background: '#f2f2f2'
	gray_light: '#ccc'
	gray_middle: '#525252'

appBar = new CCOAppBar.CCOAppBar
	backgroundColor: color.canopy_green
	statusBarTextColor: "white"
	fontFamily: 'Europa, Helvetica'
	viewName: 'Home'
	width: 700

appContent = new Layer
	backgroundColor: "white"
	width: Screen.width
	height: Screen.height + appBar.height
	x: 0
	y: 0
	
scrollView = new CCOScrollView.CCODraggableScrollView
	height: Screen.height
	width: Screen.width
	y: appBar.height - 2
	contentHeight: streamLayers.stream.height - 2 + appBar.height
	contentWidth: Screen.width
	backgroundColor: 'white'
	vertical: true

scrollView.content.clip = false
scrollView.content.force2d = true

streamLayers.y = appBar.height

scrollView.content.addSubLayer streamLayers.stream

appBar.bringToFront()