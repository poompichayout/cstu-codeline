import { Schema, model } from 'mongoose';

const FreshmenSchema = new Schema(
	{
		student_id: {
			type: String,
			required: true,
		},
		raw_name: {
			type: String,
			required: true,
		},
		nickname: {
			type: String,
			required: true,
		},
		eldercode: {
			type: String,
			required: true,
		},
		birthday: {
			type: Date,
			required: false,
		},
	},
	{ timestamps: false }
);

let Freshmen = model('freshmens', FreshmenSchema);

export default Freshmen;
