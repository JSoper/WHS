Ext.define('Whs.view.MainContainer', {
	extend : 'Ext.container.Container',

	requires : [ 'Whs.view.MapPanel' ],
	height : 440,
	layout : 'border',
	items : [
			{
				xtype : 'tabpanel',
				title : 'World Hertage Sites',
				region : 'center',
				split : true,
				flex : 2,
				items : [
						{
							xtype : 'gridpanel',
							title : 'Table',
							store : 'WhsStore',
							features : [ {
								ftype : 'grouping'
							} ],
							columns : [ {
								xtype : 'gridcolumn',
								dataIndex : 'image_url',
								text : 'Site',
								flex : 1,
								renderer : function(value, metaData, record) {
									return '<figure style=' + '"display:inline-block;width:185px;'
											+ 'height:125px;vertical-align:top">' + '<img src="' + value + '">'
											+ '<figcaption>' + Ext.String.ellipsis(record.get('site'), 40, true)
											+ '</figcaption>' + '</figure>'
								}
							} ]
						}, {
							title : 'List',
							xtype : 'gridpanel',
							store : 'WhsStore',
							features : [ {
								ftype : 'grouping'
							} ],
							columns : [ {
								xtype : 'gridcolumn',
								dataIndex : 'site',
								text : 'Site',
								flex : 1
							} ]
						}, {
							title : 'Map',
							xtype : 'mappanel',
							titleField : 'site'
						// field in the record that appears in the tip above
						// each marker
						} ]
			},

			{
				split : true,
				region : 'east',
				flex : 2,
				xtype : 'form',
				title : 'Detail Panel',
				defaults : {
					anchor : '100%',
					xtype : 'htmleditor',
					enableAlignments : false,
					enableColors : false,
					enableFont : false,
					enableFontSize : false,
					enableFormat : false,
					enableLinks : false,
					enableLists : false,
					enableSourceEdit : false
				},
				items : [ {
					name : 'site',
					xtype : 'textfield'
				}, {
					name : 'location',
					xtype : 'textfield',
				}, {
					name : 'states',
					xtype : 'textfield',
				}, {
					name : 'short_description'
				}, {
					name : 'long_description',
				}, {
					name : 'historical_description'
				} ]
			} ]
});