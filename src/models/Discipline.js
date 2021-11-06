const { Model, DataTypes } = require("sequelize");

class Discipline extends Model {
     
    static init(connection){
        super.init(
            {  
                name: DataTypes.STRING,
                image: DataTypes.STRING,
            },
            {
               sequelize: connection,
            }
        );
    }  

    static associate(models) {

        this.belongsTo(models.School, { foreignKey: 'school_id', as: 'school' })

        this.belongsTo(models.Class, { foreignKey: 'class_id', as: 'class' })

    }
}

module.exports = Discipline;