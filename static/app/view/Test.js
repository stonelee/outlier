Ext.define('Outlier.view.Test', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.test',
	layout: 'fit',
	requires: ['Outlier.view.timemanage.record.Main'],
	items: [{
		xtype: 'timemanage_record_main'
	}]
});

