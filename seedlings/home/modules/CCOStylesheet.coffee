class @CCOStylesheet
	constructor: (url)->
		wf = document.createElement('link')
		wf.href = url
		wf.rel = 'stylesheet'
		l = document.getElementsByTagName('link')[0]
		l.parentNode.insertBefore(wf, l)

exports.CCOStylesheet
