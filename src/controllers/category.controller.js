const db = require('../models');
const Category = db.category;

const {categoryvalidation} = require('../../services/validation');
const CategoryController = {
    async  createCategory(req,res){
        const item = req.body
      //Validar informacion enviada por el usuario
      const {error} = categoryvalidation(item);
      if(error) return res.status(400).send(error.datails[0].message);
    
      //Validar si ya existe una categoria con el mismo nombre
      const categoryExists = await Category.findAll({
          where:{name:item.name}
      })

      if(categoryExists.length>=1) return res.status(401).send("Ya existe una categoria con este nombre");

      const category = {
          name:item.name,
          description : item.description
      }

      try {
            const saveCategory =  await Category.create(category)
            res.status(200).send(saveCategory)  

      } catch (error) {
          res.status(500).send(error)
      }
    }

}

module.exports = CategoryController