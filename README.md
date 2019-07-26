# Steps
Download latest NodeJs: https://nodejs.org/en/download/

# Commands:
npm-init (init npm)
npm install --save express (framework for node.js)
https://expressjs.com/
npm install --save-dev nodemon (restarts server when files)
https://nodemon.io/

npm run dev (runs API => 'dev' configured in package.json)

npm install --save morgan (logging mechanism for nodejs)
https://github.com/expressjs/morgan
npm install --save body-parser (parse body of incoming requests)
https://www.npmjs.com/package/body-parser
npm install --save mongoose (connector for MongoDB)
https://mongoosejs.com/
npm install --save multer (handle binary data -> files, images)
https://www.npmjs.com/package/multer
npm install dateformat --save
npm install bcrypt --save
https://github.com/kelektiv/node.bcrypt.js#readme
npm install jsonwebtoken
https://github.com/auth0/node-jsonwebtoken
https://jwt.io/ (to decode your generated key)

Setup Cloud DB
* MongoDB Atlas - Connected to GCP (free tier since this is only a demo)
* connectionString: mongodb+srv://sa:<password>@cluster0-v3kms.gcp.mongodb.net/test?retryWrites=true&w=majority
* https://cloud.mongodb.com/v2/5d3661bcff7a250b453481fd#clusters

User Authentication

PRODUCTS
POST (*)
localhost:8000/api/v1/products
{
	"name": "first name",
	"price": 123.45
}

GET
localhost:8000/api/v1/products

GET by id
localhost:8000/api/v1/products/{id}

PUT: full update (*)
localhost:8000/api/v1/products/{id}
{
	"name": "second test",
	"price": 456.67
}

PATCH - partial / full update (*)
localhost:8000/api/v1/products/{id}
{
	"name": "third test"
}
localhost:8000/api/v1/products/{id}
{
	"price": 98764.56
}
localhost:8000/api/v1/products/{id}
{
  "name": "last test",
	"price": 98764.56
}

DELETE (*)
localhost:8000/api/v1/products/{id}


ORDERS
POST (*)
localhost:8000/api/v1/orders
{
	"product": "5d379f71678451257cb5e2bb",
	"quantity": 3
}

GET
localhost:8000/api/v1/orders

GET by id
localhost:8000/api/v1/orders/{id}

DELETE (*)
localhost:8000/api/v1/orders/{id}


USERS
POST
localhost:8000/api/v1/users/signup
{
	"email": "test@gmail.com",
	"password": "qwerty"
}

POST
localhost:8000/api/v1/users/login
{
	"email": "test@gmail.com",
	"password": "qwerty"
}

GET 
localhost:8000/api/v1/users

DELETE (*)
localhost:8000/api/v1/users/{id}
