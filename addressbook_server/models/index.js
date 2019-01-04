const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

//config.json에서 development에 해당하는 profile로 db연결을 해라
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/**
 * 모델을 연결 한다.
 */
db.User = require('./user')(sequelize, Sequelize);
db.Address = require('./address')(sequelize, Sequelize);

/**
 * 모델간의 관계를 설정 한다.
 * 유저는 여러개의 주소들을 관리한다.
 * 하나의 주소는 한명의 유저에게 속한다.
 */
db.User.hasMany(db.Address, { foreignKey: 'userseq', sourceKey: 'id' });
db.Address.belongsTo(db.User, { foreignKey: 'userseq', targetKey: 'id' });


module.exports = db;