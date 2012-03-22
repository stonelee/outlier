Ext.define('Outlier.store.demo.Students', {
	extend: 'Ext.data.Store',
	model: 'Outlier.model.demo.Student',
	pageSize: 10,
	proxy: {
		type: 'rest',
		url: '/demo/api/v1/student/',
		pageParam: null,
		startParam: 'offset',
		reader: {
			type: 'json',
			totalProperty: 'meta.total_count',
			root: 'objects'
		}
	}
});

