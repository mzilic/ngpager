angular.module('PagerConfig', []).factory('PagerConfig', [function() {	
	var areJumpControlsEnabled = false;
	var defaultMaxPages = 3;

	var config = {		
		enableJumpControls: function() { areJumpControlsEnabled = true; },
		setDefaultMaxPages: function(newDefault) { defaultMaxPages = newDefault; }
	};	
	Object.defineProperty(config, "areJumpControlsEnabled", { get: function() { return areJumpControlsEnabled; }});
	Object.defineProperty(config, "defaultMaxPages", { get: function() { return defaultMaxPages; }});
	return config;
}]);
