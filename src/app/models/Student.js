import Sequelize, { Model } from 'sequelize';

class Students extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                age: Sequelize.INTEGER,
                weight: Sequelize.DOUBLE,
                height: Sequelize.DOUBLE,
            },
            {
                sequelize,
            }
        );
    }
}

export default Students;
