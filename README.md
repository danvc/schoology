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
Please, move to the `schoology` folder by running the command `cd schoology/` and then, run the following command:
```
yarn build
```


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
