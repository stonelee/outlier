Ext.define('Outlier.view.Viewport', {
	extend: 'Ext.container.Viewport',
	layout: 'fit',

	requires: ['Outlier.view.Side', 'Outlier.view.Main'],

	initComponent: function() {
		this.items = {
			layout: "border",
			border: 0,
			items: [{
				html: 'header',
				region: 'north'
			},
			{
				xtype: 'side',
				region: 'west'
			},
			{
				xtype: 'main',
				region: 'center'
			},
			{
				html: 'footer',
				region: 'south'
			}]
		};

		this.callParent();
	}
});

