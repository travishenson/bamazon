var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazonDB"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("Connected to Bamazon as ID " + connection.threadId);
	console.log("Loading Bamazon database...");
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		for (var i = 0; i <= res.length - 1; i++) {
			console.log(`
        Item ID: ${res[i].item_id}
        Product Name: ${res[i].product_name}
        Price: $${res[i].price}
        Inv: ${res[i].stock_quantity}
        `);
		}
		selectProduct();
	});
});

function selectProduct() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "What is the ID of the item you wish to purchase?",
				name: "selectedProductID"
			}
		])
		.then(function(inqResponse) {
			var selectedProductID = inqResponse.selectedProductID;
			connection.query(
				`SELECT * FROM products WHERE item_id = '${selectedProductID}'`,
				function(err, res) {
					if (err) throw err;
					console.log(`You selected ${res[0].product_name}.`);
					inquirer
						.prompt([
							{
								type: "input",
								message: `How many ${
									res[0].product_name
								} would you like to purchase?`,
								name: "desiredQuantity",
								validate: function(input) {
									return (
										input < res[0].stock_quantity ||
										"Sorry! Our inventory does not have that many."
									);
								}
							}
						])
						.then(function(inqResponse) {
							console.log("Processing your transaction...");
							var itemsPurchased = parseInt(inqResponse.desiredQuantity);
							var unitPrice = parseInt(res[0].price);
							var totalCost = itemsPurchased * unitPrice;
							connection.query("UPDATE products SET ? WHERE ?", [
								{
									stock_quantity: res[0].stock_quantity - itemsPurchased
								},
								{
									item_id: res[0].item_id
								}
							]);
              console.log("Success! Your total is $" + totalCost);
						});
				}
			);
		});
}
