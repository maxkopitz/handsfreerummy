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
1. Build the backend & frontend containers, this step is only needed the first time installing and when package.json or requirements.txt changes.
```sh
docker compose build
```
2. Run docker compose
```sh
docker compose up
```
- The UI should be running at ``http://localhost:3000/``
- The API should be running at ``http://localhost:4000/``
- Redis Insight should be running at ``http://localhost:8001/``

> Use ``CTRL-C`` to stop docker compose or docker compose down
<br />

## Notes
1. If you get stuck on a page, go to Redis Insight ``http://localhost:8001``.
2. Open the [CLI](https://redis.io/docs/connect/insight/#cli)
3. Flush the DB by entering ``FLUSHDB`` in the CLI
## Trouble Shooting
- Installing package via ``npm``
```sh
docker container inspect --format '{{json .}}' handsfreerummy-client-1 | \
jq '.Mounts[] | select(.Destination=="/usr/src/app/node_modules") | .Name'
```
1. In Docker Desktop -> Container -> Select handsfreerummy -> Delete
![image](https://github.com/maxkopitz/handsfreerummy/assets/13725664/91c39b34-4c35-4708-87c8-932bd99e6ecf)
2. In Docker Desktop -> Volumes -> Delete the volumne containing ``node_modules``
![image](https://github.com/maxkopitz/handsfreerummy/assets/13725664/c22192e3-d8e3-4784-b136-7d7f59cebd48)
3. Run ``docker compose build``
4. Run ``docker compose up``
