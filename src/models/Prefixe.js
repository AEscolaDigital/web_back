const { Model, DataTypes } = require("sequelize");

class Prefixe extends Model {
     
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
    
        this.hasOne(models.Phone, { foreignKey: 'ddd_id', as: 'phone' });
    }

}

module.exports = Prefixe;