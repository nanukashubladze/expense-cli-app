#! /usr/bin/env node

const { Command } = require("commander");
const fs = require("fs").promises;
const path = require("path");
const program = new Command();

program
  .command("create")
  .description("create new expense")
  .argument("<total>", "total expense")
  .argument("<category>", "")
  .argument("<date>", "")
  .action((total, category, date) => {
    fs.readFile("./data.json", "utf-8").then((data) => {
      let expenses = [];
      if (data) {
        expenses = JSON.parse(data);
      }
      const expense = {
        id: expenses.length + 1,
        total,
        category,
        date,
      };
      expenses.push(expense);
      const json = JSON.stringify(expenses, null, 2);
      fs.writeFile("./data.json", json);
    });
  });

program
  .command("search")
  .description("search expense")
  .argument("<category>", "")
  .action((category) => {
    fs.readFile("./data.json", "utf-8")
      .then((res) => JSON.parse(res))
      .then((data) => {
        const index = data.findIndex((exp) => exp.category === category);
        if (index === -1) {
          console.log("Category doesn't exists");
        }
        const expense = data[index];
      })
      .catch((err) => {
        console.log(err);
      });
  });
program
  .command("delete")
  .description("delete expense")
  .argument("<id>", "")
  .action((id) => {
    fs.readFile("./data.json", "utf-8")
      .then((res) => JSON.parse(res))
      .then((data) => {
        const filteredData = data.filter((exp) => exp.id !== parseInt(id));
        const json = JSON.stringify(filteredData, null, 2);
        fs.writeFile("./data.json", json);
        console.log("Expense Deleted");
      })

      .catch((err) => {
        console.log(err);
      });
  });

program.parse();