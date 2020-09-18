const db = require('../models');
const Product = db.product;
const {productvalidation} = require('../../services/validation');
var fs  = require('fs');
var path = require('path')


const productController = {
    async createProduct(req,res){
        const item = req.body;
         //Validar informacion enviada por el usuario
        const { error } = productvalidation(item);
        if (error) return res.status(400).send(error.details[0].message);

    const nameexists = await Product.findAll({
        where: {
          name: item.name,
        },
      });

      if (nameexists.length >= 1)
        return res.status(403).send("name already exists");

        const product = {
            name:item.name,
            description : item.description,
            price:item.price,
            CategoryId:item.categoria
        }

        try {
            const saveProduct = await Product.create(product)
            res.send(saveProduct)
        } catch (err) {
            res.status(500).send(err)
        }
    },

    async  getProducts(req,res){
        try {
            const products = await  Product.findAll({
                include: [{ model: db.category }],
              })
  
              if(products.length>=1) return res.status(200).send(products)
              return res.status(404).send("products no encontrados")
          } catch (error) {
              res.status(500).send("Error "+error)
          }
    },
    async getProduct(req,res){
        try {
            const id = req.params.id
            const products = await  Product.findAll({
                where:{id:id},
                include: [{ model: db.category }],
          
              })
  
              if(products.length>=1) return res.status(200).send(products)
              return res.status(404).send("producto no encontrado")
          } catch (error) {
              res.status(500).send("Error "+error)
          }
    },

    async  getProductsByCategory(req,res){
    
        try {
            const category = req.params.categoria
            const products = await  Product.findAll({
                where:{CategoryId:category},
                include: [{ model: db.category }],
          
              })
  
              if(products.length>=1) return res.status(200).send(products)
              return res.status(404).send("productos no encontrados")
          } catch (error) {
              res.status(500).send("Error "+error)
          }

    },
    async  uploadImage(req,res){
    try {
        const id = req.params.id
        if(!req.files) return res.status(400).send("Debe escoger una imagen");
        let filePath = req.files.image.path;
        let filesplit = filePath.split('\\')
        let file_name= filesplit[1];
        let exSplit = file_name.split('\.');
        let fileExt = exSplit[1];
        if (fileExt   == 'jpg'||fileExt ==  'gif' || fileExt ==  "png" || fileExt == "jpeg"){
            try {
                const  updatedProductImage = await    Product.update({image:file_name},{
                        where:{id:id}
                    })
                    if(updatedProductImage ==1 ) return res.status(200).send("Imagen subida")
                    return res
                .status(404)
                .send(
                  `Cannot updated Product with id=${id} .Maybe Product was not found or req.body is empty!`
                );
                } catch (error) {
                    res.status(500).send(error)
                }         
        }else{
            fs.unlink(filePath,(err)=>{
                return res.status(200).send({
                    message:"file extension is invalid"
                });
            })
        }
    } catch (error) {
        res.status(error)
    }
    },
    getFile(req,res){
        let file = req.params.image;
        let  path_file = './Uploads/'+file
        fs.exists(path_file,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }
            else{
                return res.status(200).send({
                    message:"image not exists.."
                })
            }
        })
    
        
    }


}

module.exports = productController