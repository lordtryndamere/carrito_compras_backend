//SERVICIO DE VALIDACION DE LA INFORMACION ENVIADA POR EL USUARIO
const Joi = require('@hapi/joi');


const Ordervalidation = data =>{
    const schema = {
        date:Joi.date().required(),
        precioitems:Joi.number().required(),
        preciototal:Joi.number().required(),
        data:Joi.array().required()
    }
    return Joi.validate(data,schema)
}

const Productvalidation = data =>{
    const schema = {
        name:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required(),
        image:Joi.string().required(),
        categoria:Joi.number().required()
    }
    return Joi.validate(data,schema)
}

const categoryValidation = data =>{
    const schema = {
        name:Joi.string().required(),
        description:Joi.string().required(),
       
    }
    return Joi.validate(data,schema)
}

module.exports.ordervalidation = Ordervalidation
module.exports.productvalidation = Productvalidation
module.exports.categoryvalidation = categoryValidation