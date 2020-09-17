const db = require('../models');
const Order  =  db.order
const Order_product = db.order_product
const {ordervalidation} = require('../../services/validation');


const OrderController ={
    async  createOrder(req,res){
        const item = req.body
        //Validar informacion enviada por el usuario
        const {error} = ordervalidation(item);
        if(error) return res.status(400).send(error.datails[0].message);
        if(item.data.length<=0) return res.status(401).send("Items no encontrados");

        for (let index = 0; index < item.data.length; index++) {
            const element = item.data[index];
            const order= {
                id:Date.now()+Math.random().toString(36).substring(7),
                fecha:Date.now(),
                precioitems:item.body.precioitems,
                preciototal:item.body.preciototal
            }
          
            try {
                const savedOrder = await Order.create(order)
                const order_product ={
                    OrderId:savedOrder.id,
                    ProductId:element.product_id,
                    cantidad:element.cantidad
                }
                const saveOrder_product = await Order_product.create(order_product)
                res.send("Ordern creada correctamente",saveOrder_product)
            } catch (err) {
                return res.status(500).send(err)
            }
            
        }
 
        
        

    },
    async getOrders(req,res){
        try {
          const orders = await  Order.findAll({
                include: [{ model: db.product }],
            })

            if(orders.length>=1) return res.status(200).send(orders)
            return res.status(404).send("Orders no encontradas")
        } catch (error) {
            res.status(500).send("Error "+error)
        }
    }
}


module.exports = OrderController