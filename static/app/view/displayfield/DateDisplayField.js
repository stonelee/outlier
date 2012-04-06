Ext.define('Outlier.view.displayfield.DateDisplayField', {
	extend: 'Outlier.view.displayfield.RenderDisplayField',
	alias: 'widget.util_date_display_field',

	dateFormat: 'Y-m-d',

	renderer: function(value) {
		if (Ext.isDate(value)) {
			return Ext.Date.format(value, this.dateFormat);
		}
		return value;
	}

});

