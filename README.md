## A simple blog API

Made using nodejs, express, mongodb, mongoose, jsonwebtoken

# API Documentation

Endpoint URL: `https://hero-yashbeer.herokuapp.com/`

### Authentication: JWT Token
For all API endpoints which require authentication, you need to send the following header as part of the request.

`Authorization: Bearer <JWT Token received on login/signup>`

### 1. Create User

`[POST] /api/users/`

Authentication: None

Request:

  - Required: name, email, password

  - Optional: None

```
{
    "name": "UserOne",
    "email": "userone@example.com",
    "password": "UserOne321"
}
```

Success Response:

  - Code: 200
  
````
{
   "user":{
      "isAdmin":false,
      "_id":"5e6bdff290359b00170e989a",
      "name":"UserOne",
      "email":"userone@example.com",
      "createdAt":"2020-03-13T19:33:06.494Z",
      "updatedAt":"2020-03-13T19:33:06.686Z",
      "__v":1
   },
   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZiZGZmMjkwMzU5YjAwMTcwZTk4OWEiLCJpYXQiOjE1ODQxMjc5ODZ9.Pu65aRIBZHx3hEWc5ER-spny07woYWLRCsWjwZ63APE"
}
````

Error Response:

  - Code: 400
  
```
{
    "driver":true,
    "name":"MongoError",
    "index":0,
    "code":11000,
    "keyPattern":{
        "email":1
    },
    "keyValue":{
        "email":"userone@example.com"
    },
    "errmsg":"E11000 duplicate key error collection: post-manager.users index: email_1 dup key: { email: \"userone@example.com\" }"
}
```

Example:
```
var data = {
    "name": "Shweta",
    "email": "shweta@example.com",
    "password": "shweta321"
}
$.ajax({
    method: 'POST',
    url: '/api/users',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function (res) {
        console.log(res);
    },
    error: function () { // Hard failure, like network error
        console.error('Seems network error');
    }
});
```

### 2. Login

`[POST] /api/users/login`

Authentication: None

Request:

  - Required: email, password

  - Optional: None

```
{
    "email": "userone@example.com",
    "password": "UserOne321"
}
```

Success Response:

  - Code: 200
  
````
{
    "user":{
        "isAdmin":false,
        "_id":"5e6bdff290359b00170e989a",
        "name":"UserOne",
        "email":"userone@example.com",
        "createdAt":"2020-03-13T19:33:06.494Z",
        "updatedAt":"2020-03-13T19:33:41.885Z",
        "__v":2
    },
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZiZGZmMjkwMzU5YjAwMTcwZTk4OWEiLCJpYXQiOjE1ODQxMjgwMjF9.EcO3DodX8bapEUV4h_Cyk2pQH2w8ff09vU5ikYr7lZ4"
}
````

Error Response:

  - Code: 400
  
```
{}
```

Example:
```
var data = {
    "email": "userone@example.com",
    "password": "UserOne321!!"
}
$.ajax({
    method: 'POST',
    url: '/api/users/login',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function (res) {
        console.log(res);
    },
    error: function () { // Hard failure, like network error
        console.error('Seems network error');
    }
});
```

3. LOGOUT
----------------
$.ajax({
    method: 'POST',
    url: '/api/users/logout',
    contentType: 'application/json',
    data: JSON.stringify(data),
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZhNWY4ZDNmNDg0ZjI3MjlhZmE3NjIiLCJpYXQiOjE1ODQwMjk5MjV9.AixvXGHappKgED1Q5Ypzg_Jjs41jaZ9d_OdXeNfaLM4');
    },
    success: function (res) {
        console.log(res);
    },
    error: function () { // Hard failure, like network error
        console.error('Seems network error');
    }
});

4. UPDATE USER
------------------
var data = {
    "name": "Shweta Singh"
}
$.ajax({
    method: 'POST',
    url: '/api/users/me',
    contentType: 'application/json',
    data: JSON.stringify(data),
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZhNWY4ZDNmNDg0ZjI3MjlhZmE3NjIiLCJpYXQiOjE1ODQwMjk5MjV9.AixvXGHappKgED1Q5Ypzg_Jjs41jaZ9d_OdXeNfaLM4');
    },
    success: function (res) {
        console.log(res);
    },
    error: function () { // Hard failure, like network error
        console.error('Seems network error');
    }
});

