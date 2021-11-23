const { Model, DataTypes } = require("sequelize");

class TaskDelivery extends Model {
     
    static init(connection){
        super.init(
            {  
                delivery_date: DataTypes.DATE,
                status: DataTypes.INTEGER,
                link: DataTypes.STRING,
                link1: DataTypes.STRING,
                file: DataTypes.STRING,
                file1: DataTypes.STRING,
                spots: DataTypes.INTEGER,
                comment: DataTypes.STRING
            },
            {
               sequelize: connection,
               tableName: 'task_delivery',
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Task, { foreignKey: 'task_id', as: 'task' })

        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })

    }
     
}

module.exports = TaskDelivery;