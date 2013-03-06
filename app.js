Ext.Loader.setConfig({
	enabled : true
});

Ext.application({
	name : 'Whs',
	requires : [ 'Whs.view.MainContainer' ],
	controllers : [ 'WhsController' ],
	models : [ 'WhsModel' ],
	stores : [ 'WhsStore' ],
	views : [ 'MainContainer' ],
	autoCreateViewport : true,

// launch : function(application) {
// console.log("LAUNCH app.js");
// // ADDED FOR WHC
// var mapPane = Ext.ComponentQuery.query( 'mappanel' )[0];
// var latLng = new google.maps.LatLng(50, 15) // Czech Republic
// mapPane.setMapContent(latLng, 4)
// },
});
