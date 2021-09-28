const { Model, DataTypes } = require("sequelize");

class Students extends Model {
     
    static init(connection){
        super.init(
            {  
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                phone: DataTypes.STRING,
                birth_date: DataTypes.DATE,
                rg: DataTypes.STRING,
                image_rg: DataTypes.STRING,
                cpf: DataTypes.STRING,
                image_cpf: DataTypes.STRING,
                cpf_responsible: DataTypes.STRING,
                image_cpf_responsible: DataTypes.STRING,
                valid: DataTypes.INTEGER,
                img_proof_of_residence: DataTypes.STRING,
                genre: DataTypes.INTEGER,
            },
            {
               sequelize: connection,
            }
        );
        
    }

    static associate = function(models) {
        this.hasMany(models.User, {as: 'employes'})
    };

    // static associate = function(models) {
    //     this.belongsTo(models.Company, 
    //         {foreignKey: 'companyId', as: 'company'}
    //     );
}

module.exports = Students;