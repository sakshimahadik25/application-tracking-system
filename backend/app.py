# importing required python libraries
from flask import Flask, jsonify, request
from flask_mongoengine import MongoEngine
from flask_cors import CORS, cross_origin
from selenium import webdriver
from bs4 import BeautifulSoup
from itertools import islice
from webdriver_manager.chrome import ChromeDriverManager
from bson.json_util import dumps
import pandas as pd
import json
import datetime
import yaml
import git

def create_app():
    app = Flask(__name__)
    # make flask support CORS
    CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'

    # testing API, you can try to access http://localhost:5000/ on your browser after starting the server
    # params:
    #   -name: string
    @app.route("/")
    @cross_origin()
    def hello():
        name = request.args.get('name') if request.args.get('name') else ''
        obj = {
            "str": "Hello World!"+name
        }
        return jsonify(obj), 300

    # search function
    # params:
    #   -keywords: string
    @app.route("/search")
    def search():
        keywords = request.args.get('keywords') if request.args.get('keywords') else 'random_test_keyword'
        keywords = keywords.replace(' ', '+')
        if keywords=='random_test_keyword':
            return json.dumps({'label': str("successful test search")})
        # create a url for a crawler to fetch job information
        url = "https://www.google.com/search?q=" + keywords + "&ibp=htl;jobs"

        # webdriver can run the javascript and then render the page first.
        # This prevent websites don't provide Server-side rendering 
        # leading to crawlers cannot fetch the page
        driver = webdriver.Chrome(ChromeDriverManager().install())
        driver.get(url)
        content = driver.page_source
        driver.close()
        soup = BeautifulSoup(content)

        # parsing searching results to DataFrame and return
        df = pd.DataFrame(columns=["jobTitle", "companyName", "location"])
        mydivs = soup.find_all("div", {"class": "PwjeAc"})
        for i, div in enumerate(mydivs):
            df.at[i, "jobTitle"] = div.find("div", {"class": "BjJfJf PUpOsf"}).text
            df.at[i, "companyName"] = div.find("div", {"class": "vNEEBe"}).text
            df.at[i, "location"] = div.find("div", {"class": "Qk80Jf"}).text
        return jsonify(df.to_dict('records'))

    # get data from the CSV file for rendering root page
    @app.route("/application", methods=['GET'])
    def get_data():

        applications = Application.objects()
        print(applications)
        if len(applications) == 0:
            # provide some initial data
            Application(id=1, jobTitle='Backend Engineer', companyName='Facebook', date=str(datetime.date(2021, 9, 22))).save()
            Application(id=2, jobTitle='Front-end Engineer', companyName='Roblox', date=str(datetime.date(2021, 9, 22))).save()
            Application(id=3, jobTitle='Software Engineer', companyName='Cisco', date=str(datetime.date(2021, 10, 12))).save()
            Application(id=4, jobTitle='Software Engineer', companyName='Amazon', date=str(datetime.date(2021, 9, 24))).save()
            Application(id=5, jobTitle='Software Engineer', companyName='Google', date=str(datetime.date(2021, 9, 23))).save()

        apps_list = []
        for a in applications:
            app_dict = a.to_mongo().to_dict()
            app_dict['id'] = app_dict['_id']
            del app_dict['_id']
            apps_list.append(app_dict)
        apps_json = dumps(apps_list)
        return jsonify(apps_json), 200

    # write a new record to the CSV file 
    @app.route("/application", methods=['POST'])
    def add_application():
        a = json.loads(request.data)['application']
        application = Application(id=get_new_id(),
                                    jobTitle=a['jobTitle'],
                                    companyName=a['companyName'],
                                    date=a['date'],
                                    status=a['status'])
        application.save()
        return jsonify(application.to_json())

    @app.route('/application', methods=['PUT'])
    def update_application():
        a = json.loads(request.data)['application']
        application = Application.objects(id=a['id']).first()
        print(application)
        if not application:
            return jsonify({'error': 'data not found'})
        else:
            application.update(jobTitle=a['jobTitle'],
                                companyName=a['companyName'],
                                date=a['date'],
                                status=a['status'])
        return jsonify(a)

    @app.route("/application", methods=['DELETE'])
    def delete_application():
        a = json.loads(request.data)['application']
        application = Application.objects(id=a['id']).first()
        if not application:
            return jsonify({'error': 'data not found'})
        else:
            application.delete()
        return jsonify(application.to_json())
    return app

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

class Application(db.Document):
        id = db.IntField(primary_key=True)
        jobTitle = db.StringField()
        companyName = db.StringField()
        date = db.StringField()
        status = db.StringField(default="1")

        def to_json(self):
            return {"id": self.id,
                    "jobTitle": self.jobTitle,
                    "companyName": self.companyName,
                    "date": self.date,
                    "status": self.status}

def get_new_id():
    id_list = []
    for a in Application.objects():
        id_list.append(a['id'])
    nums = list(range(1, max(id_list) + 1))
    if set(nums) == set(id_list):
        return max(id_list) + 1
    return min(set(nums) - set(id_list))

if __name__ == "__main__":
    app.run(debug=True)
