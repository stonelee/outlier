Ext.define('Outlier.controller.Main', {
	extend: 'Ext.app.Controller',
	stores: ['Menus'],

	refs: [{
		selector: 'main',
		ref: 'main'
	}],
	init: function() {
		this.control({
			'side': {
				select: this.onSelect
			}
		});
	},

	onSelect: function(rowModel, record) {
		if (record.get('leaf')) {
			this.getMain().removeAll();

			var xtype = record.get('id') + '_main';
			this.getMain().add({
				xtype: xtype
			});
		}
	}
});

