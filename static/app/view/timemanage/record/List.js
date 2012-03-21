Ext.define('Outlier.view.timemanage.record.List', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.timemanage_record_list',
	layout: 'fit',
	border: 0,
	store: 'timemanage.Records',
	columns: [{
		header: 'id',
		dataIndex: 'id'
	},
	{
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
		dataIndex: 'tag',
		editor: {
			allowBlank: false
		}
	},
	{
		header: 'content',
		dataIndex: 'content',
		flex: 1,
		editor: {
			allowBlank: false
		}
	}],

	tbar: [{
		xtype: 'displayfield',
		fieldLabel: '当前日期',
		labelWidth: 60,
		width: 200
	},
	'-', {
		text: '添加',
		action: 'add'
	},
	{
		text: '删除',
		action: 'del',
		disabled: true
	}],

	initComponent: function() {
		this.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			autoCancel: false,
			listeners: {
				'edit': function(grid) {
					grid.store.sync();
				},
				'canceledit': function(grid) {
					if (grid.record.getId() === 0) {
						grid.store.removeAt(0);
					}
				}
			}
		});
		this.plugins = [this.rowEditing];

		this.callParent();
	},

	listeners: {
		'selectionchange': function(view, records) {
			this.down('button[action=del]').setDisabled(!records.length);
		}
	}
});

