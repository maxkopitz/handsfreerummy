# Backend Setup
1. Create Python3 virtual [venv](https://docs.python.org/3.10/library/venv.html)
```sh
python3 -m venv backend/env
```
2. Source the virtual environment
```sh
source backend/env/bin/activate
```

3. Install the requirements
```sh
pip install -r backend/requirements.txt
```
4. Install the requirements
```sh
pip install -e backend/
```
5. In a seperate terminal, run redis stack using Docker Compose
```sh
docker compose up
```
6. Run the backed on port 4000
```sh
flask --app handsfree --debug run --host 0.0.0.0 --port 4000
```
