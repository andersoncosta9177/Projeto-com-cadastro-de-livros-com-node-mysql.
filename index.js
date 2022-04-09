const { response } = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require("mysql")

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine','handlebars')
app.use(express.static('public'))


app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())


//rota principal
app.get('/', (req,res)=>{
    res.render('home')
})


//rota captura dos dados do front para inserir no banco
app.post('/books/insertbook', (req,res)=>{
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
        res.redirect('/')
    })
})

app.get('/books', (req,res)=>{
    
    const sql = "SELECT * FROM books"

    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }

        const books = data
        res.render('books', {books})
    })
})








app.get('/books/edit/:id', (req,res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM  books WHERE id = ${id}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const book = data[0]
        res.render('editbook', {book})

    })
})


app.post('/books/updatebooks', (req,res)=>{
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `UPDATE books SET title = '${title}', pageqty= '${pageqty}' WHERE id = ${id}`
    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})
 



app.get('/books/:id', (req,res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, function(err,data){
     if(err){
         console.log(err)
         return
     }
    
     const book = data[0]
      res.render('book', {book})

    })
})



app.post('/books/remove/:id', (req,res)=>{
    const id = req.params.id
    const sql = `DELETE FROM books WHERE id = ${id}`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
res.redirect('/books')

    })
})



// conexao com o banco
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql2'

})

conn.connect(function(err){
    if(err){
        console.log(err)
    }
    console.log('Conectou ao banco de dados')
    app.listen(1337)
})
