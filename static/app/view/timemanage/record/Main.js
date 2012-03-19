Ext.define('Outlier.view.timemanage.record.Main', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.timemanage_record_main',
	layout: 'fit',
	requires: ['Outlier.view.timemanage.record.Tab'],
	border: 0,
	items: [{
		margin: 1,
		xtype: 'timemanage_record_tab'
	}],

	tbar: [{
		xtype: 'datefield',
		fieldLabel: '选择日期',
		name: 'date',
		format: 'Y-m-d',
		value: new Date()
	}]
});

