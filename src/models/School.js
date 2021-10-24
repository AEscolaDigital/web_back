const { Model, DataTypes } = require("sequelize");

class School extends Model {
     
    static init(connection){
        super.init(
            {  
                name: DataTypes.STRING,
                name_school: DataTypes.STRING,
                cnpj: DataTypes.STRING,
                school_size: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
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
        this.hasOne(models.Address, { foreignKey: 'school_id', as: 'address' });

        // belongsTo = pertece a único registro
        // o genero pertece a um único aluno

        // belongsToMany pertence a muitos
        // o genero pertece a muitos estudentes
        
        this.hasOne(models.Phone, { foreignKey: 'school_id', as: 'phone' });
        
    }

}

module.exports = School;