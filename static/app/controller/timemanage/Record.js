Ext.define('Outlier.controller.timemanage.Record', {
	extend: 'Ext.app.Controller',
	views: ['timemanage.record.Main'],

	refs: [{
		selector: 'timemanage_record_tab',
		ref: 'tab'
	},
	{
		selector: 'timemanage_record_main datefield',
		ref: 'datefield'
	}],
	init: function() {
		this.control({
			'timemanage_record_tab': {
				render: this.onRenderTab
			},
			'timemanage_record_main datefield': {
				change: this.onChangeDate
			}
		});
	},

	onRenderTab: function() {
		this.setTabTitle();

		var date = this.getDatefield().getValue();
		this.setActiveTab(date);
	},

	setTabTitle: function() {
		var titles = ['一', '二', '三', '四', '五', '六', '七'],
		i,
		length = titles.length,
		tab = this.getTab();

		for (i = 0; i < length; i++) {
			tab.add({
				title: '星期' + titles[i]
			});
		}
	},

	setActiveTab: function(date) {
		var day = this.getDay(date);
		this.getTab().setActiveTab(day);
	},

	//由日期得到星期几,星期一为0
	getDay: function(date) {
		var day = date.getDay();
		return day === 0 ? 6: day - 1;
	},

	onChangeDate: function(field, value) {
		this.setActiveTab(value);
	}
});

