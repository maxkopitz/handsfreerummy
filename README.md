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
<br />

Installation
-------
Before installng make sure you have the following
- [Docker](https://docs.docker.com/desktop/)
- Node v21.6.1, we use [nvm](https://github.com/nvm-sh/nvm) to get correct verison

<br />

Setup
--------
Clone the repository
```sh
git clone https://github.com/maxkopitz/handsfreerummy
```
## Start the flask API via ``Docker``
1. Build the backend & frontend containers, this step is only needed the first time installing and when package.json or requirements.txt changes.
```sh
docker compose build
```
2. Run docker compose
```sh
docker compose up
```
- The UI should be running at ``http://localhost:3000/``
- The API should be running at ``http://localhost:4000/api/v1/``
- Redis Insight should be running at ``http://localhost:8001/``

> Use ``CTRL-C`` to stop docker compose or docker compose down
<br />

Project layout
-----

    ├── backend/               Python Flask Backend
    │   ├── bin/               Scripts
    │   ├── handsfree/         Flask API
    │   │   ├── api/           Flask Routes & Sockets
    │   │   ├── cli/           Flask CLI
    │   │   └── game/          Logic for managing games
    │   └── tests/
    ├── frontend               React UI
    │   ├── src
    │   │   ├── api            API Services
    │   │   ├── components     Components
    │   │   │   ├── game       Game Components
    │   │   │   ├── joingame   Displaying lobby game Components
    │   │   │   ├── settings   Settings Components
    │   │   │   ├── tutorial   Tutorial Compoents
    │   │   │   └── ui         Reusable UI Components
    │   │   ├── hooks          Hook/Reducers
    │   │   └── lib            Utility
    └─────────────────────────
<br />

Notes
--------
1. If you get stuck on a page, go to Redis Insight ``http://localhost:8001``.
2. Open the [CLI](https://redis.io/docs/connect/insight/#cli)
3. Flush the DB by entering ``FLUSHDB`` in the CLI
## Trouble Shooting
### Installing a package via ``npm``
Issue: Installed package is not installed after running ``docker compose build`` and ``docker compose up``
Solution:
1. Make sure compose stack is not running
```sh
docker compose down
```
2. Remove the UI container and its volumes
```sh
docker container rm handsfreerummy-client-1 --volumes
```
3. Start containers
```sh
docker compose up --build
```
