# IO partners

API for management of partners

#### Available endpoints

The application is running on http://localhost:3001/api/v1.

>
>**GET**
>
> - **/partners**
>Get all the partners registered in the database
>
> - **/partner/id**
>Get one partner by ID
>
>**POST**
> - **/partners**
>Body JSON
>~~~
>{
>  "tradingName": "Adega da Cerveja - Pinheiros",
>  "ownerName": "Zé da Silva",
>  "document": "1432132123891/0001",
>  "coverageArea": { 
>    "type": "MultiPolygon", 
>    "coordinates": [
>      [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
>      [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
>    ]
>  },
>  "address": { 
>    "type": "Point",
>    "coordinates": [-46.57421, -21.785741]
>  }
>}
>~~~
>

#### Requirements

    * Node v14.8.0
    * Yarn
    * MongoDB
[Install MongoDB](https://docs.mongodb.com/manual/installation/)

#### Run application locally

After having cloned the repository and having all the requirements installed, run the MongoDB in your default port (27017), creating a database called partnersdb.

If you want to manage with a graphic interface, you can to install the Robo 3T to handle the MongoDB.
    
Execute the following commands to run the application:

    - yarn
    - yarn dev

#### Running the tests


#### Generate pack deploy

To generate the pack deploy, after running the tests and passing, run the following command:

    - yarn build

After that, the dist folder is available to deploy your content, in the project root.
