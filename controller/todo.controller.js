// Import Models
const Todo = require('../models/todo.model');


/**
 * @function: viewTodos
 * @description: View todos from the logged in user 
 * @access User 
 * 
 * @param {*} req user information from body
 * @param {*} res with user information to client
 */
exports.viewTodos = function(req, res){
    const user = req.body.user;
    Todo.find({user:user},{_id:false},function(err, todos) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while retrieving cars." });
        } else {
            res.send(todos);
        }
    });
    
}

/**
 * @function: createTodo
 * @description: Create a todo from the logged in user
 * @access User 
 * 
 * @param {*} req user information from body
 * @param {*} res with user information to client
 */
exports.createTodo =function (req, res){
    const user = req.body.user;
    let todo = new Todo({ user:user, item: req.body.item,itemID:req.body.itemID });

    // Save new todo
    todo.save(function(err,data){
        if(err){
            console.log(err);
            res.status(500).send({message:"Some error occurred while creating the car"});
        }else{
            console.log(data);
            res.status(201).json({
                message: 'Item added!'
            })
        }
    });
    
}


/**
 * @function: deleteTodo
 * @description: Delete a todo from the logged in user
 * @access User 
 * 
 * @param {*} req user information from body
 * @param {*} res with user information to client
 */
exports.deleteTodo = function(req, res){
    const { user,itemID } = req.body;

    Todo.findOneAndRemove({user:user,itemID:itemID},function(err) {
        if (err) {
            return res.status(400).json({
                message: 'Failed to delete todo'
            })
        }

        return res.status(201).json({
            message: 'Todo deleted!'
        })
    });

   
}


