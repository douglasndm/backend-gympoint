import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
    async index(req, res) {
        const plans = await Plan.findAll();

        return res.json(plans);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { id, title, duration, price } = await Plan.create(req.body);

        return res.json({ id, title, duration, price });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string(),
            duration: Yup.number(),
            price: Yup.number(),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation fails' });

        // recuperando o plano no banco de dados e aplicando em um model para apos isso fazer a atualização
        const plan = await Plan.findByPk(req.params.planId);

        const { id, title, duration, price } = await plan.update(req.body);

        return res.json({ id, title, duration, price });
    }

    async delete(req, res) {
        const plan = await Plan.findByPk(req.params.planId);

        if (!plan) return res.status(400).json({ error: "Plan didn't found" });

        await plan.destroy();

        return res.json({ success: true });
    }
}

export default new PlanController();
