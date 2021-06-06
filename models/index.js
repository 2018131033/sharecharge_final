const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//모델정보를 읽어온다.
db.Users = require('./users')(sequelize, Sequelize);
db.Chargers = require('./chargers')(sequelize, Sequelize);
db.Reservations = require('./reservations')(sequelize, Sequelize);

Object.keys(db).forEach((modelName)=>{
    if(db[modelName].associate){
        db[modelName].associate(db);
    }
});

// //모델간의 관계를 정의한다.
// db.Users.hasMany(db.Chargers);
// db.Chargers.belongsTo(db.Users);
// db.Chargers.hasOne(db.Reservations);

module.exports = db;