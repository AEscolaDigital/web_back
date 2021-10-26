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
        // belongsTo = pertece a único registro
        // o endereço pertece a um único estudente

        // belongsToMany pertence a muitos
        // o endereço pertece a muitos estudentes

        this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' })

    }
}

module.exports = User;