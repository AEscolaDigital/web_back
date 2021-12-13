const { Model, DataTypes } = require("sequelize");

class User extends Model {
     
    static init(connection){
        super.init(
            {  
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                profile_picture: DataTypes.STRING,
            },
            {
               sequelize: connection,
            }
        );
    }

    static associate(models) {

        this.belongsTo(models.School, { foreignKey: 'school_id', as: 'school' });
        
        this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });

        this.belongsToMany(models.Class, { foreignKey: 'user_id', through: 'classes_users', as: 'classes'});

        this.belongsToMany(models.Discipline, { foreignKey: 'user_id', through: 'disciplines_users', as: 'discipline'});

        this.belongsToMany(models.Task, { foreignKey: 'user_id', through: 'tasks_users', as: 'task'});

        this.hasOne(models.TaskDelivery, {foreignKey: 'task_id', as: 'taskDelivery'});

        this.hasOne(models.Note, {foreignKey: 'user_id', as: 'user'});

    }
}

module.exports = User;