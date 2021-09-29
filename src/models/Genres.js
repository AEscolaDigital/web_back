const { Model, DataTypes } = require("sequelize");

class Genres extends Model {
     static init(connection){
         super.init({
            name_genre: DataTypes.STRING
         },{
             sequelize: connection,
         })
    }

    
    static associate(models) {

        this.hasMany(models.Students, { foreignKey: 'genre_id', as: 'genres' });
    }
}

module.exports = Genres;