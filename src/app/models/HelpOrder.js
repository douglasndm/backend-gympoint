import Sequelize, { Model } from 'sequelize';

class HelpOrder extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                student_id: Sequelize.INTEGER,
                question: Sequelize.STRING,
                answer: Sequelize.STRING,
                answer_at: Sequelize.DATE,
            },
            {
                sequelize,
            }
        );
    }
}

export default HelpOrder;
