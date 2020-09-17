//Definded model
module.exports = (sequelize,Sequelize)=>{
    const orden_producto = sequelize.define("orden_producto",{
     cantidad:Sequelize.INTEGER
    })
    return orden_producto
}