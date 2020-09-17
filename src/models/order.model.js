//Definded model
module.exports = (sequelize,Sequelize)=>{
    const Order = sequelize.define("Order",{
        id: {
            primaryKey: true,
            type: Sequelize.UUID
          },
        date:{
            type:Sequelize.DATE,
            allowNull:false
        },
        precioitems:{
            type:Sequelize.STRING,
            allowNull:false
        },
    
        precioTotal:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
    
      
    
    
      
    })
    return Order
}