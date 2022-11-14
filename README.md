### Task 1: Add a REST endpoint to retrieve a list of beers.
- This endpoint should accept one parameter in the query string of the request.
- The purpose of this parameter is to denote the name of the beer to search for.
- The endpoint will use the publicly available Punk API to find all beers matching the search parameter described above.
- The response should be a JSON object containing the following properties from the Punk API response: id, name, description, first_brewed, food_pairings
### Task 2: Add a REST endpoint to allow a user to add a rating to a beer.
- The endpoint should accept an id parameter and JSON request body which includes the following properties: rating, comments
- Add validation to ensure the id parameter is a valid beer id and the rating is a valid value in the range of 1 to 5.
- Used JSON file to store datas (Didn't use embedded database 'nosql' node module to persist this beer rating to the database.)
### Task 3: Create an express middleware module.
- This module should intercept all requests made to your rest API and perform the following:
- Validate that the request has an 'x-user' header parameter containing a valid formatted email address (minimum validation: contains an @ symbol and a period to denote the presence of a domain).
- If the header is not present or the value is not considered to be a valid email address an error response should be returned by the API.
- Add request logging by persisting the x-user header and request details to the embedded 'NoSQL' database.
### Task 4: Unit tests Add applicable unit tests to the express middleware module in Task 3.
- The preferred testing frameworks to use are mocha, chai and sinon, but you are free to use other testing frameworks if you prefer.
- Put the tests in that you think cover the important parts, or what you feel would add to the overall "product quality" of this app.
### Task 5: Add caching support.
- Enhance the first REST endpoint for retrieving beers to support result caching.
- The memory-cache module provided in the resources section can be used but you are also free to use any caching module of your choice.
- Cache the results of queries made to the Punk API so when a user searches for a beer you can interrogate the cache first before deciding to request the results from Punk.
### Task 6: Add a Vue.js front end to view/use your API.
- Show us your style, creativity, and prove your understanding of user experience and user interface design.
- Create a UI that will utilize all the endpoints implemented in the API you built.
- Bonus: Add anything you would like to! Things like login pages/forms/data display, whatever you think will highlight your skills with UI/UX (these do not have to be connected to any backend functionality).
