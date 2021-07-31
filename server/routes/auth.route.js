import axios from 'axios';
import express from 'express';
import Elder from '../models/Elder';
import Freshmen from '../models/Freshmen';
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
		var role = "elder";
		if (!data) {
			data = await Freshmen.findOne({ student_id: username }).lean();
			role = "freshmen";
			if (!data) {
				return res.status(400).send('username not found');
			}
		}

		return res.status(201).send({ ...data, role });
	} catch (error) {
		return res.status(error.response.status).json(error.response.data);
	}
});

router.post('/add-elder', async (req, res) => {
	const { student_id, raw_name, nickname } = req.body;
	try {
		await Elder.create({
			student_id,
			raw_name,
			nickname,
		});

		return res.status(201).json('success');
	} catch (error) {
		return res.status(500).json('Nothing');
	}
});

export default router;
