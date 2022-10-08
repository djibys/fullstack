const  express = require("express");
const bodyParser = require ("body-parser");
const mongoose = require('mongoose');
const Article= require('./models/Article')

// CONNECTION A MONGOOSE
mongoose.connect('mongodb+srv://djibys:REVOLUTION2017@cluster0.mkqrko4.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());


app.post('/api/article', (req, res, next) => {
    delete req.body._id;
    const article= new Article({
        ...req.body
    });
    //verification
    article.save()
        .then(() => res.status(201).json({ message: 'article enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});

app.use('/api/article', (req, res, next) => {
    Article.find()
        .then(article    => res.status(200).json(article))
        .catch(error => res.status(400).json({ error }));
});

app.post('/api/article', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'article créé !'
    });
});

app.get('/api/article/:id', (req, res, next) => {
    Article.findOne({ _id: req.params.id })
        .then(article=> res.status(200).json(article))
        .catch(error => res.status(404).json({ error }));
});


module.exports = app ;