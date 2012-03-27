Ext.define('Outlier.view.comboboxtree.ComboBoxTree', {
	extend: 'Ext.form.field.Picker',
	alias: 'widget.util_comboboxtree',

	displayField: 'text',
	valueField: 'text',
	delimiter: ', ',

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
					load: me.onLoad,
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
				load: me.onLoad,
				exception: me.collapse
			});
		}
	},

	onLoad: function() {
		//var value = this.value;
		//if (value) {
		//this.setValue(value);
		//}
	},

	onDestroy: function() {
		this.bindStore(null);
		this.callParent();
	},

	createPicker: function() {
		var me = this;
		var picker = me.picker = Ext.create('Ext.tree.Panel', {
			pickerField: me,
			ownerCt: me.ownerCt,
			floating: true,

			store: this.store,
			rootVisible: false,
			height: this.height || 100,
			autoScroll: true
		});
		me.mon(picker, {
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

	onCheckChange: function(node, checked) {
		this.setChildrenCheckValue(node, checked);
		this.setParentCheckValue(node, checked);
		var records = this.picker.getView().getChecked(),
		i,
		len;
		for (i = 0, len = records.length; i < len; i++) {
			if (records[i].isLeaf()) {
				console.log(records[i]);
			}
		}
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
		me.findParents(node, function(pNode) {
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

	findParents: function(node, fn) {
		var pNode = node.parentNode;
		while (pNode !== null) {
			fn(pNode);
			pNode = pNode.parentNode;
		}
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
	}

});

