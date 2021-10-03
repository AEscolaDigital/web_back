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
}

module.exports = Prefixes;