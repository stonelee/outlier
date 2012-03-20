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
	},
	{
		selector: 'timemanage_record_list',
		ref: 'grid'
	}],

	init: function() {
		this.control({
			'timemanage_record_tab': {
				render: this.onRenderTab,
				tabchange: this.onTabChange
			},
			'timemanage_record_main datefield': {
				change: this.onChangeDate
			},
			'timemanage_record_list button[action=add]': {
				click: this.onAddRecord
			},
			'timemanage_record_list button[action=del]': {
				click: this.onDelRecord
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
				title: '星期' + titles[i],
				layout: 'fit'
			});
		}
	},

	//更新tab
	updateTab: function(date) {
		this.setDateInTab(date);

		var day = this.getDay(date),
		tab = this.getTab();
		if (tab.items.indexOf(tab.getActiveTab()) === day) {
			this.loadStoreOfWeek(this.createGrid);
		}
		else {
			this.loadStoreOfWeek(function() {
				tab.setActiveTab(day);
			});
		}
	},

	//在每个tab中保存日期,在tab中保存整个星期的日期
	setDateInTab: function(date) {
		var dates = this.getDatesOfWeek(date),
		tab = this.getTab(),
		i;

		tab.dates = dates;
		for (i = 0; i < 7; i++) {
			tab.items.getAt(i).date = dates[i];
		}
	},

	//得到date所在整个星期的7个日期组成的数组
	getDatesOfWeek: function(date) {
		var day = this.getDay(date),
		i,
		d,
		results = [];

		for (i = 0; i < 7; i++) {
			d = this.modifyDay(date, (i - day));
			results.push(d);
		}
		return results;
	},

	//由日期得到星期几,星期一为0
	getDay: function(date) {
		var day = date.getDay();
		return day === 0 ? 6: day - 1;
	},

	loadStoreOfWeek: function(callback) {
		var store = this.getTimemanageRecordsStore(),
		extraParams = store.getProxy().extraParams,
		tab = this.getTab(),
		startDate = tab.dates[0],
		endDate = tab.dates[6];
		endDate = this.modifyDay(tab.dates[6], 1);

		extraParams.startTime__gte = Ext.Date.format(startDate, 'Y-m-d');
		extraParams.endTime__lte = Ext.Date.format(endDate, 'Y-m-d');
		store.load({
			scope: this,
			callback: callback
		});
	},

	createGrid: function() {
		var store = this.getTimemanageRecordsStore(),
		tab = this.getTab().getActiveTab(),
		date = tab.date,
		startDate = date,
		endDate = this.modifyDay(date, 1);

		store.clearFilter();
		store.filter([{
			filterFn: function(item) {
				return item.get("startTime") >= startDate;
			}
		},
		{
			filterFn: function(item) {
				return item.get("endTime") <= endDate;
			}
		}]);

		tab.removeAll();
		tab.add({
			xtype: 'timemanage_record_list'
		});

		var displayDate = Ext.Date.format(date, 'Y-m-d');
		tab.down('displayfield').setValue(displayDate);
	},

	//改变日期,+num天
	modifyDay: function(date, num) {
		var d = new Date(new Date().setDate(date.getDate() + num));
		return Ext.Date.clearTime(d);
	},

	onTabChange: function(panel, newCard, oldCard) {
		oldCard.removeAll();
		this.createGrid();
	},

	/*
     *main
     */
	onChangeDate: function(field, value) {
		this.updateTab(value);
	},

	/*
	 *list
	 */
	onAddRecord: function() {
		var gridRowEditing = this.getGrid().rowEditing;
		gridRowEditing.cancelEdit();

		var store = this.getTimemanageRecordsStore();
		store.insert(0, {
			id: - 1
		});

		gridRowEditing.startEdit(0, 0);
	},

	onDelRecord: function() {
		var grid = this.getGrid(),
		store = this.getTimemanageRecordsStore();

		grid.rowEditing.cancelEdit();

		Ext.MessageBox.confirm('友情提示', '确定删除?', function(btn) {
			if (btn === 'yes') {
				store.remove(grid.getSelectionModel().getSelection());
				store.sync();
			}
		});
	}

});

