Ext.Loader.setConfig({
	enabled: true,
	disableCaching: false
});

Ext.application({
	name: 'Outlier',
	appFolder: 'static/app',
	autoCreateViewport: true,
	controllers: ['Main', 'Comboboxtree','demo.Student','timemanage.Analyse', 'timemanage.Record']
});

