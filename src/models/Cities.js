const { Model, DataTypes } = require("sequelize");

class Cities extends Model {
     
    static init(connection){
        super.init(
            {  
                name: DataTypes.STRING,
                state_id: DataTypes.INTEGER
            },
            {
               sequelize: connection,
            }
        );
    }
}

module.exports = Cities;