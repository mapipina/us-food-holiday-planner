# Food Holiday Planner for US
This is a React-based app that generates suggested recipes based on the US food holiday presented. I'm only planning on running this locally against my own Postgres db but may scale this for wider use if I think this would be interesting enough. 

Going to keep this as a simple monorepo but with easier dependency management and environment isolation with separate package.json files for each environment and the top-level project.

Here are the current phases I've outlined with the tasks I'm anticipating getting to within each phase. Codifying this to keep myself accountable for this fun little side project. 

*These phases will continue to be built out as I continue working on this*

**Phase 1 - Initial Project Setup**

- ✅ Setting up expected dir structure :check:
- ✅ Installing necessary dependencies
- ✅ Populating ReadME

**Phase 2 - Initial Backend Setup**

- ✅ Setting up my local database
- ✅ Setting up Sequelize
- ✅ Seeding local db

**Phase 3 - Expanding Sequelize and Creating APIs**

[ ] Set up the RESTful APIs needed by the frontend

[ ] Write functional tests with Jest

[ ] Create APIs with Express

**Phase 4 - Initial Frontend Build**

[ ] Set up sections for featured holiday and recipe results

[ ] Create mock objects based on expected results from recipes

[ ] Create empty states for no holiday, errors from public apis, etc.


## Folder Structure (for ease of access)
```sh
src
|-- /backend
|   |-- /config               
|   |   |-- config.ts         
|   |-- /src
|   |   |-- /db               
|   |   |   |-- connection.ts 
|   |   |   |-- migrations/
|   |   |-- /models           
|   |   |   |-- Holiday.ts
|   |   |   |-- Recipe.ts
|   |   |-- /routes           
|   |   |   |-- holidayRoutes.ts 
|   |   |   |-- recipeRoutes.ts  
|   |   |-- /controllers      
|   |   |   |-- holidayController.ts
|   |   |-- app.ts            
|   |   |-- server.ts        
|   |-- .env                  
|   |-- package.json          
|
|-- /frontend 
|   |-- /public               
|   |-- /src
|   |   |-- /components       
|   |   |-- /pages            
|   |   |-- /types            
|   |   |   |-- Holiday.ts    
|   |   |-- /utils            
|   |   |-- App.tsx           
|   |   |-- index.tsx         
|   |-- package.json          
|
|-- .gitignore
|-- README.md
|-- package.json              
|-- tsconfig.json   
```          