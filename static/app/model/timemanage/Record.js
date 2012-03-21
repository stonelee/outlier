Ext.define('Outlier.model.timemanage.Record', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'id',
		type: 'int',
		persist: false
	},
	{
		name: 'startTime',
		type: 'date',
		dateFormat: 'c'
	},
	{
		name: 'endTime',
		type: 'date',
		dateFormat: 'c'
	},
	{
		name: 'tag',
		type: 'string'
	},
	{
		name: 'content',
		type: 'string'
	}]
});

