## Requirements
- API
  - Get all timesheet entries
  - Get all entries for a given client
  - Create an entry

- Tasks
  - Store CSV in database
  - Display data in tabular format

<hr>

## Running the Code

### Cloud
  - View the app live <a href="https://gm-app-sp.herokuapp.com/">here</a> - may take a couple seconds to warm up.

### Locally
  - Clone this repository
    - ```git clone https://github.com/sam-parsons/gm-app-sp.git```
  - Install node modules 
    - ```npm install```
  - Start a local PostgreSQL server
  - Set DATABASE_URL variable in a .env file on the top level of the directory, then
    - ```npm run dev``` 

<hr>

## Technologies Used
- React
- Node
- Express
- PostgreSQL
- Webpack
- Babel
- Heroku