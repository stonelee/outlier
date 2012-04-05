Ext.Loader.setConfig({
	enabled: true,
	disableCaching: true
});

Ext.Loader.setPath({
	Ext:'static/extjs/src',
	Outlier:'static/app'
});

Ext.require('Outlier.store.demo.Students');

Ext.application({
	name: 'Outlier',
	appFolder: 'static/app',
	autoCreateViewport: true,
	controllers: ['Main', 'Comboboxtree','demo.Student','timemanage.Analyse', 'timemanage.Record']
});

