Ext.define('Outlier.store.comboboxtree.CheckTrees', {
	extend: 'Ext.data.TreeStore',
	proxy: {
		type: 'ajax',
		url: 'static/data/checkTrees.json'
	}
});

