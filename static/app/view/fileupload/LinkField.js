/*
 *@author: stonelee 
 *@email: istonelee@gmail.com
 *@blog: http://stonelee.info
 *@description: 带可点击链接的field
 */

Ext.define('Outlier.view.fileupload.LinkField', {
	extend: 'Ext.form.field.Display',
	alias: 'widget.util_link_field',

	//链接url，默认链接与显示value一致
	href: '',

	//可以提交value
	submitValue: true,

	setRawValue: function(value) {
		var me = this;
		value = Ext.value(value, '');
		me.rawValue = value;
		if (me.rendered) {
			var val = me.htmlEncode ? Ext.util.Format.htmlEncode(value) : value;
			Ext.DomHelper.overwrite(me.inputEl.dom, {
				tag: 'a',
				href: me.href || val,
				html: val,
				target: '_blank'
			});

		}
		return value;
	}
});

