module.exports = (sequelize, DataTypes) => {
    return sequelize.define('address', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        cellphone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        zipcode: {
            type: DataTypes.STRING(10),
            allowNull: true
        }
    }, {
            timestamps: true,
            paranoid: true,
        });
};