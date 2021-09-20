# IO partners

API for management of partners

Site used to generate arrays with real coordinates [GeoJson](https://geojson.io/)

#### Available endpoints

The application is running on http://localhost:3001/api/v1.

> **GET**
>
> - **/partners**
>   Get all partners registered in the database
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
>  "tradingName": "Adega Osasco",
>  "ownerName": "Ze da Ambev",
>  "document": "02.453.716/000170",
>  "coverageArea": {
>     "type": "MultiPolygon",
>     "coordinates": [
>       [
>         [
>           [-46.65314197540283, -23.554900010346444],
>           [-46.65211200714111, -23.55627688681703],
>           [-46.64966583251953, -23.556158869399074],
>           [-46.64889335632324, -23.55478199169205],
>           [-46.64915084838867, -23.553090379333423],
>           [-46.6505241394043, -23.55198885260508],
>           [-46.6528844833374, -23.552893678808967],
>           [-46.65314197540283, -23.554900010346444],
>         ],
>       ],
>       [
>         [
>           [-46.647348403930664, -23.55537208390426],
>           [-46.649322509765625, -23.556355565036785],
>           [-46.64962291717529, -23.558322505221753],
>           [-46.64794921875, -23.559974712224648],
>           [-46.645545959472656, -23.55993537420411],
>           [-46.644859313964844, -23.558047135368195],
>           [-46.64528846740722, -23.556237547689484],
>           [-46.647348403930664, -23.55537208390426],
>         ],
>       ],
>     ]
>  },
>  "address": {
>     "type": "Point",
>     "coordinates": [
>        -23.5547,
>        -46.6512
>    ]
>  }
> }
> ```

#### Requirements

    * Node v14.17.6
    * Yarn
    * MongoDB

[Install MongoDB](https://docs.mongodb.com/manual/installation/)

#### Run application locally

After having cloned the repository and having all the requirements installed, execute the following commands to run the application.

    - yarn
    - yarn dev

If you want to manage database with a graphic interface, you can open the MongoDB Compass Community to handle the MongoDB click on connect > connect to. It is already been installed when MongoDB was installed.

#### Running the tests

    - yarn test
    - yarn test:coverage

#### Generate build

    - yarn build

After that, the dist folder is available in the project root.
