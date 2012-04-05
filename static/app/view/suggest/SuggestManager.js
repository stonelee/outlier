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
				store: me.store,
				displayField: me.displayField,
				queryParam: me.queryParam,
				emptyText: me.emptyText,
				minChars: 0,
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
		var me = this,
		combo = this.down('combo'),
		value = combo.getValue();

		var model = me.store.findRecord(me.displayField, value);
		if (model) {
			var store = me.down('grid').getStore();
			if (store.getById(model.getId()) === null) {
				store.add(model);
			}
			else {
				Ext.Msg.alert('提示', value + '已存在');
			}
		}
		else {
			Ext.Msg.alert('提示', value + '不存在');
		}

		combo.clearValue();
	},

	createGrid: function() {
		var me = this;

		return {
			xtype: 'grid',
			height: 200,

			columns: [{
				text: '名称',
				dataIndex: me.displayField,
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

			viewConfig: {
				plugins: {
					ptype: 'gridviewdragdrop',
					dragText: '拖动进行排序'
				}
			},

			listeners: {
				afterrender: me.onRenderGrid,
				scope: me
			}
		};
	},

	onDeleteGridItem: function(grid, rowIndex, colIndex) {
		grid.getStore().removeAt(rowIndex);
	},

	onRenderGrid: function(grid) {
		var me = this;
		var store = Ext.create('Ext.data.Store', {
			model: me.down('combo').getStore().model,
			data: [],
			proxy: {
				type: 'memory'
			}
		});
		grid.reconfigure(store);

		if (this.itemValues) {
			Ext.each(this.itemValues, function(item) {
				store.add(item);
			});
		}
	},

	onOK: function() {
		this.value = this.down('grid').getStore().getRange();
		this.close();
	}

});

