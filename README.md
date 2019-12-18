![](https://images.squarespace-cdn.com/content/v1/5cb36dc993a63270cfacbc2b/1568407625291-IZ079BSO4AO5K6YIM0PD/ke17ZwdGBToddI8pDm48kC9qu2gvgDc1fHZgGjPXHQ5Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGsbjzQe8XprMihMEQ9UKdMwALN5jbWCRaeUKHWJatMjmVWdNHs25RwszbEzjDCTQI/Schoology?format=1000w)

# Welcome to my Schoology project

## Prerequisites
Dear reviewer, please, make sure to have `yarn` installed in your environment. To install it, please run:
```
npm install --global yarn
```
You'll also need the following CLI tools: `docker` and `docker-compose` to get it running properly.

## Steps to get the App running
### First step
Download the source code. You could download the source code by accessing it over this link: https://github.com/DanZeuss/schoology/archive/master.zip, or, using the `git` to clone it by running the command:
```
git clone https://github.com/DanZeuss/schoology.git
```
It will download all the source code inside a folder named `schoology`.
### Second step
Before start the building process, please, be sure that there aren't services running in the ports `3000` (Node), `6379` (Redis) and `27017` (MongoDB). Now move to the `schoology` folder by running the command `cd schoology/` and then start the building process running the following command:
```
yarn build
```
The `building` process will move according these steps:
- Installs all dependencies to build and deploy an optimized version of front-end build for production;
- Installs all dependencies to build and deploy the server package for production;
- Download and build all containers for the application. The `app` is using `MongoDB` as database and `Redis` for caching to speed up the API responses;
- Move all config files inside the containers;
- Populate the `MongoDB` with fake data.

If everything wen't well, now you could access the `app` by opening the following url in your browser: `http://localhost:3000`. You will have access to main page. The Search bar search for courses by using the `lazy search`technique. So you could be searching by characters that exists in the word, without writting it correctly. The browser will only make requests after the user stop of typing after 400ms. Another approach that was taken was by using `Redis` to cache the data that was searched before in a way to improve the `app` performance.
![](https://i.ibb.co/qswbJjh/Kapture-2019-12-18-at-3-19-48.gif)


## API methods
All methods are served in the following URL path in the application: `/api/v1/` + `controller` which changes according the business (courses, classes, teachers, etc). The `v1` means the version of the current API, which could be deprecated later. The idea is to follow the best practices for verbs/paths/HTTP codes described in https://jsonapi.org.

For this presentation, we have one controller called `courses` and few CRUD methods offered by the URL `/api/v1/courses`.

| URL                   |            Method              | Description                    |Payload                    |
| --------------------- | ------------------------------ | ------------------------------ | --------------------------|
| `/api/v1/courses`     | GET                            | Returns a list of courses      |                           |
| `/api/v1/courses`     | POST                           | Add a new course               |`{ name: String, description: String}`
| `/api/v1/courses/{id}`| DELETE                         | Remove a course by its id      |                           |
| `/api/v1/courses/{id}`| GET                            | Find a course by its id        |                           |
| `/api/v1/courses/search?q=`| GET                       | Search all courses by the name |                           |

You could perform requests using cURL (Adds a new course):
```
curl -X POST \
  http://localhost:3000/api/v1/courses \
  -H 'Accept: */*' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 389' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \
  -H 'cache-control: no-cache' \
  -d '{
	"name": "Business & Management Studies",
	"description": "A degree in a business-related subject strikes a balance between theoretical and practical work. Many business schools in the UK enjoy good relations with local and global businesses alike, meaning students benefit from cutting edge business techniques as well as high calibre work placements during their time at university."
}'
```

Search by all elements that contains the char `a`:
```
curl -X GET \
  'http://localhost:3000/api/v1/courses/search?q=a' \
  -H 'Accept: */*' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \
  -H 'cache-control: no-cache'

```

# The Architecture
SchoologyApp was implemented having in mind a way to separate and test each layer and its dependencies in a way to speed up the deployment process. So, if something need to be changed in the front-end, it could be made easily without building or deploying something related to back-end and vice-versa. The project is structured in the following way:

                
+ app (front-end layer);
    + build (generated automatically by running the build command);
    + public (static files such as `JavaScript`, `CSS`, `Images`, `Fonts`, `HTML`, etc;
    + src (main app folders and files - React/Redux/Helpers/Consts/Config/etc);
        + __tests__ (for unit tests or environment tests using Selenium, for example);
            + unit (Jest/Jasmin)
            + environment (Selenium)
        + components (which contains folders separated by its model business;
            + account (example)
            + courses (example)
            + dashboard
+ config (databases settings);
+ data (generated automatically by the container for `db`);
+ src (core files);
    * handlers (contain versioned folder/files that are most related to crud/business/logic/calc)
        + v1
            + classes (each folder is specific for its business)
            + courses	
            + students	
        + v2
        + v3
    * models (contain database schema for each model)
        + classesModel.js
        + coursesModel.js
    * routes (contain files that serves routes for the main server. It's also versioned thinking in the contract of the API)
        + v1
            + classesRoute.js
            + coursesRoute.js (contains an array of routes. Each route contains the path/verb and method defined)
            + studentsRoute.js	
        + v2
        + v3
    * tests (folder for unit, environment and integration tests);
        + integration (to call and simulate the APIs);
            + v1
                + courses.test.js
                + students.test.js
            + v2
            + v3
        + unit (to call and simulate CRUDS and business implementations);
            + v1
                + courses.test.js
                + students.test.js
            + v2
            + v3
        + lib (contains helpers for tests);
+ common files (git, docker, json, etc);

# Dev environment
To start the dev environment, we need to start the `MongoDB` and `Redis` container. For this purpose, run the command:
```
docker-compose up -d db redis
```
You also needs to start the Web application by running the command in the root:
```
yarn startreload
```
To be working in the front-end, you'll need to do something else. Please, access the `app` folder and then run `yarn start` to start the hotreload and the server for the static files.

## Running tests
There are tests specific for `API` and others tests for `React` components.
To run the `API` tests, move to the root folder and run the following command:
```
yarn test
```
To run the test for `front-end`, please, move to the `/app` folder and run the same command.


## Todos (ideas)
- [ ] Add `nginx` for loading balance with `nodejs`;
- [ ] Automate the CI/CD using the Github webhooks with a server running Jenkins;
- [ ] Choose a library to document the API (Swagger, API Blueprint, etc);

# Thank you so much
Independent the result, I really woud like to thank you by the opportunity that you gave me to implement this homework. I really would appreciate if you get a chance to see the details in the source code. I really loved ❤️ to be working on this. 
