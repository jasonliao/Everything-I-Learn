var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tasks');

var Schema = mongoose.Schema;
var Tasks = new Schema({
	project: String,
	description: String
});
var Task = mongoose.model('Task', Tasks);

// adding a task POST
//var task = new Task();
//task.project = 'MongoDB';
//task.description = 'NoSQL database';
//task.save(function(err) {
//	if(err) {
//		throw err;
//	}
//	console.log('Task saved');
//});

// searching for a document GET
//Task.find({
//	'project': 'MongoDB'
//}, function(err, tasks) {
//	for (var i = 0; i <tasks.length; i++) {
//		console.log('ID:' + tasks[i]._id);
//		console.log(tasks[i].description);
//	}
//})

// update PUT
//Task.update({
//	_id:'5544cfaf93c36504197f83c6'
//}, {
//	description: 'update MongoDB decription'
//}, {
//	multi: false
//}, function(err, rows_updated){
//	if(err) {
//		throw err;
//	}
//	console.log('Updated.');
//});

// delete DELETE
//Task.findById('5544d0fe4d3ccff814aaf484', function(err, task) {
//	task.remove();
//});


//mongoose.disconnect();