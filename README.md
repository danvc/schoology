# schoology

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

echo Building React App && sleep 2 && cd app/ && yarn install && yarn build && cd .. && echo Building the Server environment && yarn install && docker-compose build && docker-compose up -d && echo Populating FAKE data && sleep 2 && docker exec -it NODE_WEBSERVER node ./config/generateFakeData.js &&  echo Fake data populated && sleep 1  && echo You are OK to go. Please, access http://localhost:3000"


Adding a new course:
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
