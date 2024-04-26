const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blog_routes');

const app = express();

// const dbURI = 'mongodb+srv://smyominkodev:social@microraysolution.gieasgx.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=microraysolution';
const dbURI = 'mongodb+srv://social:social@microraysolution.gieasgx.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=microraysolution'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
// register view engine

app.set('view engine', 'ejs');


// listen for requests

// app.listen(3000);

// app.set('views', 'views');
app.use((req,res,next)=>{
    console.log('New Request made');
    console.log('host : ',req.hostname);
    console.log('path : ' , req.path);
    console.log('method : ', req.method);

    next();
});

//middle ware
// mongodb+srv://smyominkodev:social@microraysolution.gieasgx.mongodb.net/?retryWrites=true&w=majority&appName=microraysolution


//middleware & statuc files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));//tiny
// morgan(function (tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, 'content-length'), '-',
//       tokens['response-time'](req, res), 'ms'
//     ].join(' ')
//   })

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save().then(result => {
//         res.send(result);
//     }).catch(err => {
//         console.log(err);
//     });
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find().then(result => {
//         res.send(result);
//     }).catch(err => {
//         console.log(err);
//     });
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('662bc64439eccc351043e00c').then(result => {
//         res.send(result);
//     }).catch(err => {   
//         console.log(err);
//     });
// }
// );


//routes
app.get('/', (req, res) => {
    // res.send('<p>Home Page</p>');
    // res.sendFile('./views/index.html', { root: __dirname });

    // const blogs = [
    //     { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' }
    // ];
    // res.render('index', { title: 'Home' ,blogs});

    res.redirect('/blogs');
});

app.use((req,res,next) =>{
    console.log('in the next middleware');
    next();
})


app.get('/about', (req, res) => {
    // res.send('<p>About Page</p>');
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

// redirects
app.get('/about-me', (req, res) => {
    // res.redirect('/about');
    res.redirect(301, '/about');
});

// blog routes
app.use( blogRoutes);
// 404 page
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' });
});

