//Definded model
module.exports = (sequelize,Sequelize)=>{
    const Product = sequelize.define("Producto",{
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        description:{
            type:Sequelize.STRING,
            allowNull:false
        },
    
        price:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
    
        image:{
            type:Sequelize.BLOB("long"),
            allowNull:true
        },
      
    
    
      
    })
    return Product
}