5. DELETE USER
---------------------
$.ajax({
    method: 'DELETE',
    url: '/api/users/me',
    contentType: 'application/json',
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZhNWY4ZDNmNDg0ZjI3MjlhZmE3NjIiLCJpYXQiOjE1ODQwMjk5MjV9.AixvXGHappKgED1Q5Ypzg_Jjs41jaZ9d_OdXeNfaLM4');
    },
    success: function (res) {
        console.log(res);
    },
    error: function () { // Hard failure, like network error
        console.error('Seems network error');
    }
});

6. CREATE POST
------------------------
var data = {    
    "title": "Explain GSM in detail",
    "description": "GSM explained in detailed way"
}
$.ajax({
    method: 'POST',
    url: '/api/posts',
    contentType: 'application/json',
    data: JSON.stringify(data),
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZhODAxMmI3NzI2NzFlNzA1OGM3MmYiLCJpYXQiOjE1ODQwMzc5MDZ9.V3Kw8_UuzlEXIvvoN-qUkrK2wqm1tT3hx6rJxR470_M');
    },
    success: function (res) {
        console.log(res);
    },
    error: function () { // Hard failure, like network error
        console.error('Seems network error');
    }
});

7. GET POST LIST
---------------------------
$.ajax({
    method: 'GET',
    url: '/api/posts',
    contentType: 'application/json',
    success: function (res) {
        console.log(res);
    },
    error: function () { // Hard failure, like network error
        console.error('Seems network error');
    }
});

8. GET POST
----------------------------
$.ajax({
    method: 'GET',
    url: '/api/posts/5e6a83897a34d3205434138d',
    contentType: 'application/json',
    success: function (res) {
        console.log(res);
    },
    error: function () { // Hard failure, like network error
        console.error('Seems network error');
    }
});

9. UPDATE POST
--------------------
var data = {
    "description": "The tile is Four. How about that?"
}
$.ajax({
    method: 'PATCH',
    url: '/api/posts/5e6a884a46ef1127463560b8',
    contentType: 'application/json',
    data: JSON.stringify(data),
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZhODAxMmI3NzI2NzFlNzA1OGM3MmYiLCJpYXQiOjE1ODQwMzc5MDZ9.V3Kw8_UuzlEXIvvoN-qUkrK2wqm1tT3hx6rJxR470_M');
    },
    success: function (res) {
        console.log(res);
    },
    error: function () { // Hard failure, like network error
        console.error('Seems network error');
    }
});

10. DELETE POST
---------------------
$.ajax({
    method: 'DELETE',
    url: '/api/posts/5e6a884a46ef1127463560b8',
    contentType: 'application/json',
    //data: JSON.stringify(data),
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZhOGE3OTQ2ZWYxMTI3NDYzNTYwYmEiLCJpYXQiOjE1ODQwNDA1Njl9.IqOWj8GFDcbylsPafYrC8EyzXN8AjG7uRYjALcwH5j4');
    },
    success: function (res) {
        console.log(res);
    },
    error: function (e) { // Hard failure, like network error
        console.error(e.responseJSON);
    }
});


11. CREATE COMMENT
---------------------
var data = {
    "comment": "How is Two and Two Four?",
    "postId": "5e6a88a246ef1127463560b9"
}
$.ajax({
    method: 'POST',
    url: '/api/comments',
    contentType: 'application/json',
    data: JSON.stringify(data),
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZhOGE3OTQ2ZWYxMTI3NDYzNTYwYmEiLCJpYXQiOjE1ODQwNDA1Njl9.IqOWj8GFDcbylsPafYrC8EyzXN8AjG7uRYjALcwH5j4');
    },
    success: function (res) {
        console.log(res);
    },
    error: function (e) { // Hard failure, like network error
        console.error(e.responseJSON);
    }
});

