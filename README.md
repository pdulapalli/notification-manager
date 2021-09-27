# notification-manager

## Design

Please refer to [design approach here](doc/design.md).

## Prerequisites

* [Docker](https://docs.docker.com/get-docker/)
* (for development) [Node.js](https://nodejs.org/en/download/)
* (optional) An HTTP Request client like [cURL](https://github.com/curl/curl)

## Setup

### Environment

Create a file in the root of this project directory and name it `.env`

Please be sure to populate this file with all the necessary environment variable values as
shown in [the sample file](.env.sample).

## Developing

There are some NPM scripts to ease development.

### Linter

Use [ESLint](https://eslint.org/) to help with static analysis.

Please run the following in the terminal:

```
npm run lint
```

### Dev Server

Will run the Node.js server and reload on source file changes.

Please run the following in the terminal:

```
npm run watch
```

### Test

Use [Jest](https://jestjs.io/) to run the test cases.

Please run the following in the terminal:

```
npm run test
```

## Usage

### Running

To launch, please run the following in the terminal:

```
docker-compose up --build
```

Once ready, there should be a message like:

```
Service started...
```

### Interaction

Please use the HTTP Request client of choice to issue requests. The endpoints
are outlined in [the docs here](doc/api/api.md).