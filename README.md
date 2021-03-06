# Bamazon

> Homework assignment: University of Richmond Full Stack Boot Camp

## Overview
Bamazon is a simple CLI application that utilizes MySQL and Node to provide an interface for inventory management and consumer transactions. 

### Bamazon Example Customer Journey
Upon loading the Bamazon, app the customer is presented with the store inventory based on data from an external MySQL database. Typically, this will show the `item_id`, `product_name`, and `price`. For the purpose of visualization of function, the inventory count is also shown in the example below. 

The customer is prompted to answer which item they want to purchase, based on the `item_id` provided. From there, they are asked how many of the item they wish to purchase. 

Based on `inquirer.js` validation, the transaction is either completed or halted because of inventory availability. If the transaction is successful, the customer will receive a success message along with their total.

## Tools Used

Bamazon is a CLI app using the following languages, tools, and libraries:

- JavaScript
- Node.js
- MySQL

## Screenshots and GIFs

![GIF: bamazon customer journey](gifs/customerjs-example.gif)

## Deployment

Bamazon is a command line interface app and therefore cannot be deployed. It runs locally in a machine's command line.