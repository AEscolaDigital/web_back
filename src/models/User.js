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
        
        this.belongsToMany(models.School, { foreignKey: 'user_id', through: 'users_schools', as: 'school' });

        this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' })

    }
}

module.exports = User;