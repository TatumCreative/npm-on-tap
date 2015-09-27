# on-tap

A module for npm and browserify that normalizes click and touch events for simple tapping in visualizations. Touch or click is fired only once per tap depending on the type of device that is being used. The x and y coordinates are relative to the element. This module was written in a way to minimize memory allocation and garbage collection.

	OnTap(
		HTMLElement / HTMLCollection / jQuery Selection,
		EventHandler,
		OptionsObject {
			
			// Use touchend instead of the default touchstart
			touchend : false / true,
			
			// Multiply the coordinates by the devicePixelRatio, defaults to false
			devicePixelRatio : false / true
		}
	)

It returns an `off()` function or an array of `off()` functions that will remove the tap listener.

## Usage Example

	var OnTap = require("@tatumcreative/on-tap")
	
	var off = OnTap( el, function(e) {
		ctx.beginPath()
		ctx.arc(e.x, e.y, 50, 0, 2 * Math.PI)
		ctx.stroke()
	})

## Event Object

The event object is shared through every fire in order to avoid garbage collection.

	OnTapEvent {
		x : The x coordinate relative to the element,
		y : The x coordinate relative to the element,
		originalEvent : the original event that was sent, TouchEvent or MouseEvent
	}