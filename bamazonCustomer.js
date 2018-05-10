var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    
    user:"root",

    password:"root",
    database:"bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayProducts();
  });

function displayProducts(){
    connection.query("select * from departments", function(err, res){
        if (err) throw err;
        for( var i=0; i< res.length; i++) {
            console.log(res[i].id + " | " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + " | ")
        }
        console.log("------------------------------------------")
        askQuestions();
        connection.end();
    });
}

function askQuestions(){
    inquirer
        .prompt([
            {
                name: "itemId",
                type: "input",
                message: "What is the item id for the product you'd like to purchase?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?"
            }
        ])
        .then(function(answer) {
            switch(answer.itemId) {
                case '1001':
                    connection.query(
                    "update products set ? where ?"
                    [
                        {
                        stock_quantity: stock_quantity - answer.quantity
                        },
                        {
                            item_id: 1001
                        }
                    ]
                )
        }}
    )}
