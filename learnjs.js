let name ="rishitha"
let age = Symbol("name");
console.log(age);

const tasks =[];

const addtask=(task) =>{
    tasks.push(task);
console.log("added task "+task)
};
let hey;

addtask("learn arrays");
addtask("learn objects");
console.log(tasks);
console.log(hey);//undefined

let x;
console.log(x); //undefined
console.log(y);
var y=10;

console.log(y);

//loops
for(let i=0;i<6;i++){
    console.log(i);
}
console.log("for of loop");
addtask("learn loops");
addtask("learn functions"); 
addtask("learn objects");
for(const task of tasks){
    console.log(task);
}
console.log("for in loop");
for(const task in tasks){
    console.log(tasks[task]);
}

//creating an object for a class
const employee ={
    name: "harshitha",
    age : 24,
    ismarried : false
};

for(const details in employee){
    console.log(`${details}: ${employee[details]}`);
}
console.log("while loop");
let i=0;
while(i<tasks.length){
    console.log(tasks[i]);
    i++;
}

//forEach loop
console.log("forEach loop");
tasks.forEach((task,i)=>{
    console.log(`${i}:${task}`);
});


