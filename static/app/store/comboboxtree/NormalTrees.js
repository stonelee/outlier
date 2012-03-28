Ext.define('Outlier.store.comboboxtree.NormalTrees', {
	extend: 'Ext.data.TreeStore',
	proxy: {
		type: 'ajax',
		url: 'static/data/normalTrees.json'
	}
});

