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

    static associate(models) {
        //hasMany = tem muitos
        // um aluno tem muitos generos

        //hasOne = tem um
        // Um aluno tem um genero
        this.hasOne(models.Students , { foreignKey: 'genre_id', as: 'student' })
        
    }
    
}

module.exports = Genres;