const { Model, DataTypes } = require("sequelize");

class Phone extends Model {
     
    static init(connection){
        super.init(
            {  
                number: DataTypes.INTEGER,
                student_id: DataTypes.INTEGER,
                ddd_id: DataTypes.INTEGER
            },
            {
               sequelize: connection,
            }
        );
    }

    static associate(models) {
        // belongsTo = pertece a único registro
        // o telefone pertece a um único estudente

        // belongsToMany pertence a muitos
        // o endereço pertece a muitos estudentes

        this.belongsTo(models.School, { foreignKey: 'school_id', as: 'school' })

        this.belongsTo(models.Prefixe, { foreignKey: 'ddd_id', as: 'prefixes' })
        
         
    }

}

module.exports = Phone;