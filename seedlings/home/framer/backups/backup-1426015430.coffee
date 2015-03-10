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

appContent = new Layer
	backgroundColor: "white"
	width: Screen.width
	height: Screen.height + appBar.height
	x: 0
	y: 0

streamView = new Layer
	width: Screen.width
	y: appBar.height

scrollContent = new Layer
	backgroundColor: "blue"
	width: Screen.width
	height: Screen.height / 1.5
	x: 0
	y: 0
	superLayer: streamView

scrollContent2 = new Layer
	backgroundColor: "green"
	width: Screen.width
	height: Screen.height / 1.5
	x: 0
	y: Screen.height / 1.5
	superLayer: streamView
	
streamView.height = scrollContent.height + scrollContent2.height

print Screen.height

scrollView = new CCOScrollView.CCODraggableScrollView
	height: Screen.height + appBar.height
	width: Screen.width
	contentHeight: Screen.height * 2 + appBar.height
	contentWidth: Screen.width
# 	contentPaddingTop: appBar.height - 1
	backgroundColor: 'white'
	vertical: true

scrollView.content.clip = false
scrollView.content.force2d = true

streamLayers.y = appBar.height

scrollView.content.addSubLayer streamLayers.stream

appBar.bringToFront()