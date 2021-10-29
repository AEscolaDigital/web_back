const { Model, DataTypes } = require("sequelize");

class School extends Model {
     
    static init(connection){
        super.init(
            {  
                name: DataTypes.STRING,
                name_school: DataTypes.STRING,
                cnpj: DataTypes.STRING,
                school_size: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
            },
            {
               sequelize: connection,
            }
        );
        
    }

    static associate(models) {
   
        this.belongsToMany(models.User, { foreignKey: 'school_id', through: 'users_schools', as: 'user' });

        this.hasOne(models.Address, { foreignKey: 'school_id', as: 'address' });

        this.hasOne(models.Phone, { foreignKey: 'school_id', as: 'phone' });
        
    }

}

module.exports = School;