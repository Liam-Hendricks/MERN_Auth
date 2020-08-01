#  Mern Todo App

Basic MERN Authentication where a user can have many todos and a todo can have 1 author/user (1 to many relationships)

## Getting Started

### Installing Packages

Run `npm install` in the root of this folder. Once finished, cd into the `todo-app` folder and run `npm install` again to install the client dependencies.

### Running App




- In the root of the project folder run:
```
    npm start
```
- cd to the client folder and run:
```
    npm start
```

(Please note that you should have two terminals open if you are running them seperately)

### Prerequisite
>#### SERVER:
server is running on port 5000


Inside config.js in config folder put place your mongodb uri address with password,username and database
For secret use any number of letters and numbers

>Example:

### Authorized JavaScript origins
```
http://localhost:3000
```

### Authorized redirect URIs
```
http://localhost:3000
```




## Application & Testing

The following routes are defined on the server:

- `/api/register`
- `/api/login`
- `/api/todo/view`
- `/api/todos/create`
- `/api/todos/delete`

In postman, you can do the following tests:

>1: Register:

You would first need to register as a user

##### POST http://localhost:5000/api/register
##### Content-Type: application/json
```
{
    "name": "liam",
    "email": "liamkeatonhendricks@gmail.com",
    "password": "test123"
}   
```

>2: Login:

After registering, you can now succesfully login.

In the response, you should get a token. Copy that token, we will use it for the next step!

##### POST http://localhost:5000/api/login
##### Content-Type: application/json

```
{
    "email": "liamkeatonhendricks@gmail.com",
    "password": "test123"
}
```

>3: Viewing Todos:

After copying the token gotten from the previous step.Go to jwt.io and past the token into encoded field
You should see in decoded id 5f1e9880bb780054a85de9fe
##### POST http://localhost:5000/api/todo/view
##### Content-Type: application/json

```
{
    "user": "5f1e9880bb780054a85de9fe",
    
}
```
The response should be empty since there are no todos




>4 Add Todo:
Simply copy id again for use 

##### POST http://localhost:5000/api/todo/create
##### Content-Type: application/json

{
    "user": "5f1e9880bb780054a85de9fe",
    "item":"Take out trash",
    "itemID":"12345asdada"

}




>5: Delete Todo:

Simply grab the itemID of the unwanted todo and user id and create the following
##### POST http://localhost:5000/api/todo/delete
##### Content-Type: application/json
{
    "user": "5f1e9880bb780054a85de9fe",
    "itemID":"12345asdada"

}