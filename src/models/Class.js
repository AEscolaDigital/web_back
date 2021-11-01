const { Model, DataTypes } = require("sequelize");

class Class extends Model {
     
    static init(connection){
        super.init(
            {  
                name: DataTypes.STRING,
            },
            {
               sequelize: connection,
            }
        );
    }

    static associate(models) {

        this.belongsToMany(models.User, { foreignKey: 'class_id', through: 'classes_users', as: 'users' });

        this.belongsTo(models.School, { foreignKey: 'school_id', as: 'school' });

     

    }
    
}

module.exports = Class;