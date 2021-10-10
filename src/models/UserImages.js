const { Model, DataTypes } = require("sequelize");

class UserImages extends Model {
     
    static init(connection){
        super.init(
            {  
                image_rg: DataTypes.STRING,
                image_cpf: DataTypes.STRING,
                image_cpf_responsible: DataTypes.STRING,
                img_proof_of_residence: DataTypes.STRING,
                profile_image: DataTypes.STRING,
            },
            {
               sequelize: connection,
            }
        );
    }

    static associate(models) {
        // belongsTo = pertece a único registro
        // o endereço pertece a um único estudente

        // belongsToMany pertence a muitos
        // o endereço pertece a muitos estudentes

        this.belongsTo(models.Students, { foreignKey: 'student_id', as: 'user Images' })
    }

}

module.exports = UserImages;