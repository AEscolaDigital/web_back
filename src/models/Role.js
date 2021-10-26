const { Model, DataTypes } = require("sequelize");

class Role extends Model {
     
    static init(connection){
        super.init(
            {  
                name: DataTypes.STRING,
            },
            {
               sequelize: connection,
            }
        );
        
    }
}

module.exports = Role;