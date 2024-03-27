<div align="center">
  <h1>Handsfree Rummy</h1>
  <a>
    <img
      src="https://img.shields.io/github/languages/code-size/maxkopitz/handsfreerummy"
      alt="Repository code size" />
  </a>
  <a href="https://github.com/maxkopitz/handsfree/">
    <img
      src="https://img.shields.io/github/issues/maxkopitz/handsfreerummy"
      alt="Respository count of issues open" />
  </a>
  <a>
    <img
      src="https://img.shields.io/github/stars/maxkopitz/handsfreerummy"
      alt="Repository count of stars" />
  </a>
</div>

# Installation
## External Requirements
- [Docker](https://docs.docker.com/desktop/)
- Node v21.6.1, we use [nvm](https://github.com/nvm-sh/nvm) to get correct verison

## Setup
Clone the repository
```sh
git clone https://github.com/maxkopitz/handsfreerummy
```
## Start the flask API via ``Docker``
1. Build the backend container, this step is only needed once
```sh
docker compose build .
```
2. Run docker compose
```sh
docker compose up
```
The API should be running at ``http://localhost:4000/``

> Use ``CTRL-C`` to stop docker compose or docker compose down
<br />

## Running React UI

1. Install [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) (for Node.JS)

2. In a new terminal navigate to the UI
```sh
cd ./frontend
```

3. Install correct node version (see `.nvmrc`)
```sh
nvm use
```

4. Install packages
```sh
npm install
```

5. Create copy of env example
```
cp ~/.env.example ~/.env
```

6. Start the development server
```sh
npm start
```
The UI should be running at ``http://localhost:3000/``
