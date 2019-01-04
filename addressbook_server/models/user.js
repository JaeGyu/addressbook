module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        userId: {
            type: DataTypes.STRING(20),  //id는 최대 20자
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        grade: {
            type: DataTypes.STRING(10),
            allowNull:false
        }
    }, {
            timestamps: true,
            paranoid: true,
        });
};