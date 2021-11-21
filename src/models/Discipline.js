const { Model, DataTypes } = require("sequelize");

class Discipline extends Model {
     
    static init(connection){
        super.init(
            {  
                name: DataTypes.STRING,
                image: DataTypes.STRING,
                user_id: DataTypes.INTEGER,
                teacherName: DataTypes.STRING
            },
            {
               sequelize: connection,
            }
        );
    }  

    static associate(models) {

        this.belongsTo(models.School, { foreignKey: 'school_id', as: 'school' })

        this.belongsTo(models.Class, { foreignKey: 'class_id', as: 'class' })

        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })

        this.belongsToMany(models.User, { foreignKey: 'discipline_id', through: 'disciplines_users', as: 'users' });

    }
}

module.exports = Discipline;