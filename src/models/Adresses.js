const { Model, DataTypes } = require("sequelize");

class Adresses extends Model {
     
    static init(connection){
        super.init(
            {  
                street: DataTypes.STRING,
                number: DataTypes.STRING,
                cep: DataTypes.STRING,
                district: DataTypes.STRING,
                complement: DataTypes.STRING,
            },
            {
               sequelize: connection,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Students, { foreignKey: 'student_id', as: 'student' })
    }

}

module.exports = Adresses;