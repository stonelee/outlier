Ext.define('Outlier.view.fileupload.Main', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.fileupload_main',
	requires: ['Outlier.view.fileupload.Window'],

	bbar: [{
		text: 'edit',
		handler: function() {
			Ext.define('demo',{
				extend:'Ext.data.Model',
				fields:['name','filePath']
			});
			var model=Ext.create('demo',{text:'text','filePath':'filePath'});

			var win=Ext.widget('fileupload_window');
			win.down('form').loadRecord(model);
		}
	}]
});

