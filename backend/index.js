const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const port = 4000;
const app = express();

app.use(express.json());
app.use(cors());

// Ensure the upload directory exists
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://navaneethds:achu%40061003@cluster0.rk3iel0.mongodb.net/mydatabase?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use('/images', express.static(uploadDir));

app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for Creating Products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
});

app.post('/addproduct', async (req, res) => {
    try {
        let lastProduct = await Product.findOne().sort({ id: -1 }).exec();
        const id = lastProduct ? lastProduct.id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price
        });

        await product.save();
        console.log("Saved", product);
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Removed");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Creating API for getting all products
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All Products Fetched");
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Schema for User Model
const Users = mongoose.model('Users', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
        default: {},
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing user found with same email ID" });
        }

        let cart = {};
        for (let index = 0; index < 300; index++) {
            cart[index] = 0;
        }

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        await user.save();

        const data = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: "Server error" });
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const user_password = req.body.password === user.password;
        if (user_password) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    } else {
        res.json({ success: false, errors: "Wrong Email ID" });
    }
});

// Creating Endpoint for New Collections
app.get('/newcollections', async (req, res) => {
    try {
        let products = await Product.find({}).sort({ date: -1 });
        let newCollections = products.slice(0, 8);
        console.log("New collection fetched");
        res.send(newCollections);
    } catch (error) {
        console.error("Error fetching new collections:", error);
        res.status(500).send("Error fetching new collections");
    }
});

// Creating Endpoint Popular in Women
app.get('/popular', async (req, res) => {
    try {
        let products = await Product.find({});
        let popular = products.slice(0, 4);
        console.log("Popular products fetched");
        res.send(popular);
    } catch (error) {
        console.error("Error fetching popular products:", error);
        res.status(500).send("Error fetching popular products");
    }
});

// Middleware to Fetch User
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate with a valid token" });
        }
    }
};

// Creating Endpoint for Cart
app.post('/addtocart',fetchUser,async(req,res)=>{
console.log(req.body,req.user);
 let userData =await Users.findOne({_id:req.user.id});
 userData.cartData[req.body.itemId]+=1;
 await Users.findOneAndUpdate({_id:req.user.id},{
    cartData:userData.cartData
 });
 res.send("Added");
})
app.post('/removefromcart',fetchUser,async(req,res)=>{
   
 let userData =await Users.findOne({_id:req.user.id});
 if( userData.cartData[req.body.itemId])
 userData.cartData[req.body.itemId]-=1;
 await Users.findOneAndUpdate({_id:req.user.id},{
    cartData:userData.cartData
 });
 res.send("Removed");
})
//creating endpoint to get cartData
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("Get Cart");
    let userData =await Users.findOne({_id:req.user.id})
    res.json(userData.cartData);
    
})
app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port);
    } else {
        console.log("Error: " + error);
    }
});
