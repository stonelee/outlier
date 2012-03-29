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
		value:[1,3,4],
		displayField: 'name'
	},
	{
		xtype: 'util_comboboxtree',
		fieldLabel: 'single comboboxtree',
		store: 'comboboxtree.NormalTrees'
	},
	{
		xtype: 'util_comboboxtree',
		fieldLabel: 'multi comboboxtree',
		store: Ext.create('Outlier.store.comboboxtree.NormalTrees'),
		multiSelect:true
	}],
	listeners: {
		render: function(form) {
			var store = Ext.getStore('demo.Students');
			store.load({
				//callback: function(records) {
					////form.down('combobox').setValue(records);
					//form.down('combobox').setValue([1,3,4]);
				//}
			});
		}
	},
	bbar: [{
		text: 'save',
		handler: function() {
			console.log(this.up('form').getValues());
		}

	}]

});

