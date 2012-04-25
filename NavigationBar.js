var _ = require('underscore')._;

var BUTTON_PADDING = 10.0;
var BUTTON_MARGIN = 5.0;

var NavigationBar = function(navigationController, options) {
	this.navigationController = navigationController;
	this.view = Ti.UI.createView(_.extend({
		top: 0,
		left: 0,
		height: 44,
		width: '100%',
		backgroundGradient: //'#91A2B8',
		{
			type:'linear',
			colors:[{color: '#d2e0f3', position: 0.0}, {color:'#91A2B8', position: 0.2}, {color: '#5f6c7c', position: 1.0}],
			startPoint:{x:0,y:0},
			endPoint:{x:0,y:44},
			backFillStart:false
		},
		borderWidth: 1.0,
		borderColor: '#444'
	}, options));
	
	/* title */
	var title = {
		text: "test title",
		color: '#fff',
		width: 'auto',
		shadowColor: '#333',
		shadowOffset: {x: 1, y: 1}
	};
	if (options.title) title = _.extend(title, options.title);
	var title = Ti.UI.createLabel(title);
	this.view.add(title);
	
	/* Add back button if needed */
	if (options.displaysBackButton) {
		var backButton = Ti.UI.createButton({
			title: 'Back', // @localize
			width: 'auto',
			height: this.view.height - BUTTON_MARGIN,
			left: BUTTON_PADDING
		});
		
		backButton.addEventListener('click', function(e) {
			navigationController.back({animate: true});
		});
		this.view.add(backButton);
	}
};

NavigationBar.prototype = {
	setLeftButton: function(btn) {
		btn.left = BUTTON_PADDING;
		if (btn.height) btn.height = btn.height - BUTTON_MARGIN;
		this.view.add(btn);
	},
	setRightButton: function(btn) {
		btn.right = BUTTON_PADDING;
		if (btn.height) btn.height = btn.height - BUTTON_MARGIN;
		this.view.add(btn);
	}
}

exports.NavigationBar = NavigationBar;