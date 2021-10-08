const { Model, DataTypes } = require("sequelize");

class Students extends Model {
     
    static init(connection){
        super.init(
            {  
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                birth_date: DataTypes.DATE,
                rg: DataTypes.STRING,
                cpf: DataTypes.STRING,
                cpf_responsible: DataTypes.STRING,
                valid: DataTypes.INTEGER,
                genre_id: DataTypes.INTEGER,
            },
            {
               sequelize: connection,
            }
        );
        
    }

    static associate(models) {
        //hasMany = tem muitos
        // um usuário tem muitos endereços
    
        //hasOne = tem um
        // um estudente tem um endereço
        this.hasOne(models.Adresses, { foreignKey: 'student_id', as: 'address' });

        // belongsTo = pertece a único registro
        // o genero pertece a um único aluno

        // belongsToMany pertence a muitos
        // o genero pertece a muitos estudentes
        
        this.belongsTo(models.Genres, { foreignKey: 'genre_id', as: 'genre' });
        
        this.hasOne(models.Phones, { foreignKey: 'student_id', as: 'phone' });
        
        this.hasOne(models.UserImages, { foreignKey: 'user_id', as: 'images' });
    }

}

module.exports = Students;