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

    // static associate(models) {
    //     //hasMany = tem muitos
    //     // um estudente tem muitos generos

    //     //hasOne = tem um
    //     // Um estudante tem um genero
    //     this.hasOne(models.Adresses , { foreignKey: 'city_id', as: 'address' })
        
    // }
    
}

module.exports = Genres;