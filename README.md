# IO partners

API for management of partners

#### Available endpoints

The application is running on http://localhost:3001/api/v1.

> **GET**
>
> - **/partners**
>   Get all the partners registered in the database
>
> - **/partners/id**
>   Get one partner by ID
>
>   Example:
>   /partners/2640d4f6-6701-4e3c-901b-936d9015b4c9
>
> - **/partners/nearest**
>   Get the nearest partner by latitude and longitude
>
>   Query params:
>
>   | key  | Value    |
>   | ---- | -------- |
>   | lat  | -23.5588 |
>   | long | -46.6598 |
>
>   Example:
>   /partners/nearest?lat=-23.5588&long=-46.6598
>
> **POST**
>
> - **/partners**
>   Create a new partner
>
>   Body JSON:
>
> ```
> {
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
> }
> ```

#### Requirements

    * Node v14.8.0
    * Yarn
    * MongoDB

[Install MongoDB](https://docs.mongodb.com/manual/installation/)

#### Run application locally

After having cloned the repository and having all the requirements installed, run the MongoDB in your default port (27017), creating a database called partnersdb.

If you want to manage with a graphic interface, you can to install the MongoDB Compass Community or Robo 3T to handle the MongoDB.

Execute the following commands to run the application:

    - yarn
    - yarn dev

#### Running the tests

    - yarn test
    - yarn test:coverage

#### Generate pack deploy

To generate the pack deploy, after running the tests and passing, run the following command:

    - yarn build

After that, the dist folder is available to deploy your content, in the project root.
