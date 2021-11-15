const { Model, DataTypes } = require("sequelize");

class Task extends Model {
     
    static init(connection){
        super.init(
            {  
                name: DataTypes.STRING,
                description: DataTypes.STRING,
                date_delivery: DataTypes.DATE,
                spots: DataTypes.INTEGER,
            },
            {
               sequelize: connection,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Discipline, { foreignKey: 'discipline_id', as: 'discipline' })

        this.belongsToMany(models.User, { foreignKey: 'task_id', through: 'tasks_users', as: 'users' });
    }
     
}

module.exports = Task;