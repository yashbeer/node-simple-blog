const app = require('./app')
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})

app.get('', (req, res) => {
    var str = '<img src="https://frapp.in/static/media/frapp-logo.ad585c09.svg" width="110" />'
         str += '   <center><p>A Simple Blog Using Node</p></center>'
         str += '<p style="display: inline-block; position: absolute; right: 55px; top: 10px;"><a href="/api/users/me" target="_blank">User Profile</a></p>'
         str += '   <hr>'
         str += '   <center>'
         str += '     <p></p>'
         str += '     <p><a href="/api/posts" target="_blank">Post List</a></p>'
         str += '     <p><a href="/api/posts/5e6b795bd01e17229fb7eaea" target="_blank">Post Details</a></p>'
         str += '   </center>'
         str += '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>'
         
    res.send(str)
})