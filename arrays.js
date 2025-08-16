//Array Methods

console.log("Array Methods");
const employees=[
    {name: "harshitha", age: 24, ismarried: false},
    {name:"rishitha", age:22, ismarried: true, isstudent: true},
    {name:"sai", age: 25, ismarried: false}
];

//print all the employess names and store in an array(map method)
const singlemp= employees.map((person)=>{
    console.log(person.name, person.ismarried);
    return person.name, person.ismarried;
})

console.log(singlemp);

//filter employees who are married and still studying.

const marstu = employees.filter((emp) => emp.ismarried == true && emp.isstudent == true);
console.log(marstu);

//find the last employee who is not married
const marr = employees.findLast((emp) => emp.ismarried != true);
console.log(`not married: `, marr);

//
const marries = singlemp.includes("true");
console.log(`is there any employee who is not married: `, marries);
