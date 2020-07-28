const express = require('express');
const router = express.Router();



// Import Controller
const { viewTodos, createTodo, deleteTodo } = require('../controller/todo.controller')
//assign endpoint path to mongoose functions
router.post('/todo/view', viewTodos);
router.post('/todo/create' , createTodo);
router.delete('/todo/delete' , deleteTodo);

module.exports = router