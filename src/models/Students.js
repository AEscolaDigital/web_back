const { Model, DataTypes } = require("sequelize");

class Students extends Model {
     
    static init(connection){
        super.init(
            {

            },
            {
               sequelize: connection,
            }
        );
    }
}

module.exports = Students;