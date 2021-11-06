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

        this.hasOne(models.Discipline, { foreignKey: 'user_id', as: 'discipline' });
    }
}

module.exports = User;