12. UPDATE COMMENT
---------------------
var data = {
    "comment": "Dont you know that from school?"
}
$.ajax({
    method: 'PATCH',
    url: '/api/comments/5e6b3282fdbe6519ca45e162',
    contentType: 'application/json',
    data: JSON.stringify(data),
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZhODAxMmI3NzI2NzFlNzA1OGM3MmYiLCJpYXQiOjE1ODQwMzc5MDZ9.V3Kw8_UuzlEXIvvoN-qUkrK2wqm1tT3hx6rJxR470_M');
    },
    success: function (res) {
        console.log(res);
    },
    error: function (e) { // Hard failure, like network error
        console.error(e.responseJSON);
    }
});

13. DELETE COMMENT
------------------------
$.ajax({
    method: 'DELETE',
    url: '/api/comments/5e6b3217fdbe6519ca45e161',
    contentType: 'application/json',
    //data: JSON.stringify(data),
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZhODAxMmI3NzI2NzFlNzA1OGM3MmYiLCJpYXQiOjE1ODQwMzc5MDZ9.V3Kw8_UuzlEXIvvoN-qUkrK2wqm1tT3hx6rJxR470_M');
    },
    success: function (res) {
        console.log(res);
    },
    error: function (e) { // Hard failure, like network error
        console.error(e.responseJSON);
    }
});

14. MODERATE POST CENSOR [ADMINS ONLY]
------------------------------------------
var data = {
    'is_censored': true
}
$.ajax({
    method: 'PATCH',
    url: '/api/moderate/posts/5e6a88a246ef1127463560b9',
    contentType: 'application/json',
    data: JSON.stringify(data),
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZhOGE3OTQ2ZWYxMTI3NDYzNTYwYmEiLCJpYXQiOjE1ODQwNDA1Njl9.IqOWj8GFDcbylsPafYrC8EyzXN8AjG7uRYjALcwH5j4');
    },
    success: function (res) {
        console.log(res);
    },
    error: function (e) { // Hard failure, like network error
        console.error(e.responseJSON);
    }
});


15. MODERATE POST DELETE [ADMINS ONLY]
------------------------------------------
$.ajax({
    method: 'DELETE',
    url: '/api/moderate/posts/5e6a88a246ef1127463560b9',
    contentType: 'application/json',
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZhOGE3OTQ2ZWYxMTI3NDYzNTYwYmEiLCJpYXQiOjE1ODQwNDA1Njl9.IqOWj8GFDcbylsPafYrC8EyzXN8AjG7uRYjALcwH5j4');
    },
    success: function (res) {
        console.log(res);
    },
    error: function (e) { // Hard failure, like network error
        console.error(e.responseJSON);
    }
});

16. MODERATE COMMENT CENSOR [ADMINS ONLY]
------------------------------------------
var data = {
    'is_censored': true
}
$.ajax({
    method: 'PATCH',
    url: '/api/moderate/comments/5e6a88a246ef1127463560b9',
    contentType: 'application/json',
    data: JSON.stringify(data),
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZhOGE3OTQ2ZWYxMTI3NDYzNTYwYmEiLCJpYXQiOjE1ODQwNDA1Njl9.IqOWj8GFDcbylsPafYrC8EyzXN8AjG7uRYjALcwH5j4');
    },
    success: function (res) {
        console.log(res);
    },
    error: function (e) { // Hard failure, like network error
        console.error(e.responseJSON);
    }
});


17. MODERATE COMMENT DELETE [ADMINS ONLY]
------------------------------------------
$.ajax({
    method: 'DELETE',
    url: '/api/moderate/comments/5e6a88a246ef1127463560b9',
    contentType: 'application/json',
    beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZhOGE3OTQ2ZWYxMTI3NDYzNTYwYmEiLCJpYXQiOjE1ODQwNDA1Njl9.IqOWj8GFDcbylsPafYrC8EyzXN8AjG7uRYjALcwH5j4');
    },
    success: function (res) {
        console.log(res);
    },
    error: function (e) { // Hard failure, like network error
        console.error(e.responseJSON);
    }
});
