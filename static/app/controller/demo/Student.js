Ext.define('Outlier.controller.demo.Student', {
	extend: 'Ext.app.Controller',
	views: ['demo.Main'],
	stores: ['demo.Students'],
	init: function() {
		this.control({
			'demo_main': {
				render: this.onRender
			}
		});
	},
	onRender: function() {
		this.getDemoStudentsStore().load();
	}
});

