Ext.define('Outlier.view.displayfield.MultiField', {
	extend: 'Ext.form.FieldContainer',
	alias: 'widget.util_multi_field',

	layoutType: 'vbox',
	delimiter: ',',
	itemType: 'displayfield',
	tableColumns: 2,

	initComponent: function() {
		var me = this;
		me.items = [{
			xtype: 'hiddenfield',
			name: me.name,
			setValue: function(value) {
				me.setValue.apply(me, arguments);
				return Ext.form.field.Hidden.prototype.setValue.call(this, value);
			}
		}];
		this.callParent();
	},

	setValue: function(value) {
		if (value) {
			var values = value.split(this.delimiter);

			var layoutConfig = this.getLayoutConfig(values);
			Ext.apply(this, layoutConfig);

			this.addItems(values);
		}
	},

	getLayoutConfig: function(values) {
		var len = values.length,
		layoutConfig = {
			table: {
				layout: {
					type: 'table',
					columns: this.tableColumns
				},
				style: {
					marginBottom: 0
				}
			},
			hbox: {
				layout: 'hbox',
				style: {
					marginBottom: 0
				}
			},
			vbox: {
				layout: 'vbox',
				height: 17 * len + 5 * (len - 1)
			}
		};
		return layoutConfig[this.layoutType];
	},

	addItems: function(values) {
		var me = this,
		i, len = values.length;
		for (i = len - 1; i >= 0; i--) {
			me.insert(0, {
				xtype: me.itemType,
				value: values[i]
			});
		}
	}
});

