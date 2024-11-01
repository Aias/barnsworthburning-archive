import Airtable from 'airtable';

Airtable.configure({
	endpointUrl: 'https://api.airtable.com',
	apiKey: import.meta.env.VITE_AIRTABLE_ACCESS_TOKEN
});

const base = Airtable.base('appHWZbECVKCSjquH');

const mapReceivedRecord = (record) => ({
	id: record.id,
	...record.fields
});

const airtableFetch = async (tableName = '', options = {}) =>
	base(tableName)
		.select(options)
		.all()
		.then((records) => records.map(mapReceivedRecord))
		.catch((error) => {
			console.error(error);
			return null;
		});

const airtableFind = async (tableName = '', recordId = '') => {
	const records = await airtableFetch(tableName, {
		filterByFormula: `RECORD_ID() = '${recordId}'`
	});
	if (records && records.length) {
		return records[0];
	} else {
		return null;
	}
};

export { airtableFetch, airtableFind };
