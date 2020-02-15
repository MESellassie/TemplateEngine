// General npm requirements
const inquirer = require("inquirer");
const fs = require("fs");
// Required JS files
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

async function start() {
    let teamHTML = "";
    let teamNumber;

    // Question 1 that prompts the user for team number/size
    await inquirer.prompt({
        type: `number`,
        message: `How many members are there on your team?`,
        name: `howMany`
    })
        .then((data) => {
            teamNumber = data.howMany + 1;
        });

    // Validation
    if (teamNumber === 0) {
        console.log(`You can't have an empty team.`);
        return;
    }

    // Prompts the user for the basic Employee methods/parameters
    for (let i = 1; i < teamNUmber.length; i++) {
        let name;
        let id;
        let title;
        let email;

        await inquirer.prompt([
            {
                type: `input`,
                message: `Please, enter the employee's name.`,
                name: `name`
            },
            {
                type: `input`,
                message: `Please, enter employee ${i}'s id.`,
                name: `id`
            },
            {
                type: `input`,
                message: `Please, enter employee ${i}'s email.`,
                name: `email`
            },
            {
                type: `list`,
                message: `Please, enter employee ${i}'s title.`,
                name: `title`,
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
    }
}

