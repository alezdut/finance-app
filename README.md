# finance-app

# How to start the project:

If you want to see the page for yourself, you'll need to do the following:

- Clone the repository
- Install [PostgreSQL](https://www.postgresql.org/) on your computer and create a database called `financeapp`.
- Modify the `.env` file located in in the `api` folder with the following contents:

```
DB_USER={Your postgreSQL user}
DB_PASSWORD={Your postgreSQL password}

```
- Run `npm install` on api folder
- Run `npm run dev` on api folder (yo must see `listening at 3001`) and let it running
- Run `npm install` on client folder
- Run `npm start` on client folder

The app doesn't have any users created by default, you'll have to register to use the app

# Previews

### Register:

![alt text](./images/1.jpg "register")

### Balance:

![alt text](./images/2.jpg "balance")

### Add operation:

![alt text](./images/3.jpg "add operation")
