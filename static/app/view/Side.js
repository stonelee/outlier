Ext.define('Outlier.view.Side', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.side',
	title: 'menus',
	store: 'Menus',
	rootVisible: false,
	autoScroll: true,

	width: 150,
	minWidth: 130,
	margin: '2 0 2 0',
	split: true,
	collapsible: true
});

