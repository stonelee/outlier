Ext.define('Outlier.store.Trees', {
	extend: 'Ext.data.TreeStore',
	proxy: {
		type: 'ajax',
		url: 'static/data/trees.json'
	}
});

