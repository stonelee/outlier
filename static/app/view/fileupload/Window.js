Ext.define('Outlier.view.fileupload.Window', {
	extend: 'Ext.window.Window',
	alias: 'widget.fileupload_window',
	requires: ['Outlier.view.fileupload.FileuploadField'],
	autoShow:true,

	items: [{
		xtype: 'form',
		items: [{
			xtype: 'textfield',
			fieldLabel: 'textfield',
			name: 'text',
			value: 'a'
		},
		{
			xtype: 'util_fileupload_field',
			fieldLabel: '上传',
			value: 'abc',
			name: 'filePath'
		}]
	}],
	bbar: [{
		text: 'save',
		handler: function() {
			console.log(this.up('window').down('form').getValues());
		}
	}]
});

