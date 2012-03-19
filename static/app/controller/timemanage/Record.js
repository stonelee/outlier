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

	//设置tab标题
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

	//更新tab
	updateTab: function(date) {
		this.setDateInTab(date);
		this.setActiveTab(date);
		this.createGrid();
	},

	//在每个tab中保存日期
	setDateInTab: function(date) {
		var dates = this.getDatesOfWeek(date),
		tab = this.getTab(),
		i;

		for (i = 0; i < 7; i++) {
			tab.items.getAt(i).date = dates[i];
		}
	},

	//得到date所在整个星期的7个日期组成的数组
	getDatesOfWeek: function(date) {
		var day = this.getDay(date),
		idate = date.getDate(),
		i,
		d,
		index,
		now = new Date(),
		results = [];

		for (i = 0; i < 7; i++) {
			index = idate + i - day;
			d = new Date(now.setDate(index));
			results.push(d);
		}
		return results;
	},

	//由日期得到星期几,星期一为0
	getDay: function(date) {
		var day = date.getDay();
		return day === 0 ? 6: day - 1;
	},

	setActiveTab: function(date) {
		var day = this.getDay(date);
		var tab = this.getTab();
		tab.setActiveTab(day);
	},

	createGrid: function() {
		var me = this;
		this.loadStoreOfDate(function() {
			var tab = me.getTab().getActiveTab();

			tab.removeAll();
			tab.add({
				xtype: 'timemanage_record_list'
			});

			var date = Ext.Date.format(tab.date, 'Y-m-d');
			tab.down('displayfield').setValue(date);
		});
	},

	loadStoreOfDate: function(callback) {
		var store = this.getTimemanageRecordsStore(),
		extraParams = store.getProxy().extraParams,
		date = this.getTab().getActiveTab().date,
		startDate = date,
		endDate = new Date(new Date().setDate(date.getDate() + 1));

		extraParams.startTime__gte = Ext.Date.format(startDate, 'Y-m-d');
		extraParams.endTime__lte = Ext.Date.format(endDate, 'Y-m-d');
		store.load(callback);
	},

	onTabChange: function(panel, newCard, oldCard) {
		var date = newCard.date;

		oldCard.removeAll();
		this.createGrid();
	},

	/*
     *main
     */
	onChangeDate: function(field, value) {
		this.updateTab(value);
	}
});

