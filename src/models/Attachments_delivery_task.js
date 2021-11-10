const { Model, DataTypes } = require("sequelize");

class Attachments_delivery_task extends Model {
     
    static init(connection){
        super.init(
            {  
                delivery_date: DataTypes.DATE,
                link: DataTypes.STRING,
                link1: DataTypes.STRING,
                file: DataTypes.STRING,
                file1: DataTypes.STRING,
            },
            {
               sequelize: connection,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Task, { foreignKey: 'task_id', as: 'task' })

        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })

    }
     
}

module.exports = Attachments_delivery_task;