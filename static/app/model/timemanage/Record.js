Ext.define('Outlier.model.timemanage.Record', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'id',
		type: 'int'
	},
	{
		name: 'startTime',
		type: 'date'
	},
	{
		name: 'endTime',
		type: 'date'
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

