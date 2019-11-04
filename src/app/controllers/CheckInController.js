import * as Yup from 'yup';
import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import CheckIn from '../models/CheckIn';
import Student from '../models/Student';

class CheckInController {
    async index(req, res) {
        const checkins = await CheckIn.findAll({
            where: { student_id: req.params.student_id },
        });

        return res.json(checkins);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation fails' });

        const student = await Student.findByPk(req.params.student_id);

        if (!student)
            return res.status(400).json({ error: "Student didn't find" });

        const checkins = await CheckIn.findAll({
            where: {
                student_id: student.id,
                created_at: {
                    /*
                        PRIMEIRO O SUBDAYS VAI TIRAR 7 DIAS DO DIA ATUAL
                        PARA ASSIM FORMAR O BETWEEN DE 7 DIAS ATRÁS ATÉ A DATA DE HOJE
                        NÃO É NECESSÁRIO FAZER UMA VERIFICAÇÃO MAIS PROFUNDA NO BANCO DE DADOS
                        POR QUE ENTEDESSE QUE SE A UNICA FORMA DE FAZER UM CHECK É POR MEIO DESSA FUNÇÃO
                        TODOS OS DEMAIS DIAS TAMBÉM JÁ SERAM VALIDADOS COM ESTA REGRA
                    */
                    [Op.between]: [subDays(new Date(), 7), new Date()],
                },
            },
        });

        if (checkins) {
            if (checkins.length > 4)
                return res.status(401).json({
                    error: "You can't do more then 5 check-in every 7 days",
                });
        }

        const checkin = await CheckIn.create({
            student_id: req.body.student_id,
        });

        return res.json(checkin);
    }
}

export default new CheckInController();
