import * as Yup from 'yup';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import HelpOrder from '../models/HelpOrder';
import Stundet from '../models/Student';
import Mail from '../../lib/Mail';

class HelpOrderadminController {
    async index(req, res) {
        const helpOders = await HelpOrder.findAll({
            where: {
                answer: null,
            },
        });

        return res.json(helpOders);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            answer: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Answer can not be empty' });

        const helpOrder = await HelpOrder.findByPk(req.params.question_id);
        const updatedHelpOrder = await helpOrder.update({
            answer: req.body.answer,
            answer_at: new Date(),
        });

        const student = await Stundet.findByPk(helpOrder.student_id);

        const formatedDate = format(
            updatedHelpOrder.answer_at,
            "eeee, dd 'de' MMMM 'de' yyyy",
            { locale: pt }
        );

        await Mail.sendMail({
            to: `${student.name} <${student.email}`,
            subject: 'Pergunta respondida',
            template: 'QuestionAnswered',
            context: {
                student: student.name,
                question: updatedHelpOrder.question,
                answer: updatedHelpOrder.answer,
                answer_at: formatedDate,
            },
        });

        return res.json(updatedHelpOrder);
    }
}

export default new HelpOrderadminController();
