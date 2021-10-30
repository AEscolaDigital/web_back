const { Model, DataTypes } = require("sequelize");

class Phone extends Model {
     
    static init(connection){
        super.init(
            {  
                number: DataTypes.INTEGER,
            },
            {
               sequelize: connection,
            }
        );
    }

    static associate(models) {
    
        this.belongsTo(models.School, { foreignKey: 'school_id', as: 'school' })

        this.belongsTo(models.Prefixe, { foreignKey: 'ddd_id', as: 'prefixes' })
   
    }

}

module.exports = Phone;