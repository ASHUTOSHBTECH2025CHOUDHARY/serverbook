const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const Client = require('../Modals/clientSchema');
const dotenv = require('dotenv')
dotenv.config()
router.get('/',(req,res)=>{
     res.send("Hello from server router");
})
router.post('/register', async (req,res)=>{
    const {name , email ,phone, password } = req.body;
     console.log(name);
    if(!name || !email || !phone || !password ){
     return res.status(422).json({error : "Plz filled the field"});
    }
    const epass=await bcrypt.hash(password, 12);
    console.log("bhai ye ");
    console.log( epass);

    try{
    const clientExist = await Client.findOne({email : email});
    if(clientExist){
     return res.status(422).json({error : "Email already Exist"});
    }
    const client = new Client ({name, email, phone , password : epass});
    await client.save();
     res.status(201).json({message:" client registered successfuly"});

    }
    catch(err) {
     console.log(err);
    }
   

});


router.post('/login', async (req, res) => {
    console.log("login");
    const { email, password } = req.body;

    console.log(email + " " + password);

    try {
        const client = await Client.findOne({ email });

        if (!client) {
            return res.json({ error: "Client not found" });
        }

        console.log("Stored Password:", client.password);
        console.log("Provided Password:", password);

        const isPasswordMatch = await bcrypt.compare(password, client.password);

        console.log("Password Match Result:", isPasswordMatch);

        if (isPasswordMatch) {
            console.log("Password matched");
            const token = jwt.sign(
                { email: client.email,role: client.role, name: client.name, id: client._id },
                process.env.JWT_SECRET
            );
                       
            return res.status(201).json({ status: "ok", message: "Login Successfully", data: token });
        }

        return res.json({ status: "error", error: "Invalid Authentication" });
    } catch (err) {
        console.log(err);
        return res.json({ status: "error", error: "Internal Server Error" });
    }
});

module.exports = router;