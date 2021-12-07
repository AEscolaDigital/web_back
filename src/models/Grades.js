const { Model, DataTypes } = require("sequelize");

class Grades extends Model {
     
    static init(connection){
        super.init(
            {  
                grade_1: DataTypes.STRING,
                grade_2: DataTypes.STRING,
                grade_3: DataTypes.STRING,
                grade_4: DataTypes.INTEGER,
                discipline_id: DataTypes.INTEGER,
                class_id: DataTypes.INTEGER
            },
            {
               sequelize: connection,
            }
        );
    }  

}

module.exports = Grades;