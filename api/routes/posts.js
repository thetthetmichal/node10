var  expres=require('express');
var router=expres.Router();
var Post=require('../../model/Post');
var checkAuth=require('../middleware/check-auth');
router.get('/list',checkAuth,function(req,res){
    Post.find(function(err,rtn){
        if(err){
            res.statuss(500).json({
            message:"Internal server error",
            error:err,
        })
    }else{
        res.status(200).json({
            posts:rtn,
        })
    }
    })
})
router.post('/add',checkAuth,function(req,res){
            var post=new Post();
            post.title=req.body.title;
            post.content=req.body.content;
            post.author=req.body.author;
            post.save(function(err,rtn){
             if(err){
                 res.status(500).json({
                     message:"Internal server error",
                     error:err
                 })
             }else{
                 res.status(201).json({
                     message:"Post created success ",
                     post:rtn
                     

                  })
             }
            })
        })
             router.get('/detail/:id',checkAuth,function(req,res){
                Post.findById(req.params.id).populate('author').exec(function(err,rtn){
                    if(err){
                        res.status(500).json({
                        message:"Internal server error",
                        error:err,
                    })
                }else{
                        res.status(200).json({
                          post:rtn,
                        })
                }

                
                })
            })
            router.patch('/update/:id',function(req,res){
                // var update={
                //     title:req.body.title,
                //     content:req.body.content,
                //     author:req.body.author
                // }
                var updateOps={};
                for(var ops of req.body){
                    updateOps[ops.proName]=ops.value;
                }
                Post.findByIdAndUpdate(req.params.id,{$set:updateOps},function(err,rtn){
                    if(err){
                        res.status(500).json({
                            message:"Internal server error",
                            error:err
                        })
                    }else{
                        res.status(200).json({
                            message:"Post update successfully",
                            post:rtn
                        })
                    }
                })
            })
            router.delete('/delete/:id',function(req,res){
                Post.findOneAndRemove(req.params.id,function(err,rtn){
                    if(err){
                        res.status(500).json({
                        message :"Internal server error",
                        error: err
                    })
                }else{
                    res.status(200).json({
                        message:"Post delete success",
                    })
                }
            })
            })

module.exports=router;