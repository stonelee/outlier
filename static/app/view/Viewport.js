Ext.define('Outlier.view.Viewport', {
	extend: 'Ext.container.Viewport',
	layout: 'border',

	//requires: ['Outlier.view.Side', 'Outlier.view.Main'],
	requires: ['Outlier.view.Side', 'Outlier.view.Test'],

	initComponent: function() {
		this.items = [{
			html: 'header',
			region: 'north'
		},
		{
			xtype: 'side',
			region: 'west'
		},
		{
			//xtype: 'main',
			xtype: 'test',
			region: 'center'
		},
		{
			html: 'footer',
			region: 'south'
		}];

		this.callParent();
	}
});

