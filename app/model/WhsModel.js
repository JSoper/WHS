Ext.define('Whs.model.WhsModel', {
    extend: 'Ext.data.Model',

    proxy: {
    	type: 'ajax',
    	url: 'data/WhsNorthAmerica.xml',
    	// url: 'data/WhsEurope.xml',
    	// url: 'data/WhcEuMixed.xml',

    	// A jsonp request can only get back javascript 
    	// You have to use AJAX to read XML   :(
        // type: 'jsonp',
        // url: 'http://whc.unesco.org/en/list/xml/',
        
        reader: {
            type: 'xml',
            root: 'query',
            record: 'row'
        }
    },

    fields: [
        // {  name: 'criteria_txt' }, // (iv)(v)
        // {  name: 'danger' },
        {  name: 'date_inscribed', type: 'int' }, // 2011
        {  name: 'historical_description' },
        {  name: 'http_url' },
        // {  name: 'id_number', type: 'int' }, // 1363
        {  name: 'image_url' },
        // {  name: 'iso_code' }, // at,fr,de,it,si,ch
        // {  name: 'justification' },
        {  name: 'latitude', type: 'float' },
        {  name: 'location' }, // State of Burgenland (AT) / County of Györ-Moson-Sopron (HU)
        {  name: 'longitude', type: 'float' },
        {  name: 'long_description' },
        {  name: 'region' }, // Europe and North America
        // {  name: 'revision_extension' }, // Rev or  bis
        // {  name: 'secondary_dates' }, // 1984
        {  name: 'short_description' },
        {  name: 'site' }, // Prehistoric Pile dwellings around the Alps
        {  name: 'states' }, // Austria,France,Germany,Italy,Slovenia,Switzerland
        // {  name: 'transboundary' }, // 1
        // {  name: 'unique_number', type: 'int' }, // 1782
    ]
});
