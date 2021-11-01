const { Model, DataTypes } = require("sequelize");

class Cities extends Model {
     
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
        //hasMany = tem muitos
        // um endereço tem muitos cidades

        //hasOne = tem um
        // um endereço tem um cidade
        this.hasOne(models.Address , { foreignKey: 'city_id', as: 'address' })
    }
    
}

module.exports = Cities;