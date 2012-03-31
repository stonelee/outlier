Ext.define('Outlier.view.suggest.Main', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.suggest_main',

	items: [{
		xtype: 'combo',
		fieldLabel: '筛选',
		store: 'demo.Students',
		displayField: 'name',
		queryParam: 'name__startswith',
		minChars: 0,
		hideTrigger: true
	}]
});

