Ext.define('Outlier.view.timemanage.record.Main', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.timemanage_record_main',
	layout: 'fit',
	requires: ['Outlier.view.timemanage.record.Tab'],
	items: [{
		xtype: 'timemanage_record_tab'
	}],
	tbar: [{
		xtype: 'button',
		text: 'idf'
	}]
});

