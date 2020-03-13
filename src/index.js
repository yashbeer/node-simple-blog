const app = require('./app')
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})

app.get('', (req, res) => {
    var str = '<div style="font-family: Lato;">'
    str += '<img src="https://frapp.in/static/media/frapp-logo.ad585c09.svg" width="110" />'
         str += '   <hr><center><h2>A Simple Blog Using Node</h2></center>'
         str += '   <p style="display: inline-block; position: absolute; right: 55px; top: 2px;"><a href="/api/users/me" target="_blank">User Profile</a></p>'
         str += '   <hr>'
         str += '   <center>'
         str += '     <p></p>'
         str += '     <p><a href="/api/posts" target="_blank">Post List</a></p>'
         str += '     <p><a href="/api/posts/5e6bf8656dc0a500170058df" target="_blank">Post Details</a></p>'
         str += '     <p>and 15 more Endpoints</p>'
         str += '     <p><a href="https://github.com/yashbeer/node-blog" target="_blank">Github Documentation</a></p>'
         str += '   </center>'
         str += '</div>'
         str += '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>'
         str += '<link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">'
         
    res.send(str)
})