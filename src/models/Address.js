const { Model, DataTypes } = require("sequelize");

class Address extends Model {

    static init(connection) {
        super.init(
            {
                street: DataTypes.STRING,
                number: DataTypes.STRING,
                cep: DataTypes.STRING,
                district: DataTypes.STRING,
                complement: DataTypes.STRING,
            },
            {
                sequelize: connection,
            }
        );
    }

    static associate(models) {

        this.belongsTo(models.School, { foreignKey: 'school_id', as: 'school' })

        this.belongsTo(models.Cities, { foreignKey: 'city_id', as: 'city' });

        this.belongsTo(models.States, { foreignKey: 'state_id', as: 'state' });
    }

}

module.exports = Address;