TiNavigationController
======================

1. Require the NavigationController class

        var NavigationController = require('NavigationController').NavigationController;
        var navController = new NavigationController();
    
2. Add your first view to it

        var container = navController.open(myTiView);
        // container might be null, it's only used in iPhone
    
3. Much like iPhone `UINavigationController`s, it's not added to your view yet:

        Ti.UI.currentWindow.add(navController);
    

Other
-----

If you want to be able to access the navigationcontroller from your view controllers/windows, you'll need to set 
them up to be initialized with the navController object like so:

        var myView = new MyView(navController);
        navController.open(myView);

You should probably keep track of the `navController` object so you can continue to use it.


        var MyView = function(navController) {
          this.navController = navController;
        }
    
Methods
-------

- `.back(transition=null)`: returns you one view controller/screen/window, with an optional [Ti View animation object](http://developer.appcelerator.com/apidoc/mobile/1.0/Titanium.UI.Animation)
- `.home(transition=null)`: returns you to the root view controller, with an optional [Ti View animation object](http://developer.appcelerator.com/apidoc/mobile/1.0/Titanium.UI.Animation)