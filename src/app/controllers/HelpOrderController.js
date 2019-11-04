import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
    async index(req, res) {
        const helpOders = await HelpOrder.findAll({
            where: {
                student_id: req.params.student_id,
            },
        });

        return res.json(helpOders);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            question: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Question can not be empty' });

        const { id, student_id, question } = await HelpOrder.create({
            student_id: req.params.student_id,
            question: req.body.question,
        });

        return res.json({ id, student_id, question });
    }
}

export default new HelpOrderController();
