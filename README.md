# Tasks List Application

Tasks list application where you can create, update or delete your tasks to keep track of them.

Application developed with Python, Flask and ReactJS. Data is stored in a SQLite database.

## Running the app

This application is separated into two folders: `backend` and `frontend`, so you need to run both backend and frontend separately.

### Backend

1. Move into the folder `backend`
2. Create a [Python virtual environment](https://docs.python.org/3/tutorial/venv.html#creating-virtual-environments) and activate it.
3. Install the requirements:
    ```shell
    python3 -m pip install -r requirements.txt
    ```
4. Run the local server at port 5000:
    ```shell
    python3 -m flask run --port=5000
    ```
5. The server should now be running at `http://127.0.0.1:5000/`. 

### Frontend

1. Move into the folder `frontend`
2. Install the packages with npm:
    ```shell
    npm install
    ```
3. Run the local server (by default it will point to port 3000):
    ```
    npm start
    ```
4. The server should now be running at `http://127.0.0.1:3000/`
5. Navigate to the address above and enjoy the _Tasks List Application_