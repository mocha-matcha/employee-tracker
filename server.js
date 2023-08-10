const express = require('express');
const routes = require('./routes/index');
const inquirer = require('inquirer');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs')
const db = require('./connection');
const path = require('path');
const { log } = require('console');
const { type } = require('os');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);
const SEEDS = fs.readFileSync(path.join(__dirname, `./db/seeds.sql`)).toString();

const setSeeds = () => {
  db.query('DELETE FROM department', (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log("Query run successfully");
    }

  });

  db.query('DELETE FROM role', (err, result) => {
    if (err) {
      throw err;
    }

  });

  db.query('DELETE FROM employee', (err, result) => {
    if (err) {
      throw err;
    }

  });

  db.query(`INSERT INTO department (id,name)
VALUES (1,"Sales"),
(2,"Engineering"),
(3,"Finance"),
(4,"Legal");`, (err, result) => {
    if (err) {
      throw err;
    }

  });


  db.query(`INSERT INTO role(id,title,salary,department_id)
VALUES (1,"Role 1",10000,1),
(2,"Role 2",10000,1),
(3,"Role 3",10000,1),
(4,"Role 4",10000,1);`, (err, result) => {
    if (err) {
      throw err;
    }

  });


  db.query(`INSERT INTO employee(id,first_name,last_name,role_id,manager_id)
VALUES (1,"John","Doe",1,1),
(2,"Mimi","Mal",4,1),
(3,"Zoo","Wee",3,1),
(4,"Person","Nosrep",1,1);`, (err, result) => {
    if (err) {
      throw err;
    }

  });
};





const getCall = async (table) => {
  await fetch(`http://localhost:${PORT}/api/${table}`,

    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })


    

    ask();
};

const putEmployeeRole = async () => {

  let possibleEmployees = [];

  db.query('SELECT * FROM employee', async (err, result) => {
    if (err) {
      throw err;
    }
    // console.log(result);
    possibleEmployees = await result.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
    // console.log(possibleManagers);
    const employeeChoice = await inquirer.prompt([
      {
        name: 'employee',
        type: 'list',
        message: 'Who is the employee you want to update?',
        choices: possibleEmployees
      }]);

    const selectedEmployee = employeeChoice.employee;
    


 let possibleRoles = []
    db.query('SELECT * FROM role', async (err, result) => {
      if (err) {
        throw err;
      }
      // console.log(result);
      possibleRoles = await result.map(({ id, title }) => ({ name: title, value: id }));
      // console.log(possibleRoles); })
      console.log(possibleRoles)



      const roleChoice = await inquirer.prompt([
        {
          name: 'role',
          type: 'list',
          message: 'What is their new role?',
          choices: possibleRoles
        }]);


      const selectedRole = roleChoice.role;


      db.query(`UPDATE employee SET role_id = ${selectedRole}  WHERE id = ${selectedEmployee}`,(err)=>{


        if (err) {
          throw err
        }
        else{

          console.log('OK')
          ask();
        }


      })


    })


    


})}


const postDepartment = async () =>
{



const departmentData = await inquirer.prompt(

[


  {

    name:'name',
    message:"What is the department's name?",
    type:'input'
  }
]

);

db.query(`INSERT INTO department (name) VALUES ('${departmentData.name}')`,(err)=>{


  if (err) {
    throw err
  }
  else{

    console.log('OK')
    ask();
  }


})


}

const postRole = async () => {

  let data = {}
  const roleData = await inquirer.prompt(
    [
      {
        name: 'title',
        type: 'input',
        message: "Role's Name?"


      },
      {

        name: 'salary',
        type: 'input',
        message: "Roles'? Salary"


      },



    ]

  )

  data['title'] = roleData.title;
  data['salary'] = roleData.salary;

  console.log(data)
  let possibleDepartments = [];

  db.query('SELECT * FROM department', async (err, result) => {
    if (err) {
      throw err;
    }
    // console.log(result);
    possibleDepartments = await result.map(({ id, name }) => ({ name: name, value: id }));
    // console.log(possibleManagers);
    const departmentChoice = await inquirer.prompt([
      {
        name: 'department',
        type: 'list',
        message: "What is the role's department?",
        choices: possibleDepartments
      }]);

    data['department_id'] = departmentChoice.department;



      db.query(`INSERT INTO role (title,salary,department_id) VALUES ('${data.title}','${data.salary}',${data.department_id})`,(err)=>{


        if (err) {
          throw err
        }
        else{

          console.log('OK')
          ask();
        }


      })


    })




  
























};

const postEmployee = async () => {

  let data = {}
  const employeeData = await inquirer.prompt(
    [
      {
        name: 'first_name',
        type: 'input',
        message: 'Employees First Name?'


      },
      {

        name: 'last_name',
        type: 'input',
        message: 'Employees Last Name?'


      },



    ]

  )

  data['first_name'] = employeeData.first_name;
  data['last_name'] = employeeData.last_name;

  console.log(data)
  let possibleManagers = [];

  db.query('SELECT * FROM employee', async (err, result) => {
    if (err) {
      throw err;
    }
    // console.log(result);
    possibleManagers = await result.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
    // console.log(possibleManagers);
    const managerChoice = await inquirer.prompt([
      {
        name: 'manager',
        type: 'list',
        message: 'Who is their manager?',
        choices: possibleManagers
      }]);

    data['manager_id'] = managerChoice.manager;



    let possibleRoles = []
    db.query('SELECT * FROM role', async (err, result) => {
      if (err) {
        throw err;
      }
      // console.log(result);
      possibleRoles = await result.map(({ id, title }) => ({ name: title, value: id }));
      // console.log(possibleRoles); })
      console.log(possibleRoles)



      const roleChoice = await inquirer.prompt([
        {
          name: 'role',
          type: 'list',
          message: 'What is their role?',
          choices: possibleRoles
        }]);


      data['role_id'] = roleChoice.role;
      console.log(data);


      db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('${data.first_name}','${data.last_name}',${data.role_id},${data.manager_id})`,(err)=>{


        if (err) {
          throw err
        }
        else{

          console.log('OK')
          ask();
        }


      })


    })




  })







}

const ask = async () => {

  const answers = await inquirer.prompt([
    {
      name: 'choice'
      , message: 'what would you like to do.',
      type: 'list',

      choices: ['view departments', 'view roles', 'view employees', 'add department', 'add role', 'add employee', 'update employee role']
    }

  ]
  );




  switch (answers.choice) {
    case 'view departments':
      getCall('department')
      break;
    case 'view roles':
      getCall('role');
      break;
    case 'view employees':
      getCall('employee');
      break;
    case 'add department':
      postDepartment();
      break;
    case 'add role':
      postRole();
      break;
    case 'add employee':
      await postEmployee();
      break;
    case 'update employee role':
      putEmployeeRole();
      break;


  }




}



app.listen(PORT, async () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`)


  setSeeds();
  ask();











});



