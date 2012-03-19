Ext.define('Outlier.controller.timemanage.Record', {
	extend: 'Ext.app.Controller',
	views: ['timemanage.record.Main'],

	refs: [{
		selector: 'timemanage_record_tab',
		ref: 'tab'
	}],
	init: function() {
		this.control({
			'timemanage_record_tab': {
				render: this.onRenderTab
			}
		});
	},

	onRenderTab: function() {
		var titles = ['一', '二', '三', '四', '五', '六', '七'],
		i,
		length = titles.length,
		tab = this.getTab();

		for (i = 0; i < length; i++) {
			tab.add({
				title: '星期' + titles[i]
			});
		}
	}
});

