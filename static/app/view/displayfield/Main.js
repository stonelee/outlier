Ext.define('Outlier.view.displayfield.Main', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.displayfield_main',

	items: [{
		xtype: 'form',
		items: [{
			xtype: 'util_date_display_field',
			fieldLabel: 'date',
			name: 'date'
		},
		{
			xtype: 'util_bool_display_field',
			fieldLabel: 'bool',
			name: 'bool'
		},
		{
			xtype: 'util_multi_field',
			fieldLabel: 'list1',
			name: 'list1',
			itemType: 'util_link_field'
		},
		{
			xtype: 'util_multi_field',
			fieldLabel: 'list2',
			name: 'list2',
			layoutType: 'hbox'
		},
		{
			xtype: 'util_multi_field',
			fieldLabel: 'list3',
			name: 'list3',
			layoutType: 'table'
		}]
	}],
	listeners: {
		render: function() {
			Ext.define('mymodel', {
				extend: 'Ext.data.Model',
				fields: [{
					name: 'date',
					type: 'date'
				},
				{
					name: 'bool',
					type: 'boolean'
				},
				{
					name: 'list1',
					type: 'string'
				},
				{
					name: 'list2',
					type: 'string'
				},
				{
					name: 'list3',
					type: 'string'
				}]
			});
			var model = Ext.create('mymodel', {
				date: new Date(),
				bool: false,
				list1: '11111111111111111111111111111,222222222222222222222222,3333333333333333333',
				list2: '11111111111111111111111111111,222222222222222222222222,3333333333333333333',
				list3: '11111111111111111111111111111,222222222222222222222222,3333333333333333333,4444444444444444444444'
			});
			this.down('form').loadRecord(model);
		}
	}
});

