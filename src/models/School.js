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
                role_id: DataTypes.INTEGER
            },
            {
               sequelize: connection,
            }
        );
        
    }

    static associate(models) {
   
        this.hasOne(models.Address, { foreignKey: 'school_id', as: 'address' });

        this.hasOne(models.Phone, { foreignKey: 'school_id', as: 'phone' });

        this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
 
    }

}

module.exports = School;