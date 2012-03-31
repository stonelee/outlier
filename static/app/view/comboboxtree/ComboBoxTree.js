Ext.define('Outlier.view.comboboxtree.ComboBoxTree', {
	extend: 'Ext.form.field.Picker',
	alias: 'widget.util_comboboxtree',

	displayField: 'text',
	valueField: 'id',
	delimiter: ', ',
	pickerHeight: 200,
	editable: false,

	//多选
	multiSelect: false,
	//级联选择
	cascadeSelect: false,

	initComponent: function() {
		var me = this;

		if (!me.displayTpl) {
			me.displayTpl = Ext.create('Ext.XTemplate', '<tpl for=".">' + '{[typeof values === "string" ? values : values["' + me.displayField + '"]]}' + '<tpl if="xindex < xcount">' + me.delimiter + '</tpl>' + '</tpl>');
		} else if (Ext.isString(me.displayTpl)) {
			me.displayTpl = Ext.create('Ext.XTemplate', me.displayTpl);
		}

		me.callParent();
	},

	createPicker: function() {
		var me = this;

		var picker = me.picker = Ext.create('Ext.tree.Panel', {
			pickerField: me,
			floating: true,

			store: this.store,
			displayField: this.displayField,
			rootVisible: false,
			height: this.pickerHeight,
			autoScroll: true
		});
		me.mon(picker, {
			load: me.onLoadPicker,
			itemclick: me.onItemClick,
			checkchange: me.onCheckChange,
			scope: me
		});
		return picker;
	},

	onLoadPicker: function(store, rootNode) {
		if (this.multiSelect) {
			this.setChildrenCheckValue(rootNode, false);
		}
		this.setChildrenLeaf(rootNode);
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
		if (this.cascadeSelect) {
			this.setChildrenCheckValue(node, checked);
			this.setParentCheckValue(node, checked);
		}

		var records = this.picker.getView().getChecked(),
		i,
		len,
		leafRecords = [];
		for (i = 0, len = records.length; i < len; i++) {
			if (this.cascadeSelect) {
				if (records[i].isLeaf()) {
					leafRecords.push(records[i]);
				}
			} else {
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

	setChildrenLeaf: function(node) {
		var me = this;
		if (node.hasChildNodes()) {
			node.eachChild(function(n) {
				me.setChildrenLeaf(n);
			});
		}
		else {
			node.set('leaf', true);
		}
	},

	setValue: function(value) {
		var me = this,
		i, len, record, displayTplData = [],
		processedValue = [];

		value = Ext.Array.from(value);

		for (i = 0, len = value.length; i < len; i++) {
			record = value[i];
			if (!record.isModel) {
				record = this.store.getNodeById(record);
			}
			if (record) {
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

