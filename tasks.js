const fs = require('fs');
const path = "database.json";

/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){

  let arg = process.argv[2]

  try{
    const data = fs.readFileSync((arg)? arg : path);
    toDoList = JSON.parse(data);

  }catch(e){
    console.log("error: make sure the file existed")
    console.log("Exit...", e);
    process.exit();
  }


  process.stdin.resume();
  process.stdin.setEncoding('utf8'); 
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}
var toDoList = [];
var done = [];

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  
  
  if (text.trim() === 'quit' || text.trim() === 'exit') {
    quit();
  }
  else if(text.trim() === 'hello'){
    console.log('hello!');
  }
  else if(text.split(" ")[0] === 'hello'){
      console.log(text.trim() + '!');
  }
  else if(text.trim() === 'help'){
    help();
  }
  else if(text.trim() === 'list'){
    list(toDoList,done);
  }
  else if(text.trim().split(" ")[0] === 'add'){
    add(toDoList,text);
  }
  else if(text.trim().split(" ")[0] === 'remove'){
    remove(toDoList,text);
  }
  else if(text.trim().split(" ")[0] === 'edit'){
    edit(toDoList,text);
  }
  else if(text.trim().split(" ")[0] === 'check'){
    check(toDoList,text,done);
  }
  else if(text.trim().split(" ")[0] === 'uncheck'){
    uncheck(toDoList,text,done);
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


// /**
//  * Says hello
//  *
//  * @returns {void}
//  */
// function hello(x){
//   console.log(x.trim() + '!')
// }




/**
 * lists all the possible commands
 *
 * @returns {void}
 */
 function help(){
  var commands=[];  
  commands.push("exit: Allow user to quit the app" ,"quit: Allow user to quit the app","hello: when the user starts his command with hello it will return the same sentence with !",
  "list: lists all tasks", "add: allows to add a task", "remove: allows to remove a task", "edit: edits a task", "check: changes task to done", "uncheck: changes task to undone");
  console.log(commands)
}

/**
 * list all tasks
 *
 * @returns {void}
 */
 function list(l,done){
  for (let i=1; i<= l.length; i++)
  {
    if(done[i-1]===true){
    console.log(i + ' [ ✓ ] ' + l[i-1]);
  }else {
    console.log(i + ' [  ] ' + l[i-1]);

  }
  }

}

/**
 * add a task
 *
 * @returns {void}
 */
 function add(l,n)
 {
   if (n.trim().split(" ")[1] == undefined){
     console.log("error");
     return
   }
   else
   {

    l.push(n.slice(4));
    done.push(false);
   }
}

/**
 * remove a task
 *
 * @returns {void}
 */
 function remove(l,p)
 {
   if (p === 'remove'){
     l.splice(l.length-1,1);
   }
   else{
     let rp = p.slice(7)-1;
     if (rp >= l.length-1)
     {
      console.log("this number does not exist");
      return
     }
    l.splice(rp,1);
   }
}

/**
 * edit a task
 *
 * @returns {void}
 */
 function edit(l,e)
 {
   if (e.trim().split(" ")[1] == undefined){
    console.log("error")
    return
   }
   else if (e.slice(5,6) <= l.length){
    let pos = parseInt(e.slice(5,6));
    l[pos -1]=e.slice(7);
   }
   else{
      l[l.length-1]=e.slice(5);
   } 
}

/**
 * check a task
 *
 * @returns {void}
 */
 function check(l,d,done)
 {
    if (d.slice(5) <= l.length){
      let dd = parseInt(d.slice(5));
     done[dd-1] = true;
   }
   else{
    console.log("error")
    return
   }
}

/**
 * uncheck a task
 *
 * @returns {void}
 */
 function uncheck(l,u,done)
 {
   if (u.slice(7) <= l.length){
    let dd = parseInt(u.slice(7));
    done[dd-1] = false;
   }
   else{
    console.log("error")
    return
   }
}

/**
 * Exits the application
 *
 * @returns {void}
 */
 function quit(){
  let arg = process.argv[2]
  try{
    let data = JSON.stringify(todoList);
    fs.writeFileSync((arg) ? arg : 'database.json',data);

  }catch(e){
    console.log(e)
  }
  console.log('Quitting now, goodbye!')
  process.exit();
}








// The following line starts the application
startApp("Zaynab Dhaybi")



