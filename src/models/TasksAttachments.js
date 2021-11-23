const { Model, DataTypes } = require("sequelize");

class TasksAttachments extends Model {
     
    static init(connection){
        super.init(
            {  
                link: DataTypes.STRING,
                link1: DataTypes.STRING,
                link2: DataTypes.STRING,
                file: DataTypes.STRING,
                file1: DataTypes.STRING,
                file2: DataTypes.STRING,
            },
            {
               sequelize: connection,
            }
        );
    }
 
}

module.exports = TasksAttachments;