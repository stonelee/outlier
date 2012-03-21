Ext.define('Outlier.view.demo.Main', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.demo_main',
	layout: 'fit',
	border: 0,
	store: 'demo.Students',
	columns: [{
		header: 'id',
		dataIndex: 'id'
	},
	{
		header: 'name',
		dataIndex: 'name'
	}],

	listeners: {
		'afterrender': function() {
			this.addDocked({
				xtype: 'pagingtoolbar',
				store: this.store,
				dock: 'bottom',
				displayInfo: true
			});
		}
	}
});

