Ext.define('Outlier.view.suggest.SuggestTextField', {
	extend: 'Ext.form.FieldContainer',
	alias: 'widget.suggest_text_field',
	requires: ['Outlier.view.suggest.SuggestManager'],

	layout: 'hbox',

	name: 'suggest_text_field',
	valueField: 'id',
	displayField: 'name',
	queryParam: 'query',
	text: '筛选',
	emptyText: '请输入人名进行筛选',

	initComponent: function(config) {
		var me = this;

		me.items = [me.createTextField(), me.createButton()];
		me.bindStore();
		me.callParent();
	},

	createTextField: function() {
		var me = this;
		return {
			xtype: 'textfield',
			name: this.name,
			readOnly:true,
			flex: 1,
			getSubmitValue: function() {
				return me.getSubmitValue.apply(me);
			}
		};
	},

	createButton: function() {
		var me = this;
		return {
			xtype: 'button',
			text: me.text,
			handler: me.onWindowShow,
			scope: me
		};
	},

	onWindowShow: function() {
		var me = this;
		me.manager = Ext.widget('suggest_manager', {
			itemValues: me.getValue(),
			valueField: me.valueField,
			displayField: me.displayField,
			store: me.store,
			queryParam: me.queryParam,
			emptyText: me.emptyText
		});
		me.manager.on({
			beforeclose: me.onManagerClose,
			scope: me
		});
	},

	onManagerClose: function() {
		var value = this.manager.value;
		if (value) {
			this.setValue(value);
		}
	},

	bindStore: function() {
		var me = this,
		store = me.store = Ext.getStore(me.store);
		store.load(function() {
			if (store.getCount() > 0) {
				me.setValue(me.value);
			}
		});
	},

	setValue: function(value) {
		var me = this,
		i, len, record, models = [],
		displayValues = [];

		value = Ext.Array.from(value);
		for (i = 0, len = value.length; i < len; i++) {
			record = value[i];
			if (!record.isModel) {
				record = me.store.getById(record);
			}
			if (record) {
				models.push(record);
				displayValues.push(record.get(me.displayField));
			}
		}
		me.value = models;
		this.down('textfield').setValue(displayValues.join(','));
	},

	getValue: function() {
		return this.value;
	},

	getSubmitValue: function() {
		var me = this,
		models = this.getValue(),
		values = [];

		Ext.each(models, function(model) {
			values.push(model.get(me.valueField));
		});
		return values;
	}
});

