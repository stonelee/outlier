Ext.Loader.setConfig({
	enabled: true,
	disableCaching: false
});

Ext.application({
	name: 'Outlier',
	appFolder: 'static/app',
	autoCreateViewport: true,
	controllers: ['Main', 'timemanage.Analyse', 'timemanage.Record']
});

