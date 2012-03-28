Ext.define('Outlier.view.month.Main', {
	extend: 'Ext.form.Panel',
	alias: 'widget.month_main',
	requires: ['Outlier.view.month.ComboBoxMonth'],
	items: [{
		xtype: 'datefield',
		fieldLabel: 'datefield',
		format:'Y-m-d',
		value:new Date()
	},{
		xtype: 'util_comboboxmonth_field',
		fieldLabel: 'util_combobox month_field',
		value:new Date()
	}],
	bbar: [{
		text: 'save',
		handler: function() {
			console.log(this.up('form').getValues());
		}

	}]

});

