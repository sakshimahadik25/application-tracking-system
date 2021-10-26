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
import csv
import datetime
import yaml

def create_app():
    app = Flask(__name__)
    # make flask support CORS
    CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'

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
        jobTitle = db.StringField()
        companyName = db.StringField()
        date = db.StringField()
        status = db.StringField(default="1")

        def to_json(self):
            return {"jobTitle": self.jobTitle,
                    "companyName": self.companyName,
                    "date": self.date,
                    "status": self.status}

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
        return jsonify(obj)

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
        if len(applications) == 0:
            # provide some initial data
            Application(jobTitle='Backend Engineer', companyName='Facebook', date=str(datetime.date(2021, 9, 22))).save()
            Application(jobTitle='Front-end Engineer', companyName='Roblox', date=str(datetime.date(2021, 9, 22))).save()
            Application(jobTitle='Software Engineer', companyName='Cisco', date=str(datetime.date(2021, 10, 12))).save()
            Application(jobTitle='Software Engineer', companyName='Amazon', date=str(datetime.date(2021, 9, 24))).save()
            Application(jobTitle='Software Engineer', companyName='Google', date=str(datetime.date(2021, 9, 23))).save()

        applications = Application.objects()
        apps_list = []
        for a in applications:
            app_dict = a.to_mongo().to_dict()
            del app_dict['_id']
            apps_list.append(app_dict)
        apps_json = dumps(apps_list)
        return apps_json

    # write a new record to the CSV file 
    @app.route("/application", methods=['POST'])
    def add_application():
        # path = "./data/applications.csv"
        # csvTitle = ['jobTitle', 'companyName', 'date', 'class', 'id']
        # application = request.get_json()['application']
        # newLine = []
        # for t in csvTitle:
        #     newLine.append(application[t] if t in application else None)
        #
        # try:
        #     with open(path, 'a+', encoding='utf-8') as f:
        #         writer = csv.writer(f, delimiter=',')
        #         writer.writerow(newLine)
        # except Exception as e:
        #     print(e)
        #     exit(1)
        # return jsonify('Create an application succeddfully!')
        record = json.loads(request.data)
        application = Application(jobTitle=record['jobTitle'],
                                  companyName=record['companyName'],
                                  date=record['date'],
                                  status=record['status'])
        application.save()
        return jsonify(application)


    # get the biggest id in the CSV for creating a new application
    @app.route("/getNewId", methods=['GET'])
    def getNewId():
        path = "./data/applications.csv"
        try:
            f = open(path, 'r',  encoding='utf-8')
            rows = csv.reader(f)
            i = 0
            for row in islice(rows, 1, None):
                i += 1
            return jsonify(i)
        except Exception as e: 
            print(e)
            exit(1)
    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
