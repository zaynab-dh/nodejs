
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
  process.stdin.resume();
  process.stdin.setEncoding('utf8'); 
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


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
  
  var toDoList = [];
  var done = [];
  if (text.trim() === 'quit' || text.trim() === 'exit') {
    quit();
  }
  else if(text.trim() === 'hello'){
    hello();
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
  else if(text.split(" ")[0] === 'add'){
    add(toDoList,text);
  }
  else if(text.split(" ")[0] === 'remove'){
    remove(toDoList,text);
  }
  else if(text.split(" ")[0] === 'edit'){
    edit(toDoList,text);
  }
  else if(text.split(" ")[0] === 'check'){
    check(toDoList,text,done);
  }
  else if(text.split(" ")[0] === 'uncheck'){
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
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

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
    console.log(i + ' - [' + done[i-1] + '] ' + l[i-1])
  } 
  
}

/**
 * add a task
 *
 * @returns {void}
 */
 function add(l,n)
 {
   if (n === 'add'|| n === 'add '){
     console.log("error")
     return
   }
   else
   {
    l.push(n.slice(4));
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
   if ( e === 'edit'){
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
     done[dd-1] = "✓";
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
    done[dd-1] = " ";
   }
   else{
    console.log("error")
    return
   }
}

const fs = require ('fs');
let data = JSON.stringify('./database.json');
fs.writeFileSync('database.json',data);

fs.readFileSync('database.json',(err,data)=>{
  if (err) throw err;
  let database = JSON.parse(data);
  console.log(database);
});

const process = require('process');
console.log(process.argv);






// The following line starts the application
startApp("Zaynab Dhaybi")



