/*
 *@author: stonelee 
 *@email: istonelee@gmail.com
 *@blog: http://stonelee.info
 *@description: 文件上传field
 */

Ext.define('Outlier.view.fileupload.FileuploadField', {
	extend: 'Ext.form.FieldContainer',
	alias: 'widget.util_fileupload_field',
	requires: ['Outlier.view.fileupload.LinkField'],
	layout: 'hbox',

	//组件显示名称
	fieldLabel: 'fileuploadField',
	//组件对应name
	name: '',
	//上传路径
	url: 'upload',
	//上传后的显示文字是否是超链接
	useLinkField: true,

	initComponent: function() {
		this.items = [this.createDisplayfield(), this.createFilefield(), this.createDelbtn()];
		this.callParent();
		this.showFilefield();
	},

	createDisplayfield: function() {
		var me = this,
		xtype;
		if (this.useLinkField === true) {
			xtype = 'util_link_field';
		} else {
			xtype = 'displayfield';
		}
		return {
			xtype: xtype,
			itemId: 'fileuploadDisplayfield',
			//可以提交value
			submitValue: true,

			name: me.name,
			flex: 1,
			listeners: {
				change: function() {
					if (this.getValue()) {
						//已经上传了文件
						me.showDisplayField();
					} else {
						me.showFilefield();
					}
				}
			}
		};
	},

	createFilefield: function() {
		var me = this;
		return {
			xtype: 'form',
			border: 0,
			flex: 1,
			items: [{
				xtype: 'filefield',
				name: 'file',
				emptyText: '请选择要上传的文件',
				anchor: '100%',
				buttonText: '上传',
				margin: 0,
				listeners: {
					'change': function(field, value) {
						//IE8下会提交两次，第二次为空字符串
						if (value !== '') {
							me.upload(value);
						}
					}
				}
			}]
		};
	},

	createDelbtn: function() {
		var me = this;
		return {
			xtype: 'button',
			text: '删除',
			action: 'delete',
			handler: function() {
				Ext.MessageBox.confirm(CONSTS.CONFIRM_DELETE_TITLE, '您确定要删除该文件吗?', function(btn) {
					if (btn === 'yes') {
						me.down('form').down('filefield').reset();
						me.down('#fileuploadDisplayfield').setValue('');
						me.showFilefield();
					}
				});
			}
		};
	},

	upload: function(value) {
		var me = this;
		me.down('form').submit({
			url: me.url,
			waitTitle: '上传进度',
			waitMsg: '正在上传文件...',
			success: function(form, action) {
				if (action.result) {
					var filepath = action.result.data;
					Ext.Msg.alert('成功', '您的文件已经上传为:' + filepath);
					me.down('#fileuploadDisplayfield').setValue(filepath);
					me.showDisplayField();

					if (Ext.isFunction(me.onSuccess)) {
						me.onSuccess(filepath, action);
					}
				}
			},
			failure: function(form, action) {
				Ext.Msg.alert('失败', '上传失败');
				if (Ext.isFunction(me.onFail)) {
					me.onFail(action);
				}
			}
		});
	},

	showFilefield: function() {
		this.down('#fileuploadDisplayfield').hide();
		this.down('button').hide();
		this.down('form').show();
	},

	showDisplayField: function() {
		this.down('#fileuploadDisplayfield').show();
		this.down('button').show();
		this.down('form').hide();
	}

});

