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
                city_id: DataTypes.INTEGER,
                state_id: DataTypes.INTEGER
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

        this.belongsTo(models.Students, { foreignKey: 'student_id', as: 'student' })
        
        this.belongsTo(models.Cities, { foreignKey: 'city_id', as: 'city' });

        this.belongsTo(models.States, { foreignKey: 'state_id', as: 'state' });
      
    }

}

module.exports = Adresses;