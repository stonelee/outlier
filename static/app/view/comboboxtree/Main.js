Ext.define('Outlier.view.comboboxtree.Main', {
	extend: 'Ext.form.Panel',
	alias: 'widget.comboboxtree_main',
	requires: ['Outlier.view.comboboxtree.ComboBoxTree'],
	items: [{
		xtype: 'combobox',
		fieldLabel: 'combobox',
		store: 'demo.Students',
		multiSelect: true,
		//否则不会自动选中
		queryMode: 'local',
		valueField: 'id',
		displayField: 'name'
	},
	{
		xtype: 'util_comboboxtree',
		fieldLabel: 'comboboxtree',
		store: 'Trees',
		height: 200,
		valueField: 'id',
		displayField: 'name'
	}],
	listeners: {
		render: function(form) {
			var store = Ext.getStore('demo.Students');
			store.load({
				callback: function(records) {
					form.down('combobox').setValue(records);
				}
			});
		}
	},
	bbar: [{
		text: 'save',
		handler: function() {
			console.log(this.up('form').down('combobox').getValue());
			console.log(this.up('form').down('util_comboboxtree').getValue());
		}

	}]

});

