# Wright Brothers Airport Shuttle Service

This repository houses the codebase for Edward Breja's Database System Design & Dev final project. The repository contains an Express.js + MySQL web application for a fictional company called *Wright Brothers Airport Shuttle Service*. Save customer/ticket info, search through tickets/customers by any field, save csv files from tables, and various other things with this app.

Demo
---
[Demo Front End](https://crypticsquirrel.github.io/Airport-Shuttle-App/) (This is only the user interface - no functionality)

<img src="https://github.com/CrypticSquirrel/Airport-Shuttle-App/blob/master/demo.gif" width="500">

Documentation 
---

Initializing this project is fairly easy. First clone/download application. Navigate to the root repository of the project and run 
` npm install `
Next you'll need to set up the database. Run the `setupDB.sql` file. In the root of the repository run this command. If you have set up sql users login with a user/password instead of `root`. Otherwise it's not necessary.
```
mysql -u root < setupDB.sql
```
Now you should be able to run the app with the command `node index.js` in the root repository.


Attribution 
---

#### Software

- [mysqljs](https://github.com/mysqljs/mysql) : node.js driver for mysql

#### User Interface

- [Top-hat Themes](https://github.com/themesguide/top-hat) : Bootstrap themes

License
---

MIT License, Enjoy!

