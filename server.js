const express = require ('express'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}  

const articleController = require('./controllers/articleController');
const router = new express.Router();

router.get('/api/articles', articleController.find);
router.post('/api/articles', articleController.insert);

router.delete('/api/articles', articleController.remove);
router.get('*', function(req,res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

app.use(router)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytreact");

app.get('/', function(req,res){
    res.send('Hello world')
});

app.listen(PORT, function(){
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});


