import { Schema, model } from 'mongoose';

const ElderSchema = new Schema(
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
		freshmencode: {
			type: [String],
		},
	},
	{ timestamps: false }
);

let Elder = model('elders', ElderSchema);

export default Elder;
