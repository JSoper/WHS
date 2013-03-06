Ext.define('Whs.controller.WhsController', {
	extend : 'Ext.app.Controller',
	requires: ['Ext.data.JsonP'],
	onSelect : function onSelect$WhsController(selModel, record, index, options) {
		console.log(arguments.callee.name, record)
		var basicForm = Ext.ComponentQuery.query('form')[0].getForm();
		console.log(arguments.callee.name, basicForm)
		basicForm.loadRecord(record);
	},

	init : function init$WhsController(application) {
		console.log(arguments.callee.name)
		this.control({
			gridpanel : {
				select : this.onSelect
			}
		});
	},

	setMap : function setMap$WhsController() {
		console.log(arguments.callee.displayName);
		var mapPanel = Ext.ComponentQuery.query('mappanel')[0];

		// var latLng = new google.maps.LatLng(48, 10); // S. Germany
		// mapPanel.setMapContent(latLng, 4) ;// 4 for EU

		var latLng = new google.maps.LatLng(40, -100); // Kansas
		mapPanel.setMapContent(latLng, 3);// 4 for EU
	},
	printSomething : function ()
	{ console.log ("printSomething", arguments)
	},

	onLaunch : function(application) {
		console.log(arguments.callee.displayName);
		this.callParent(arguments);

//		var request = Ext.data.JsonP.request({
//			url : "http://maps.google.com/maps/api/js",
//			params: { sensor : true },
//			success: function() { console.log( "SUCCESS")},
//			callback: function() { console.log( "CALLBACK")}
//		});
		this.setMap();
	},
});
