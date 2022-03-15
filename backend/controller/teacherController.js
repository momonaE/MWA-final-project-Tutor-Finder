
const teacher = require('../models/Teacher');
const tokengen = require('../tokenGenerator/tokengen');

module.

module.exports.fetch= async (req, res) => {
    let  teacher = teacher.find({}).exec()
    res.json(   {success:1}   ,teacher)
//     if(courses){
//         return    res.json({ success: 1, data: courses , msg:"courses found!",  status: res.statusCode
//     });
//     }else{
//    return    res.json({ success: 1, data: {},msg:"courses not found" ,  status: res.statusCode});
//     }
}
module.exports.remove = async (req, res) => {
    console.log(req.params);
    await teacher.deleteOne({tokengen },{$pull:{course:{courseId:req.params.id}}});
    res.json({ success: 1, data: `removed course with id ${req.params.id}` })
}

module.exports.add = async (req, res) => {
    console.log("teacher"+req.body);  
    // await new teacher(req.body).save()
    await teacher.updateOne({tokengen},{$push:{course:req.body}});
    res.send({ success: 1, data: teacher});
}

module.exports.edit = async (req, res) => {
    console.log(req.body);
    await teacher.updateOne({tokengen},{$set:{"course.$[obj]":req.body}},
        {arrayFilters:{"obj.courseId":req.params.id}})
    res.send({ success: 1, data: teacher});

}
module.exports.getEnrolled= async(req,res)=>{
 const students= await teacher.findOne({tokengen},{projection:{enrolledd:1}})
 if(students){
  return res.json({success:1, data:students, msg:`student found`}) 
 }else{
    return    res.json({ success: 1, data: {},msg:`student not found`})

  }
}