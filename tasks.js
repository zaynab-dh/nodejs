
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
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text.split(" ",1) === 'hello'){
    hello();
  }
  else if(text === 'help\n'){
    help();
  }
  else if(text === 'list\n'){
    list(toDoList);
  }
  else if(text.split(" ",1) === 'add'){
    add(toDoList);
  }
  else if(text.split(" ",1) === 'remove'){
    remove(toDoList);
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


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(x){
  console.log(x.trim() + '!')
}


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
  commands.push("exit: Allow user to quit the app\n" ,"quit: Allow user to quit the app\n","hello: when the user starts his command with hello it will return the same sentence with !",
  "list: lists all tasks\n", "add: allows to add a task", "remove: allows to remove a task");
  console.log(commands)
}

/**
 * list all tasks
 *
 * @returns {void}
 */
 function list(l){
  for (let i=1; i<= l.length; i++)
  {
    console.log(i + '- ' + l[i-1])
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
     add.exit;
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
    l.splice(rp,1);
   }
   
   list(l);
}


// The following line starts the application
startApp("Zaynab Dhaybi")
remove(['a','b','c'],'remove 1');
