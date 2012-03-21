Ext.define('Outlier.store.demo.Students', {
	extend: 'Ext.data.Store',
	model: 'Outlier.model.demo.Student',
	proxy: {
		type: 'rest',
		url: '/demo/api/v1/student/',
		reader: {
			type: 'json',
			root: 'objects'
		}
	}
});

