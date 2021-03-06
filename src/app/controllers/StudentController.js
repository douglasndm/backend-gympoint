import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StundetController {
    async index(req, res) {
        const { q } = req.query;

        let result = null;

        if (q !== '') {
            result = await Student.findAll({
                where: {
                    name: {
                        [Op.like]: `%${q}%`,
                    },
                },
            });
        } else {
            result = await Student.findAll();
        }

        return res.json(result);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.number().required(),
            weight: Yup.number(),
            height: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const stundetExist = await Student.findOne({
            where: { email: req.body.email },
        });

        if (stundetExist) {
            return res
                .status(400)
                .json({ error: 'There are someone using this email already' });
        }

        const { id, name, email, age, weight, height } = await Student.create(
            req.body
        );

        return res.json({ id, name, email, age, weight, height });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            id: Yup.number().required(),
            name: Yup.string(),
            email: Yup.string().email(),
            age: Yup.number(),
            weight: Yup.number(),
            height: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { id, email } = req.body;

        const stundent = await Student.findByPk(id);

        if (email && email !== stundent.email) {
            const studentExists = await Student.findOne({ where: { email } });

            if (studentExists)
                return res.status(400).json({ error: 'Email already in use' });
        }

        const { name, age, weight, height } = await stundent.update(req.body);

        return res.json({ id, name, email, age, weight, height });
    }
}

export default new StundetController();
