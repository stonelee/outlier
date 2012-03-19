Ext.Loader.setConfig({
	enabled: true,
	disableCaching: true
});

Ext.application({
	name: 'Outlier',
	appFolder: 'static/app',
	autoCreateViewport: true,
	controllers: ['Main', 'timemanage.Analyse', 'timemanage.Record']
});

