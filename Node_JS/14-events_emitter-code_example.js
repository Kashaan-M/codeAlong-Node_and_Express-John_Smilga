// Event-Driven Programming
// Used heavily in Node.JS

const EventEmitter = require('events'); // This is a Class

const customEmitter = new EventEmitter(); // customEmitter is an Object, an 'instance' of the EventEmitter Class.
// The two most important methods customEmitter has are 'on()' and 'emit()'

//===>>> 'on()' methods subscribes to  an event and also takes a callback function as the second argument

customEmitter.on('response', () => {
  console.log('Data Received');
});
//===>>> An event can have multiple callback functions
/*
 
customEmitter.on('response'), () => {
  console.log('Data received')
}
customEmitter.on('response'), () => {
  console.log('Some other Important task')
}

*/

//==>> 'on()' should always come before 'emit()'. You have to fist listen for an event in order to emit it.

//===>>> when 'emit()' method is used for the same named event ('response' in this case) it will invoke the callback function
customEmitter.emit('response');

//--->>> We can pass arguments to 'emit()' alongside the event name
// -->> For example
customEmitter.on('myEvent', (name, id) => {
  console.log(`Data Received: User is ${name} and id is ${id}`);
});
customEmitter.emit('myEvent', 'John', 243434234);
