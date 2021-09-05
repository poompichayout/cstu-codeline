import axios from 'axios';
import express from 'express';
import Elder from '../models/Elder';
import Freshmen from '../models/Freshmen';
import jwt from 'jsonwebtoken';
import { secret } from '../config';
const router = express.Router();

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: 'empty value' });
	}

	const postData = {
		UserName: username,
		PassWord: password,
	};

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Application-Key':
				'TUe74c8be74b87b051576632d8929c2eb645b4c8cd5cf0c4d93d0e23e2e4b8f0f95c8f67fca64b90315cdd72f7cbc42565',
		},
	};

	try {
		const response = await axios.post(
			'https://restapi.tu.ac.th/api/v1/auth/Ad/verify',
			postData,
			config
		);

		var data = await Elder.findOne({ student_id: username }).lean();
		var role = 'elder';
		if (!data) {
			data = await Freshmen.findOne({ student_id: username }).lean();
			role = 'freshmen';
			if (!data) {
				return res.status(400).json({ message: 'ไม่พบข้อมูลสายรหัสของท่าน'});
			}
		}

		if(role === 'elder') {
			const code_id_list = data.code_id.split(";");
			var codeline = await Promise.all(code_id_list.map(async (code_id) => {
				const codeline_data = await Freshmen.findOne({ code_id }).lean();
				return {
					codeline_student_id: codeline_data.student_id,
					codeline_firstname: codeline_data.firstname,
					codeline_lastname: codeline_data.lastname,
					codeline_nickname: codeline_data.nickname,
					codeline_favorite_food: codeline_data.favorite_food,
					codeline_ig: codeline_data.ig,
					codeline_facebook: codeline_data.facebook,
					codeline_wording: codeline_data.wording,
				}
			}))
			
		}

		const sign_data = role === 'freshmen'? {
			student_id: data.student_id,
			firstname: data.firstname,
			lastname: data.lastname,
			nickname: data.nickname,
			role,
			hint1: data.hint1,
			hint2: data.hint2,
			hint3: data.hint3,
			hint4: data.hint4,
		}:
		{
			student_id: data.student_id,
			firstname: data.firstname,
			lastname: data.lastname,
			nickname: data.nickname,
			role,
			codeline,
		}

		let token = jwt.sign(
			sign_data,
			secret,
			{ expiresIn: '6h' }
		);

		let result = {
			token: `Bearer ${token}`,
			expiresIn: 500,
		};

		return res
			.status(201)
			.send({ ...data, message: response.data.message, ...result, role });
	} catch (error) {
		return res.status(error.response.status).json(error.response.data);
	}
});

router.post('/add-elder', async (req, res) => {
	const { code_id, student_id, firstname, lastname, nickname } = req.body;
	try {
		await Elder.create({
			code_id,
			student_id,
			firstname,
			lastname,
			nickname,
		});

		return res.status(201).json('success');
	} catch (error) {
		return res.status(500).json('Nothing');
	}
});

export default router;
