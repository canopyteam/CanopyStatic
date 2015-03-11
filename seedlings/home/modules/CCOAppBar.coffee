# Add the folowing line to your project in Framer Studio.
# module = require "module"
# Reference the contents by name, like module.myFunc() or module.myVar

# CLASS: AppBar
# Creates an iOS app bar
class @CCOAppBar extends Layer
	constructor: (options = {}) ->
		super options

		constants =
			nav_bar_height: 98
			product_cell_height: 720
			app_bar_height: 128

		if options.statusBarTextColor == "black"
			statusBarImage = 'images/CCOAppBar/StatusBar-Black.png'
		else
			statusBarImage = 'images/CCOAppBar/StatusBar-White.png'

		@width = Framer.Device.screen.width
		@height = constants.app_bar_height
		@backgroundColor = options.backgroundColor

		@statusBar = new Layer
			width: @width
			height: 44
			backgroundColor: options.statusBarColor || "transparent"
			superLayer: @

		@statusBarImage = new Layer
			width: @width
			height: @statusBar.height
			image: statusBarImage
			superLayer: @statusBar

		@appBarContainer = new Layer
			backgroundColor: null
			y: @statusBar.height
			width: @statusBar.width
			height: @height - @statusBar.height
			superLayer: @

		@viewName = new Layer
			width: @width
			height: 140
			backgroundColor: null
			superLayer: @appBarContainer
		@viewName.html = options.viewName || 'Name this'
		@viewName.style.fontFamily = options.fontFamily || 'Helvetica Neue'
		@viewName.style = {
			'font-size':'40px',
			'color': 'white'
			'text-align': 'center'
			'padding-top': '20px'
		}

exports.CCOAppBar
