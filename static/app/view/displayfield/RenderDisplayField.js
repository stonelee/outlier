Ext.define('Outlier.view.displayfield.RenderDisplayField', {
	extend: 'Ext.form.field.Display',
	alias: 'widget.util_render_display_field',

	renderer:Ext.emptyFn,

	setValue: function(value) {
		value = this.renderer(value);
		return this.callParent([value]);
	}

});

