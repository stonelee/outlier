Ext.Loader.setConfig({
	enabled: true,
	disableCaching: false
});

Ext.Loader.setPath({
	Ext:'static/extjs/src',
	Outlier:'static/app'
});

Ext.require('Outlier.store.demo.Students');

Ext.require(['Outlier.view.fileupload.LinkField']);
Ext.require(['Outlier.view.displayfield.RenderDisplayField','Outlier.view.displayfield.DateDisplayField','Outlier.view.displayfield.BoolDisplayField','Outlier.view.displayfield.MultiField']);

Ext.application({
	name: 'Outlier',
	appFolder: 'static/app',
	autoCreateViewport: true,
	controllers: ['Main', 'Comboboxtree','demo.Student','timemanage.Analyse', 'timemanage.Record']
});

