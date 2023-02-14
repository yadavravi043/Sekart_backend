const Category=require('../models/category')
const slugify =require('slugify')
const shortid=require('shortid')

//sub function of getcatogories for recusive get catogories
function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    //if parent id in null means it it parent category
    if (parentId == null) {
      category = categories.filter((cat) => cat.parentId == undefined);
    } else {
      category = categories.filter((cat) => cat.parentId == parentId);
    }
    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
        //here is recursive call for alll children by passing parentid
        children: createCategories(categories, cate._id),
      });
    }
  
    return categoryList;
  }
exports.addCategory=(req,res)=>{
  const categoryObj={
    name:req.body.name,
    //slug is unique we cannot create duplicate even after deletion so we use shortid
    // slug:`${slugify(req.body.name)}-${shortid.generate()}`
    slug:slugify(req.body.name)
    }
    if (req.file) {
      categoryObj.categoryImage =process.env.API+ '/public/' + req.file.filename;
    }
    if((req.body.parentId)=="undefined" ||(req.body.parentId)=="Select Category"){
      categoryObj.parentId=undefined
    }else{
      categoryObj.parentId=req.body.parentId
    }
    const cat=new Category(categoryObj)
    cat.save((error,category)=>{
        if(error){
            res.status(400).json({error})
        }
        if(category){
           res.status(201).json({category}) 
        }
    })
}
exports.getCategories = (req, res) => {
    Category.find({}).exec((error, categories) => {
      if (error) return res.status(400).json({ error });
      if (categories) {
        const categoryList = createCategories(categories);
        res.status(200).json({ categoryList });
      }
    });
  };
  exports.updateCategories = async (req, res) => {
    const { _id, name, parentId, type } = req.body;
    const updatedCategories = [];
    if (name instanceof Array) {
      for (let i = 0; i < name.length; i++) {
        const category = {
          name: name[i],
          type: type[i],
        };
        if (parentId[i] !== "") {
          category.parentId = parentId[i];
        }
  
        const updatedCategory = await Category.findOneAndUpdate(
          { _id: _id[i] },
          category,
          { new: true }
        );
        updatedCategories.push(updatedCategory);
      }
      return res.status(201).json({ updateCategories: updatedCategories });
    } else {
      const category = {
        name,
        type,
      };
      if (parentId !== "") {
        category.parentId = parentId;
      }
      const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
        new: true,
      });
      return res.status(201).json({ updatedCategory });
    }
  };
  
  exports.deleteCategories = async (req, res) => {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
      const deleteCategory = await Category.findOneAndDelete({
        _id: ids[i]._id,
        // createdBy: req.user._id,
      });
      deletedCategories.push(deleteCategory);
    }
  
    if (deletedCategories.length == ids.length) {
      res.status(201).json({ message: "Categories removed" });
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  };