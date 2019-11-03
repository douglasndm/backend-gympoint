import * as Yup from 'yup';
import { isBefore, parseISO, addMonths } from 'date-fns';
import Enrolment from '../models/Enrolment';
import Student from '../models/Student';
import Plan from '../models/Plan';

class EnrolmentController {
    async index(req, res) {
        const enrolments = await Enrolment.findAll();

        return res.json(enrolments);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number().required(),
            plan_id: Yup.number().required(),
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation fails' });

        const student = await Student.findByPk(req.body.student_id);

        if (!student)
            return res.status(400).json({ error: "Student didn't found" });

        const plan = await Plan.findByPk(req.body.plan_id);

        if (!plan) return res.status(400).json({ error: "Plan didn't found" });

        const startDate = parseISO(req.body.start_date);
        const endDate = addMonths(startDate, plan.duration);

        if (isBefore(startDate, new Date())) {
            return res
                .status(400)
                .json({ error: 'Past dates are not permited' });
        }

        const {
            id,
            student_id,
            plan_id,
            start_date,
            end_date,
            price,
        } = await Enrolment.create({
            student_id: req.body.student_id,
            plan_id: req.body.plan_id,
            start_date: startDate,
            end_date: endDate,
            price: plan.price * plan.duration,
        });

        return res.json({
            id,
            student_id,
            plan_id,
            start_date,
            end_date,
            price,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number(),
            plan_id: Yup.number(),
            start_date: Yup.date(),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validations fails' });

        const oldEnrolment = await Enrolment.findByPk(req.params.id);

        const startDate = req.body.start_date
            ? parseISO(req.body.start_date)
            : oldEnrolment.start_date;

        if (isBefore(startDate, new Date()))
            return res
                .status(400)
                .json({ error: 'Past dates are not permited' });

        const plan = await Plan.findByPk(
            req.body.plan_id ? req.body.plan_id : oldEnrolment.plan_id
        );

        const enrolment = await oldEnrolment.update({
            student_id: req.body.student_id
                ? req.body.student_id
                : oldEnrolment.student_id,
            plan_id: req.body.plan_id ? req.body.plan_id : oldEnrolment.plan_id,
            start_date: startDate,
            end_date: addMonths(startDate, plan.duration),
            price: plan.price * plan.duration,
        });

        return res.send(enrolment);
    }
}

export default new EnrolmentController();
