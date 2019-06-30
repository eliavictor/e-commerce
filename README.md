# e-commerce

### List of products routes:
Route | HTTP | Header(s) | Body | Description 
------------ | ------------- | ------------- | ------------- | ------------- 
/products | GET | token:String | none | Get list of products info 
/products/:id | GET | token:String | none | Get a product info
/products | POST | token:String | img:file, name:String, description:String, price:Number, stock:Number, hotProducts:Boolean | Create a product
/products/:id | PUT | token:String | img:file, name:String, description:String, price:Number, stock:Number, hotProducts:Boolean | Update a product
/products/:id | DELETE | token:String | none | Delete a product

### List of transactions routes:
Route | HTTP | Header(s) | Body | Description 
------------ | ------------- | ------------- | ------------- | ------------- 
/transactions | GET | token:String | none | Get list of transactions info 
/transactions/:id | GET | token:String | none | Get a transaction info
/transactions/product/:id | GET | token:String | none | Get a transaction info search by productId
/transactions/user/:id | GET | token:String | none | Get a transaction info search by userId
/transactions | POST | token:String | userId:String, productId:String, amount:Number, status:Boolean | Create a product
/transactions/:id | PUT | token:String | userId:String, productId:String, amount:Number, status:Boolean | Update a product
/transactions/:id | DELETE | token:String | none | Delete a transaction

### List of users routes:
Route | HTTP | Header(s) | Body | Description 
------------ | ------------- | ------------- | ------------- | ------------- 
/users/signin/ | POST | none | email:String, password:String | SignIn User
/users/signup/| POST | none | email:String, password:String | Register User

Only Admin can Create, Update, Delete products
Admin must use email admin@mail.com, and name admin

* $ npm install
* $ npm run dev