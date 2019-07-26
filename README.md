# Steps
Download latest NodeJs: https://nodejs.org/en/download/  

# Commands / Dependencies:
npm-init  
npm install express  
npm install nodemon  
npm install morgan  
npm install body-parser  
npm install mongoose  
npm install multer  
npm install dateformat  
npm install bcrypt  
npm install jsonwebtoken  

# Run Application
npm run dev

# Helpers:
https://expressjs.com/  
https://nodemon.io/  
https://github.com/expressjs/morgan/  
https://www.npmjs.com/package/body-parser/  
https://mongoosejs.com/  
https://www.npmjs.com/package/multer/  
https://github.com/kelektiv/node.bcrypt.js  
https://github.com/auth0/node-jsonwebtoken/  
https://jwt.io/

# Setup Cloud DB
* MongoDB Atlas - Connected to GCP (free tier since this is only a demo)  
* connectionString: mongodb+srv://sa:<password>@cluster0-v3kms.gcp.mongodb.net/test?retryWrites=true&w=majority  
* https://cloud.mongodb.com/v2/5d3661bcff7a250b453481fd#clusters  

# Local env settings
Before running application locally, make sure to update the **nodemon.json** file with your MongoDb password and your JWT Secret  

# Endpoints
(@) *User Authentication required*  

**USERS**  
POST  
localhost:8000/api/v1/users/signup  
```
{
   "email": "test@gmail.com",
   "password": "qwerty"
}
```

POST  
localhost:8000/api/v1/users/login  
```
{
   "email": "test@gmail.com",
   "password": "qwerty"
}
```

GET  
localhost:8000/api/v1/users  

DELETE (@)  
localhost:8000/api/v1/users/{id}  

**PRODUCTS**  
POST (@)  
localhost:8000/api/v1/products  
```
{
   "name": "first name",
   "price": 123.45
}
```

GET  
localhost:8000/api/v1/products  

GET by Id  
localhost:8000/api/v1/products/{id}  

PUT: full update (@)  
localhost:8000/api/v1/products/{id}  
```
{
   "name": "second test",
   "price": 456.67
}
```

PATCH - partial / full update (@)  
localhost:8000/api/v1/products/{id}  
```
{
   "name": "third test"
}
```
localhost:8000/api/v1/products/{id}
```
{
   "price": 98764.56
}
```
localhost:8000/api/v1/products/{id}
```
{
  "name": "last test",
   "price": 98764.56
}
```

DELETE (@)  
localhost:8000/api/v1/products/{id}  

**ORDERS**
POST (@)  
localhost:8000/api/v1/orders  
```
{
   "product": "5d379f71678451257cb5e2bb",
   "quantity": 3
}
```

GET  
localhost:8000/api/v1/orders  

GET by Id  
localhost:8000/api/v1/orders/{id}  

DELETE (@)  
localhost:8000/api/v1/orders/{id}
