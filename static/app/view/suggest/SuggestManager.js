Ext.define('Outlier.view.suggest.SuggestManager', {
	extend: 'Ext.window.Window',
	alias: 'widget.suggest_manager',
	title: '筛选',
	layout: 'fit',
	autoShow: true,
	resizable: false,
	bodyPadding: 5,
	width: 100,

	initComponent: function(config) {
		var me = this;

		me.items = [me.createSuggestField(), me.createGrid()];
		me.bbar = [{
			text: '确定',
			handler: me.onOK,
			scope: me
		}];

		me.callParent();
	},

	createSuggestField: function() {
		var me = this;
		return {
			xtype: 'container',
			layout: 'hbox',
			items: [{
				xtype: 'combo',
				store: 'demo.Students',
				displayField: 'name',
				queryParam: 'name__startswith',
				minChars: 0,
				emptyText: '请输入人名进行筛选',
				hideTrigger: true,
				flex: 1,
				listeners: {
					specialkey: function(field, e) {
						if (e.getKey() === e.ENTER) {
							me.onAddItem();
						}
					}
				}
			},
			{
				xtype: 'button',
				text: '添加',
				handler: me.onAddItem,
				scope: me
			}]
		};
	},

	onAddItem: function() {
		var combo = this.down('combo');
		var name = combo.getValue();
		this.down('grid').getStore().add({
			name: name
		});
		combo.clearValue();
	},

	createGrid: function() {
		var me = this;
		return {
			xtype: 'grid',
			height: 200,
			store: Ext.create('Ext.data.Store', {
				model: 'Outlier.model.demo.Student',
				data: [],
				proxy: {
					type: 'memory'
				}
			}),
			columns: [{
				text: 'name',
				dataIndex: 'name',
				flex: 1
			},
			{
				xtype: 'actioncolumn',
				align: 'center',
				width: 40,
				header: '操作',
				iconCls: 'icon_delete',
				tooltip: 'delete',
				handler: me.onDeleteGridItem,
				scope: me
			}],
			listeners: {
				render: me.onRenderGrid,
				scope: me
			}
		};
	},

	onDeleteGridItem: function(grid, rowIndex, colIndex) {
		grid.getStore().removeAt(rowIndex);
	},

	onRenderGrid: function() {
		if (this.itemValues) {
			var store = this.down('grid').getStore();
			Ext.each(this.itemValues.split(','), function(name) {
				store.add({
					name: name
				});
			});
		}
	},

	onOK: function() {
		var names = [],
		values;
		this.down('grid').getStore().each(function(record) {
			names.push(record.get('name'));
		});
		this.value = names.join(',');
		this.close();
	}

});

