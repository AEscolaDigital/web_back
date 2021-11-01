const { Model, DataTypes } = require("sequelize");

class States extends Model {
     
    static init(connection){
        super.init(
            {  
                name: DataTypes.STRING,
                uf: DataTypes.STRING
            },
            {
               sequelize: connection,
            }
        );
    }

    static associate(models) {
        //hasMany = tem muitos
        // um endereço tem muitos estados

        //hasOne = tem um
        // um endereço tem um estado
        this.hasOne(models.Address , { foreignKey: 'state_id', as: 'address' })
    }
     
}

module.exports = States;