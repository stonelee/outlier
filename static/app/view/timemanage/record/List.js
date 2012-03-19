Ext.define('Outlier.view.timemanage.record.List', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.timemanage_record_list',
	layout: 'fit',
	border: 0,
	store: 'timemanage.Records',
	columns: [{
		header: 'startTime',
		dataIndex: 'startTime',
		xtype: 'datecolumn',
		format: 'H:i:s'
	},
	{
		header: 'endTime',
		dataIndex: 'endTime',
		xtype: 'datecolumn',
		format: 'H:i:s'
	},
	{
		header: 'tag',
		dataIndex: 'tag'
	},
	{
		header: 'content',
		dataIndex: 'content',
		flex: 1
	}],
	tbar: [{
		xtype: 'displayfield',
		fieldLabel: '当前日期',
		labelWidth: 60,
		width: 200
	},
	'-', {
		xtype: 'button',
		text: 'add'
	}]
});

