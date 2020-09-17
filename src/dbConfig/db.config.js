module.exports = {
    HOST:"localhost",
    USER:"root",
    PASSWORD:"Madara*20",
    DB:"CARRITO_DE_COMPRAS",
    dialect:"mysql",
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}