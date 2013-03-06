// https://developers.google.com/maps/documentation/javascript/reference
// https://developers.google.com/maps/documentation/javascript/reference#MapOptions

Ext.define('Whs.view.MapPanel', {
	extend : 'Ext.container.Container',
	xtype : 'mappanel',
	googleMap : null,
	markers : [],

	defaultZoom: 4,
	defaultMarkerSize: 4,
	
	initComponent : function() {
		console.log(arguments.callee.displayName);
		if (window.google) {
			this.initMapPane();
		}
		this.callParent(arguments);
	},

	listeners : {
		render : function render_listeners$MapPanel(component, eOpts) {
			this.makeMap();
			console.log(arguments.callee.name);
		},
		show : function show_listeners$MapPanel(component, eOpts) {
			console.log(arguments.callee.name);
			this.setMapContent(this.place, this.zoom);
		}
	},

	fetchElement : function() {
		return this.getEl();
	},

	// ============

	initMapPane : function() {
		console.log(arguments.callee.displayName);
		if (window.google) {
			Ext.applyIf(this, {
				geoCoder : new google.maps.Geocoder(),
				markerPath : google.maps.SymbolPath.CIRCLE
			});
		}
	},

	makeMap : function() {
		console.log(arguments.callee.displayName);
		if (!this.googleMap && window.google) {
			var domElement = this.fetchElement().dom;
			this.googleMap = new google.maps.Map(domElement, {
				mapTypeId : google.maps.MapTypeId.ROADMAP
			}); // SATELLITE HYBRID TERRAIN
			// https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		}
	},

	// Geocoding converts an address into a location ( latitude and longitude )
	// See https://developers.google.com/maps/documentation/geocoding/ and
	// https://developers.google.com/maps/documentation/javascript/reference#GeocoderRequest
	// The first call to geocode() must include a valid request object, or it
	// does not work afterwards.
	// {} is a valid request object although you will get a ZERO_RESULTS status
	// Zoom must be an integer. 3 or 4 covers a continent.
	// 13 covers part of a large city.
	setMapContent : function(place, zoom) {
		console.log(arguments.callee.displayName);
		if (window.google) {
			this.place = place;
			this.zoom = zoom || this.defaultZoom;
			if (this.isVisible()) {
				if (place instanceof google.maps.LatLng) {
					this.centerLatLng = place;
					this.googleMap.setCenter(place);
					this.createMarkers();
				} else {
					this.geoCoder.geocode({
						address : place
					}, this.mapCenterCallback);
				}
			}
		}
	},

	mapCenterCallback : function mapCenterCallback(results, statusCode) {
		console.log(arguments.callee.name);
		var mapPane = Ext.ComponentQuery.query('mappanel')[0];

		if (statusCode !== google.maps.GeocoderStatus.OK) {
			Ext.Msg.alert('mapCenterCallback', 'Location not found : ' + mapPane.place + '</br>Status Code = '
					+ statusCode);
			mapPane.centerLatLng = null;
		} else {
			// results[0] is a google.maps.GeocoderResult
			mapPane.centerLatLng = results[0].geometry.location;
			mapPane.googleMap.setCenter(mapPane.centerLatLng);
			mapPane.createMarkers();
		}
	},

	createMarkers : function() {
		console.log(arguments.callee.displayName, this.isVisible());
		// Clear out previous markers
		Ext.Array.forEach(this.markers, this.removeMarker);

		if (this.isVisible()) {
			var store = Ext.data.StoreManager.lookup('WhsStore');
			this.createCenterMarker(); // extra
			store.each(this.createMarker, this);
			this.googleMap.setZoom(this.zoom);
		}
	},

	// Places a Sencha logo at the center of the map
	// All of createCenterMarker is extra.
	createCenterMarker : function() {
		console.log(arguments.callee.displayName);
		if (this.centerLatLng) {
			// https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions
			var markerImage = new google.maps.MarkerImage('resources/images/SenchaLogo20x32.gif', null,
			// size
			// The display size of the sprite or image.
			// When using sprites, you must specify the sprite size.
			// If the size is not provided, it will be set when the
			// image loads.
			null, // origin
			// The position of the image within a sprite, if any.
			// By default, the origin is located at the top left corner
			// of the image (0, 0).
			new google.maps.Point(9, 15) // anchor
			// The position at which to anchor an image in
			// correspondance to the location of the marker on the map.
			// By default, the anchor is located along the center point
			// of the
			// bottom of the image.
			);

			// https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions
			var markerConfig = {
				position : this.centerLatLng,
				map : this.googleMap,
				icon : markerImage,
				// animation : google.maps.Animation.DROP, // BOUNCE
				title : 'Map Center' // extra
			};
			// https://developers.google.com/maps/documentation/javascript/reference#Marker
			this.markers.push(new google.maps.Marker(markerConfig));
			this.centerLatLng = null;
		}
	},

	createMarker : function(record) {
		// console.log(arguments.callee.displayName);
		var latLng = new google.maps.LatLng(record.get('latitude'), record.get('longitude'));

		// Need to create a new object for each marker
		var markerSymbol = // extra
		{
			path : this.markerPath, 
			scale : this.defaultMarkerSize, // extra, changes the size of the symbol
			// strokeColor : 'blue', // extra, defaults to black
			fillColor : 'HotPink', // extra, defaults to black
			fillOpacity : 1.0, // extra, the symbol's fill opacity. Defaults to 0.
			// strokeOpacity : 1, // defaults to 1
			strokeWeight : 1
		// the symbol's stroke weight. Defaults to the scale of the symbol.
		};

		// https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions
		var markerConfig = {
			position : latLng,
			map : this.googleMap,
			title : record.get(this.titleField ), // extra
			icon : markerSymbol, // extra
			// zIndex : rating, // extra
			record : record
		// record used for onMarkerClick
		};
		// https://developers.google.com/maps/documentation/javascript/reference#Marker
		var marker = new google.maps.Marker(markerConfig);

		var onClickHandler = Ext.Function.bind(this.onMarkerClick, this, [ marker ], false);
		google.maps.event.addListener(marker, 'click', onClickHandler);

		// Save an array of the markers so that removeMarker can clean
		// them out
		this.markers.push(marker);
	},

	removeMarker : function(marker) {
		marker.setMap(null);
		google.maps.event.clearInstanceListeners(marker);
	},

	onMarkerClick : function(marker) {
		var record = marker.record;
		console.log(arguments.callee.name, record)
		var basicForm = Ext.ComponentQuery.query('form')[0].getForm();
		console.log(arguments.callee.name, basicForm)
		basicForm.loadRecord(record);
	}
	// onMarkerClick : function(marker) {
	// extra: open a popup window containing detail info from record.detailHtml() or a photo
	// see
	// https://developers.google.com/maps/documentation/javascript/reference#InfoWindow
	// }
});
