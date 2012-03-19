Ext.define('Outlier.controller.timemanage.Record', {
	extend: 'Ext.app.Controller',
	views: ['timemanage.record.Main', 'timemanage.record.List'],
	stores: ['timemanage.Records'],

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
				render: this.onRenderTab,
				tabchange: this.onTabChange
			},
			'timemanage_record_main datefield': {
				change: this.onChangeDate
			}
		});
	},

	/*
     *tab
     */
	onRenderTab: function() {
		this.setTabTitle();

		var date = this.getDatefield().getValue();
		this.updateTab(date);
	},

	setTabTitle: function() {
		var titles = ['一', '二', '三', '四', '五', '六', '日'],
		i,
		length = titles.length,
		tab = this.getTab();

		for (i = 0; i < length; i++) {
			tab.add({
				title: '星期' + titles[i]
			});
		}
	},

	updateTab: function(date) {
		this.setActiveTab(date);
		var tab = this.getTab();
		console.log(tab);
		//TODO:在每个tab中保存日期
		this.setGrid();
	},

	setActiveTab: function(date) {
		var day = this.getDay(date);
		var tab = this.getTab();
		tab.setActiveTab(day);
	},

	//由日期得到星期几,星期一为0
	getDay: function(date) {
		var day = date.getDay();
		return day === 0 ? 6: day - 1;
	},

	setGrid: function() {
		var tab = this.getTab().getActiveTab();

		tab.removeAll();
		tab.add({
			xtype: 'timemanage_record_list'
		});
		this.getTimemanageRecordsStore().load();
	},

	onTabChange: function(panel, newCard) {},

	/*
     *main
     */
	onChangeDate: function(field, value) {
		this.updateTab(value);
	}
});

