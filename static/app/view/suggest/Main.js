Ext.define('Outlier.view.suggest.Main', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.suggest_main',
	requires: ['Outlier.view.suggest.SuggestTextField'],

	items: [{
		xtype: 'textfield',
		fieldLabel: 'textfield',
		value: 'a'
	},
	{
		xtype: 'suggest_text_field',
		fieldLabel: 'suggest_text_field',
		value: 'b'
	}]
});

