// General npm requirements
const inquirer = require("inquirer");
const fs = require("fs");
// Required JS files
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

async function getRolling() {
    let teamHTML = "";
    let teamNumber;

    // Question 1 that prompts the user for team number/size
await inquirer.prompt({
        type: "number",
        message: "How many members are there on your team?",
        name: "howMany"
    })
        .then((data) => {
            console.log(data)
            teamNumber = data.howMany + 1;
        });

        
    // Validation
    if (teamNumber === 0) {
        console.log("You can't have an empty team.");
        return;
    }

    // Prompts the user for the basic Employee methods/parameters
    for (let i = 1; i < teamNumber; i++) {
        let name;
        let id;
        let title;
        let email;

        await inquirer.prompt([
            {
                type: "input",
                message: `Please, enter the employee's name.`,
                name: "name"
            },
            {
                type: "input",
                message: `Please, enter employee ${i}'s id.`,
                name: "id"
            },
            {
                type: "input",
                message: `Please, enter employee ${i}'s email.`,
                name: "email"
            },
            {
                type: "list",
                message: `Please, enter employee ${i}'s title.`,
                name: "title",
                choices: ["Engineer", "Intern", "Manager"]
            }
        ])
        // Stores the user's responses
        .then((data) => {
            name = data.name;
            id = data.id;
            title = data.title;
            email = data.email;
        });

        switch(title){
            case "Engineer":
                
            await inquirer.prompt([
                {
                    type: "input",
                    message: `Enter your Engineer's GitHub handle.`,
                    name: "github"
                },
            ])
            .then((data) => {
                const engineer = new Engineer(name, id, email, data.github);
                memberTemplate = fs.readFileSync("templates/engineer.html");
                teamHTML = teamHTML + eval(memberTemplate);
            });
            break;

            case "Intern":

            await inquirer.prompt([
                {
                    type: "input",
                    message: `Enter the intern's school here.`,
                    name: "school"
                },
            ])
            .then((data) => {
                const intern = new Intern(name, id, email, data.school);
                memberTemplate = fs.readFileSync("templates/intern.html");
                teamHTML = teamHTML + eval(memberTemplate);
            });
            break;

            case "Manager":

                await inquirer.prompt([
                    {
                        type: "input",
                        message: `What is your manager's Office Number?`,
                        name: "officeNum"
                    }
                ])
                .then((data) => {
                    const manager = new Manager(name, id, email, data.officeNum);
                    memberTemplate = fs.readFileSync("templates/manager.html");
                    teamHTML = teamHTML + eval(memberTemplate);
                });
                break;
        }
        
    };

    const finalHTML = fs.readFileSync("templates/employee.html");

    teamHTML = eval(finalHTML);

    await fs.writeFile("output/fullTeam.html", teamHTML, function(err){
        if (err) {
            return console.log(err);
        }
        console.log("Welcome to the team");
    });
}

getRolling();
