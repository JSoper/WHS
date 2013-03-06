Ext.define('Whs.store.WhsStore', {
	extend : 'Ext.data.Store',
	requires : [ 'Whs.model.WhsModel' ],
	autoLoad : true,
	groupField: 'states',
	model : 'Whs.model.WhsModel',
	//storeId : 'MyStore'
});