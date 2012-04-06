Ext.define('Outlier.view.displayfield.BoolDisplayField', {
	extend: 'Outlier.view.displayfield.RenderDisplayField',
	alias: 'widget.util_bool_display_field',

	renderer: function(value) {
		if (value === true) {
			value = '是';
		} else if (value === false) {
			value = '否';
		}
		return value;
	}
});

