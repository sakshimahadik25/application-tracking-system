import pytest
import json
import datetime
from flask_mongoengine import MongoEngine
import yaml
from app import create_app, Application

# Pytest fixtures are useful tools for calling resources
# over and over, without having to manually recreate them,
# eliminating the possibility of carry-over from previous tests,
# unless defined as such.
# This fixture receives the client returned from create_app
# in app.py
@pytest.fixture
def client():
    app = create_app()
    with open('application.yml') as f:
        info = yaml.load(f, Loader=yaml.FullLoader)
        username = info['username']
        password = info['password']
        app.config['MONGODB_SETTINGS'] = {
            'db': 'appTracker',
            'host': f'mongodb+srv://{username}:{password}@apptracker.goffn.mongodb.net/appTracker?retryWrites=true&w=majority'
        }
    db = MongoEngine()
    db.init_app(app)
    yield app.test_client()

#testing if the flask app is running properly
def test_alive(client):
    rv = client.get('/')
    assert rv.data.decode("utf-8") == '{"str":"Hello World!"}\n'

#testing if the search function running properly
def test_fake_search(client):
    rv = client.get('/search')
    jdata = json.loads(rv.data.decode("utf-8"))["label"]
    assert jdata == 'successful test search'

#testing if the application is getting data from database properly
def test_get_data(client, mocker):
    application = Application(id=1, jobTitle='Backend Engineer', companyName='Facebook', date=str(datetime.date(2021, 9, 22)))
    list_application = []
    list_application.append(application)
    mocker.patch(
        # Dataset is in slow.py, but imported to main.py
        'app.Application.objects',
        return_value = list_application
    )
    rv = client.get('/application')
    print(rv.data)
    assert rv.status_code == 200

#testing if the application is saving data in database properly
def test_add_application(client, mocker):
    mocker.patch(
        # Dataset is in slow.py, but imported to main.py
        'app.get_new_id',
        return_value = -1
    )
    mocker.patch(
        # Dataset is in slow.py, but imported to main.py
        'app.Application.save'
    )
    rv = client.post('/application', json={'application':{
        'jobTitle':'fakeJob12345', 'companyName':'fakeCompany', 'date':str(datetime.date(2021, 9, 23)), 'status':'1'
        }})
    jdata = json.loads(rv.data.decode("utf-8"))["jobTitle"]
    assert jdata == 'fakeJob12345'