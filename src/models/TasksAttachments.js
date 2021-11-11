const { Model, DataTypes } = require("sequelize");

class TasksAttachments extends Model {
     
    static init(connection){
        super.init(
            {  
                link: DataTypes.STRING,
                link1: DataTypes.STRING,
                link2: DataTypes.STRING,
                file: DataTypes.STRING,
                file1: DataTypes.STRING,
                file2: DataTypes.STRING,
            },
            {
               sequelize: connection,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Task, { foreignKey: 'task_id', as: 'task' })
    }
     
}

module.exports = TasksAttachments;