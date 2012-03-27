Ext.define('Outlier.view.Test', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.test',
	layout: 'fit',
	margin: '2 0 2 2',
	requires: ['Outlier.view.comboboxtree.Main'],
	items: [{
		xtype: 'comboboxtree_main'
	}]
});

