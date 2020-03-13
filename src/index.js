const app = require('./app')
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})

app.get('', (req, res) => {
    res.send('<h1>Hello World</h1><script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>')
})