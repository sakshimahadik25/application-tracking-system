import pytest
import json
import datetime
from app import create_app

# Pytest fixtures are useful tools for calling resources
# over and over, without having to manually recreate them,
# eliminating the possibility of carry-over from previous tests,
# unless defined as such.
# This fixture receives the client returned from create_app
# in app.py
@pytest.fixture
def client():
    app = create_app()
    yield app.test_client()

def test_alive(client):
    rv = client.get('/')
    assert rv.data.decode("utf-8") == '{"str":"Hello World!"}\n'

def test_fake_search(client):
    rv = client.get('/search')
    jdata = json.loads(rv.data.decode("utf-8"))["label"]
    assert jdata == 'successful test search'

def test_db_get_data(client):
    rv = client.get('/')
    assert rv.status_code == 200

def test_db_add_application(client):
    rv = client.post('/application', json={'application':{
        'jobTitle':'fakeJob12345', 'companyName':'fakeCompany', 'date':str(datetime.date(2021, 9, 23)), 'status':'1'
        }})
    jdata = json.loads(rv.data.decode("utf-8"))["label"]
    assert jdata == 'successful add application'