Ext.define('Outlier.view.suggest.SuggestTextField', {
	extend: 'Ext.form.FieldContainer',
	alias: 'widget.suggest_text_field',
	requires: ['Outlier.view.suggest.SuggestManager'],

	//TODO:固定宽度
	width: 255,
	layout: 'hbox',
	//name: 'suggest_text_field',
	text: '筛选',

	initComponent: function(config) {
		var me = this;
		me.items = [me.createTextField(), me.createButton()];
		me.callParent();
	},

	createTextField: function() {
		return {
			xtype: 'textfield',
			name: this.name,
			flex: 1
		};
	},

	createButton: function() {
		var me = this;
		return {
			xtype: 'button',
			text: this.text,
			handler: function() {
				me.manager = Ext.widget('suggest_manager', {
					itemValues: me.down('textfield').getValue()
				});
				me.manager.on({
					beforeclose: me.onManagerClose,
					scope: me
				});
			}
		};
	},

	onManagerClose: function() {
		var value = this.manager.value;
		if (value) {
			this.down('textfield').setValue(value);
		}
	}
});

