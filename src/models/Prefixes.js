const { Model, DataTypes } = require("sequelize");

class Prefixes extends Model {
     
    static init(connection){
        super.init(
            {  
                ddd: DataTypes.INTEGER,
            },
            {
               sequelize: connection,
            }
        );
    }

    
    static associate(models) {
        //hasMany = tem muitos
        // um telefone tem muitos ddd 
    
        //hasOne = tem um
        // um telefone tem um ddd
    
        this.hasOne(models.Phones, { foreignKey: 'ddd_id', as: 'phone' });
    }

}

module.exports = Prefixes;