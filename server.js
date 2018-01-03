// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos FINISHED
   */
   res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo. FINISHED
   */
  // Post
  var newTodos = req.body; //Setting up a variable for a newItem on todos list
  if (todos.length > 0) { //a conditional statement checking to see if the list contains items and assigning id
    newTodos._id = todos[todos.length - 1]._id + 1; 
    } else { 
      newTodos._id = 1; 
    }


  // newTodos = todos.length + 1; first attempts at logic
  todos.push(newTodos); 
  res.json(newTodos);
  // res.send(req.body);

});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   res.send(todos[req.params.id -1]);
   // res.json({todos: todos[req.params._id -1]}); first try and build out idea.
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   // res.send(todos[req.params.id -1] = (req.body));
   var todoId = Number(req.params.id);

 if(!req.body.task || !req.body.description){
   res.send("task");
 } else {
   req.body._id = todoId;

   var theTodo = todos.find(function(todos){
     return todos._id === Number(req.params.id);
   });

   theTodo.task = req.body.task; //
   theTodo.description = req.body.description;
   res.json(theTodo);
 }

// });
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */ //  I NEED TO USE SPLICE, USE HAVEN'T FINISHED YET!
  todos.splice([req.params.id -1], 1);
  // res.send('You DELETEd the todo with the ID of ');
  res.json(todos);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
