const { Model, DataTypes } = require("sequelize");

class Discipline extends Model {
     
    static init(connection){
        super.init(
            {  
                name: DataTypes.STRING,
                image: DataTypes.STRING,
                user_id: DataTypes.INTEGER
            },
            {
               sequelize: connection,
            }
        );
    }  

    static associate(models) {

        this.belongsTo(models.School, { foreignKey: 'school_id', as: 'school' })

        this.belongsTo(models.Class, { foreignKey: 'class_id', as: 'class' })

        this.belongsToMany(models.User, { foreignKey: 'discipline_id', through: 'disciplines_users', as: 'users' });


    }
}

module.exports = Discipline;