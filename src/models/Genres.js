const { Model, DataTypes } = require("sequelize");

class Genres extends Model {
     
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

    static associate(models){
        this.belongsTo(models.Students, { foreignKe: 'genre_id', as: 'students_genre ' })
    }

}

module.exports = Genres;