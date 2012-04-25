// A better navigation controller
// That supports "instagram-for-android" style nav bars,
// as well as a real nav bar on web
var NavigationController = function(){};

NavigationController.prototype = {
	/* Instance variables */
	windows: [],
	supportsNavGroup: Ti.Platform.osname === 'iphone',
	currentModalWindow: null,
	
	/* Functions */
	
	/* open: (window, transition)
	 * 
	 */
	open: function(w, transition) {
		if (!w) {
			alert('Can\'t open nil window');
			return;
		}
		if (!transition) transition = {animated: true};
		
		this.windows.push(w);
		Ti.API.log(this.windows);
		
		// Ensure heavy windows
		w.navBarHidden = w.navBarHidden || false;
		
		// Create nav group if needed
		if (this.windows.length === 1 && this.supportsNavGroup) {
			if (typeof this.navigationGroup == "undefined" || !this.navigationGroup)
				this.navigationGroup = Ti.UI.iPhone.createNavigationGroup({window: w});
				
		} else {
			if (this.supportsNavGroup) {
				this.navigationGroup.open(w, transition);
			} else {			
				// add fake nav bars here for android and web
				if (!w.navBarHidden) {
					var NavigationBar = require('NavigationBar').NavigationBar;
					var navBar = new NavigationBar(this, {
						height: 44,
						title: {
							text: w.title
						},
						displaysBackButton: (this.windows.length > 1)
					});
					
					if (w.leftNavButton) navBar.setLeftButton(w.leftNavButton);
					if (w.rightNavButton) navBar.setLeftButton(w.rightNavButton);
					w.add(navBar.view);
				}
				if (this.windows.length > 1) {
					w.open(transition);
				}
			}
		}
		
		return this.target();
	},
	
	target: function() {
		var w = this.windows[this.windows.length - 1];
		Ti.API.log('top window is ' + w.title);
		return (Ti.Platform.osname === 'iphone') ? this.navigationGroup : this.currentWindow();
	},
	
	/* back:
	 * Go back one item.
	 */
	back: function(transition) {
		if (this.windows.length === 1) {
			Ti.API.log("Can't go back, only one window on the stack.");
			return;
		}
		var w = this.windows.pop();
		w.close(transition);
		w.remove();
	},
	
	/* currentWindow: (void)
	 * returns the currently displaying window
	 */
	currentWindow: function() {
		if (this.currentModalWindow) return this.currentModalWindow;
		return this.windows[this.windows.length-1];
	},
	
	/* rootWindow: (void)
	 * returns the root window
	 */
	rootWindow: function() {
		return this.windows[0];
	}
};

exports.NavigationController = NavigationController;