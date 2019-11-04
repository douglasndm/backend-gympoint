import Sequelize, { Model } from 'sequelize';

class CheckIn extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                student_id: Sequelize.INTEGER,
                created_at: Sequelize.DATE,
                updated_at: Sequelize.DATE,
            },
            {
                sequelize,
                modelName: 'checkins',
            }
        );
    }
}

export default CheckIn;
