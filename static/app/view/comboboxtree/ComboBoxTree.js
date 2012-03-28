Ext.define('Outlier.view.comboboxtree.ComboBoxTree', {
	extend: 'Ext.form.field.Picker',
	alias: 'widget.util_comboboxtree',

	displayField: 'text',
	valueField: 'id',
	delimiter: ', ',
	pickerHeight: 200,
	multiSelect: false,

	initComponent: function() {
		var me = this;

		me.bindStore(me.store || 'ext-empty-store', true);

		if (!me.displayTpl) {
			me.displayTpl = Ext.create('Ext.XTemplate', '<tpl for=".">' + '{[typeof values === "string" ? values : values["' + me.displayField + '"]]}' + '<tpl if="xindex < xcount">' + me.delimiter + '</tpl>' + '</tpl>');
		} else if (Ext.isString(me.displayTpl)) {
			me.displayTpl = Ext.create('Ext.XTemplate', me.displayTpl);
		}

		me.callParent();
	},

	bindStore: function(store, initial) {
		var me = this,
		oldStore = me.store;

		// this code directly accesses this.picker, bc invoking getPicker
		// would create it when we may be preping to destroy it
		if (oldStore && ! initial) {
			if (oldStore !== store && oldStore.autoDestroy) {
				oldStore.destroyStore();
			} else {
				oldStore.un({
					scope: me,
					exception: me.collapse
				});
			}
			if (!store) {
				me.store = null;
			}
		}
		if (store) {
			me.store = Ext.data.StoreManager.lookup(store);
			me.store.on({
				scope: me,
				exception: me.collapse
			});
		}
	},

	onDestroy: function() {
		this.bindStore(null);
		this.callParent();
	},

	createPicker: function() {
		var me = this;
		var picker = me.picker = Ext.create('Ext.tree.Panel', {
			pickerField: me,
			floating: true,

			store: this.store,
			rootVisible: false,
			height: this.pickerHeight,
			autoScroll: true
		});
		me.mon(picker, {
			itemclick: me.onItemClick,
			checkchange: me.onCheckChange,
			scope: me
		});
		return picker;
	},

	alignPicker: function() {
		var me = this,
		picker;

		if (me.isExpanded) {
			picker = me.getPicker();
			if (me.matchFieldWidth) {
				//不自动设置高度
				picker.setSize(me.bodyEl.getWidth());
			}
			if (picker.isFloating()) {
				me.doAlign();
			}
		}
	},

	onItemClick: function(view, record, item) {
		if (!this.multiSelect) {
			this.setValue(record);
			this.collapse();
		}
	},

	onCheckChange: function(node, checked) {
		this.setChildrenCheckValue(node, checked);
		this.setParentCheckValue(node, checked);

		var records = this.picker.getView().getChecked(),
		i,
		len,
		leafRecords = [];
		for (i = 0, len = records.length; i < len; i++) {
			if (records[i].isLeaf()) {
				leafRecords.push(records[i]);
			}
		}
		this.setValue(leafRecords);
	},

	//选中parent，则所有层次children全部选中,取消则全部取消
	setChildrenCheckValue: function(node, checked) {
		var me = this;
		if (node.hasChildNodes()) {
			node.eachChild(function(n) {
				me.setChildrenCheckValue(n, checked);
			});
		}
		node.set('checked', checked);
	},

	//取消选中，则所有层次父节点都取消选中；
	//选中，如果本级全部选中，则直接父节点选中,依次类推
	setParentCheckValue: function(node, checked) {
		var me = this;
		node.bubble(function(pNode) {
			if (checked === false) {
				pNode.set('checked', false);
			}
			else {
				if (me.childrenAllChecked(pNode) === true) {
					pNode.set('checked', true);
				}
			}
		});
	},

	childrenAllChecked: function(node) {
		var allChecked = true;
		node.eachChild(function(n) {
			if (n.get('checked') === false) {
				allChecked = false;
				return false;
			}
		});
		return allChecked;
	},

	setValue: function(value) {
		var me = this,
		i, len, record, models = [],
		displayTplData = [],
		processedValue = [];

		value = Ext.Array.from(value);

		for (i = 0, len = value.length; i < len; i++) {
			record = value[i];
			if (!record.isModel) {
				record = this.store.getNodeById(record);
			}
			if (record) {
				models.push(record);
				displayTplData.push(record.data);
				processedValue.push(record.get(me.valueField));
			}
			else {
				displayTplData.push(value[i]);
				processedValue.push(value[i]);
			}
		}
		me.value = me.multiSelect ? processedValue: processedValue[0];
		me.displayTplData = displayTplData; //store for getDisplayValue method
		me.lastSelection = me.valueModels = models;

		me.setRawValue(me.getDisplayValue());
		me.checkChange();

		me.applyEmptyText();
	},

	getDisplayValue: function() {
		return this.displayTpl.apply(this.displayTplData);
	},

	getValue: function() {
		return this.value;
	},

	getSubmitValue: function() {
		return this.getValue();
	}

});

