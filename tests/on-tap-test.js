var Test  = require('tape')
var $     = require('jquery')
var OnTap = require('../on-tap')

function _createEls() {
	$(
		"<div id='a'>a</div>" +
		"<div id='b'>b</div>"
	).appendTo('body')
}

function _destroyEls() {
	$('div').remove()
}

Test("Accepts a variety of element inputs", function(t) {

	t.plan(5)

	_createEls()

	var jQuerySelection = $('div')
	var htmlCollection = document.getElementsByTagName('div')
	var htmlElement = htmlCollection[0]

	OnTap( jQuerySelection, function() { t.pass("jQuery selections were triggered") } )
	OnTap( htmlCollection, function() { t.pass("HTMLCollections were triggered") } )
	OnTap( htmlElement, function() { t.pass("HTMLElement was triggered") } )

	jQuerySelection.trigger('click')

	t.timeoutAfter( 100 )

	_destroyEls()

})

Test("Overlooks touchstart / click events if they appear to be the same", function(t) {

	_createEls()
	
	t.plan(1)

	var $div = $('div:first')
	var el = $div[0]

	var calls = 0
	
	OnTap( el, function() {
		calls++
	})
	
	$div.trigger('touchstart')
	$div.trigger('click')
	$div.trigger('end')

	setTimeout(function() {
		t.equal(calls, 1, "only 1 event was fired")
	}, 50)

	_destroyEls()

})

Test("Overlooks touchend / click events if they appear to be the same", function(t) {

	_createEls()
	
	t.plan(1)

	var $div = $('div:first')
	var el = $div[0]

	var calls = 0
	
	OnTap( el, function() {
		calls++
	},{ touchend: true })
	
	$div.trigger('touchstart')
	$div.trigger('click')
	$div.trigger('end')

	setTimeout(function() {
		t.equal(calls, 1, "only 1 event was fired")
	}, 50)

	_destroyEls()

})

// TODO - Better simulation of click events?
