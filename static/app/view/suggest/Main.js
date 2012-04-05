Ext.define('Outlier.view.suggest.Main', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.suggest_main',
	requires: ['Outlier.view.suggest.SuggestTextField'],

	items: [{
		xtype: 'form',
		items: [{
			xtype: 'textfield',
			fieldLabel: 'textfield',
			value: 'a'
		},
		{
			xtype: 'combobox',
			fieldLabel: 'combobox',
			displayField: 'name',
			valueField: 'id',
			store: 'demo.Students',
			multiSelect: true,
			value: [1, 3, 8,'lalala'],
			queryMode:'local',
			listeners: {
				render: function() {
					Ext.getStore('demo.Students').load();
				}
			}
		},
		{
			xtype: 'suggest_text_field',
			fieldLabel: '检查人',
			store: Ext.create('Outlier.store.demo.Students'),
			queryParam: 'name__startswith',
			value: [1, 3, 8]
		}]
	}],
	bbar: [{
		text: 'save',
		handler: function() {
			console.log(this.up('panel').down('form').getValues());
		}
	}]
});

