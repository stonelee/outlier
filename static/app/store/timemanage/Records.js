Ext.define('Outlier.store.timemanage.Records', {
	extend: 'Ext.data.Store',
	model: 'Outlier.model.timemanage.Record',
	proxy: {
		type: 'rest',
		url: '/timemanage/api/v1/record/',
		reader: {
			type: 'json',
			root: 'objects'
		}
	}
});

