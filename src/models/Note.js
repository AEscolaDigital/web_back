const { Model, DataTypes } = require("sequelize");

class Note extends Model {
     
    static init(connection){
        super.init(
            {  
                note_1: DataTypes.INTEGER,
                note_2: DataTypes.INTEGER,
                note_3: DataTypes.INTEGER,
                note_4: DataTypes.INTEGER,
                semester: DataTypes.INTEGER,
                assessment: DataTypes.STRING
            },
            {
               sequelize: connection,
            }
        );
    }  
    static associate(models) {

        this.belongsTo(models.Discipline, { foreignKey: 'discipline_id', as: 'dicipline' })

        this.belongsTo(models.Class, { foreignKey: 'class_id', as: 'class' })

        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })

    }

}

module.exports = Note;