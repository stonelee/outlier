Ext.define('Outlier.store.Menus', {
	extend: 'Ext.data.TreeStore',
	proxy: {
		type: 'ajax',
		url: 'static/data/menus.json'
	}
});

