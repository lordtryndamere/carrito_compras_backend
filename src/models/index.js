//Call DB settings
const dbConfig  = require('../dbConfig/db.config');
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
host:dbConfig.HOST,
dialect:dbConfig.dialect,
operatorAliases:false,

pool:{
    max :dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire :dbConfig.pool.acquire,
    idle:dbConfig.pool.idle
}
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


//Call models
db.order = require('./order.model')(sequelize,Sequelize)
db.category = require('./category.model')(sequelize,Sequelize)
db.product = require('./product.model')(sequelize,Sequelize)
db.order_product = require('./order_product.model')(sequelize,Sequelize)


//Associations


db.category.hasMany(db.product,{
    onDelete:"cascade"
})
db.product.belongsTo(db.category,{
    foreingKey:{
        allownull:false,
        onDelete:"cascade"
    }
})

//M-M
db.product.hasMany(db.order_product,{onDelete:"cascade"});
db.order.hasMany(db.order_product,{onDelete:"cascade"});

db.order_product.belongsTo(db.product,{
    foreingKey:{
        allownull:false,
        onDelete:"cascade"
    }
})
db.order_product.belongsTo(db.order,{
    foreingKey:{
        allownull:false,
        onDelete:"cascade"
    }
})


module.exports = db