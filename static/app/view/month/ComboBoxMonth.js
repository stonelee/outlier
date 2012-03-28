Ext.define('Outlier.view.month.ComboBoxMonth', {
	extend: 'Ext.form.field.Picker',
	alias: 'widget.util_comboboxmonth_field',

	format: 'Y-m',

	initValue: function() {
		var me = this,
		value = me.value;

		if (Ext.isString(value)) {
			me.value = me.rawToValue(value);
		}

		me.callParent();
	},

	rawToValue: function(rawValue) {
		return this.parseDate(rawValue) || rawValue || null;
	},

	valueToRaw: function(value) {
		return this.formatDate(this.parseDate(value));
	},

	parseDate: function(value) {
		if (!value || Ext.isDate(value)) {
			return value;
		}
		return Ext.Date.parse(value, this.format);
	},

	formatDate: function(date) {
		return Ext.isDate(date) ? Ext.Date.dateFormat(date, this.format) : date;
	},

	createPicker: function() {
		var me = this;
		var picker = me.picker = Ext.create('Ext.picker.Month', {
			pickerField: me,
			floating: true,
			value: this.value
		});
		me.mon(picker, {
			cancelclick: me.onCancelClick,
			okclick: me.onOkClick,
			yeardblclick: me.onOkClick,
			monthdblclick: me.onOkClick,
			scope: me
		});
		return picker;
	},

	alignPicker: function() {
		var me = this,
		picker;

		if (me.isExpanded) {
			picker = me.getPicker();
			//取消自动设置宽度
			if (picker.isFloating()) {
				me.doAlign();
			}
		}
	},

	onOkClick: function(picker, value) {
		var me = this,
		month = value[0],
		year = value[1],
		date = new Date(year, month);

		me.setValue(date);
		picker.hide();
	},

	onCancelClick: function() {
		this.picker.hide();
	}
});

