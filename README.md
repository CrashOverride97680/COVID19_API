# :clipboard: COVID19_API

![Github Licenze](https://img.shields.io/github/license/CrashOverride97680/COVID19_API) ![npm](https://img.shields.io/npm/v/npm) ![express](https://img.shields.io/badge/express-%20v4.17-red) ![nodemon](https://img.shields.io/badge/nodemon-v2.0.2-lightgrey) <br/> ![lowdb](https://img.shields.io/badge/lowdb-v1.0.0-green) [![Build Status](https://travis-ci.org/CrashOverride97680/COVID19_API.svg?branch=master)](https://travis-ci.org/CrashOverride97680/COVID19_API) ![API Version 1.0.0](https://img.shields.io/badge/v.API-1.0.0-red) ![Stars](https://img.shields.io/github/stars/CrashOverride97680/COVID19_API) ![fork](https://img.shields.io/github/forks/CrashOverride97680/COVID19_API) ![issue](https://img.shields.io/github/issues/CrashOverride97680/COVID19_API)

## :page_with_curl: INFORMATION

**API created with self-updating civil protection JSON**, every day a cron is set by default at one in the morning that updates the JSON with the data.
All this can be installed in two ways or via **docker / docker-compose or through manual installation.**

## :whale2: AUTOINSTALL
Installation via docker-compose for development or dockerfile for automatic installation.

```script
docker-compose up -d --build
```

```script
docker image build -t ./app/Dockerfile .
```
```script
docker run name image docker -d
```

## :wrench: MANUAL INSTALLATION
```script
cd app
```
```script
npm i
```
## :traffic_light: ENTRYPOINT

### REQUEST GET

 - Return all province JSON:  **/api/v1/province/all**
 - Return all region JSON: **/api/v1/region/all**
 - Return all national JSON: **/api/v1/national/all**
 - Return all province with name JSON: **/api/v1/province/name/:name**
 - Return all data with region name JSON: **/api/v1/province/regionName/:name**
 - Return all data with region name JSON: **/api/v1/region/denRegion/:name**

## :hammer: DEFAULT VALUE

 - Port **9000**
 - Language **ENG**

## :gear: SETTINGS
Use file **.env** for setting some values ​​in the file itself.
## :crossed_flags: MULTI LANGUAGES
Create a file ex: ita.js or eng.js, insert into folder **lang** and modify setting lang in file .env with the name file lang.
