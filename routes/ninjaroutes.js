const router = require("express").Router();

const Ninja = require("../db");
const data = [];
router.get('/', (req, res) =>  {
    res.send('Hello, world!');
});

router.post("/create", (req, res,next) => {
    const ninja = req.body;
    new Ninja(ninja).save().then(() => {
        res.status(201).send(" added successfully");
    }).catch(err => next({status: 400,message: err.message}));

    
   
});

router.get('/', (req, res) => res.send('my name hello is omar'));

router.get("/getall", (req,res,next) => {
    Ninja.find((err,shinobi)=>{
        if(err)
        return next({status:400,message:err.message});
        else
            return res.json(shinobi);
    })

})

router.get("/get/:id", (req, res, next) => {
    const id = Number.parseInt(req.params.id);

    if (id == null || undefined || id === NaN) 
        return next({ status: 400, message: "Invalid id" });
    else if (id > data.length) 
        return next({ status: 404, message: "No ninjas found with" + id });
    
    res.json(data[id]);
})





router.put("/replace/:id", (req,res)=>{

    const newninja = req.query;
    const id = Number.parseInt(req.params.id);

    if(id===null||undefined||id===NaN)
    return next({status: 404, message:"invalid id"});
    else if (id> data.length)
    return next({status:404,message:"No ninjas found with" + id});

    data.splice(id, 1, newninja);
    res.status(202).json(data[id]);


})

router.delete("/remove/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);

    if (id === null || undefined || id === NaN) 
        return next({ status: 400, message: "Invalid id" });
    else if (id > data.length) 
        return next({ status: 404, message: "No ninjas found with " + id });

    data.splice(id, 1);
    res.sendStatus(204);
});

module.exports = router;