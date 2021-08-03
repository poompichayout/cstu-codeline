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
		gender: {
			type: String,
			required: true,
		},
		picture_href: {
			type: String,
			required: true,
		},
		birthdate: {
			type: String,
			required: false,
		},
	},
	{ timestamps: false }
);

let Freshmen = model('freshmens', FreshmenSchema);

export default Freshmen;
