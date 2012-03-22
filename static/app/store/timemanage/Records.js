Ext.define('Outlier.store.timemanage.Records', {
	extend: 'Ext.data.Store',
	model: 'Outlier.model.timemanage.Record',
	proxy: {
		type: 'rest',
		url: '/timemanage/api/v1/record/',
		pageParam: null,
		startParam: 'offset',
		reader: {
			type: 'json',
			root: 'objects',
			totalProperty: 'meta.total_count'
		}
	}
});

