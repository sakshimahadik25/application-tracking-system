[![GitHub license](https://img.shields.io/github/license/Team-Glare/application-tracking-system)](https://github.com/Team-Glare/application-tracking-system/blob/main/LICENSE)
[![DOI](https://zenodo.org/badge/417325535.svg)](https://zenodo.org/badge/latestdoi/417325535)
[![codecov](https://codecov.io/gh/Team-Glare/application-tracking-system/branch/main/graph/badge.svg)](https://codecov.io/gh/Team-Glare/application-tracking-system)
![GitHub issues](https://img.shields.io/github/issues/Team-Glare/application-tracking-system)
![GitHub issues](https://img.shields.io/github/issues-closed/Team-Glare/application-tracking-system)
![GitHub top language](https://img.shields.io/github/languages/top/Team-Glare/application-tracking-system)

[![Build and Deploy Frontend](https://github.com/Team-Glare/application-tracking-system/actions/workflows/frontend_CI_CD.yml/badge.svg)](https://github.com/Team-Glare/application-tracking-system/actions/workflows/frontend_CI_CD.yml)
[![Super Linter](https://github.com/Team-Glare/application-tracking-system/actions/workflows/super-linter.yml/badge.svg)](https://github.com/Team-Glare/application-tracking-system/actions/workflows/super-linter.yml)

#      J-Tracker - Your Job Tracking Assistant

https://user-images.githubusercontent.com/43064854/135554150-c06afd4e-d223-47e3-b123-b45f9cd1b87a.mp4

The process of applying for jobs and internships is not a cakewalk. Managing job applications is a time-consuming process. Due to the referrals and deadlines, the entire procedure can be stressful. Our application allows you to track and manage your job application process, as well as regulate it, without the use of cumbersome Excel spreadsheets.


Our application keeps track of the jobs you've added to your wish list. It also keeps track of the companies you've already applied to and keeps a list of any rejections. Rather than having the user browse each company's website for potential prospects, our application allows the applicant to search for them directly using basic keywords. Any prospective work offers can then be added to the applicant's wishlist.




This application is created as a part of our SE project for Fall 2021

## Basic Design:
![Basic Design](https://github.com/prithvish-doshi-17/application-tracking-system/blob/main/resources/Overall%20Design.PNG)

### Here's how the application looks like:
https://user-images.githubusercontent.com/43064854/135554649-9f5e8f21-ff12-45c9-82b4-37078e88709d.mp4

## Roadmap:
![Roadmap](https://github.com/prithvish-doshi-17/application-tracking-system/blob/main/resources/Roadmap%20-%202.PNG)


* Include deadline reminders for the application and interview.
* Add a feature that allows users to attach these reminders to their Google calendar.
* Incorporate notifications for upcoming deadlines. 
* Add a storage option for resumes and cover letters so they can be saved for future use.
* Include a direct link to the company's application website when the wishlist item is clicked.
* Include a link to the university’s career fair page. 
* Direct connection to Linkedin, allowing for the addition of job opportunities to the wishlist.
* Improve keyword search to improve specifications such as pay range, employment location, and so on.
* An option to maintain separate profiles for job tracking.


## Explanation:
Each section illustrates one of the application's numerous stages. Currently, we have four fundamental steps: job applied, job you want to apply for without a referral, job that has rejected you, and job you're waiting for a referral. During the entire process, any details in any table can be edited at any time. 


## Technologies Used:

** Python
** Node.Js
** Flask 

## Installation:
* Clone our project
* Before installation, we recommand you to open two consoles, one for frontend and the other for backend.
* First of all, you need to install [Node.js](https://nodejs.org/en/). After that, run the following command in the frontend directory to open the website. 
* After installing Node.js, try to run command `npm` on your console, and you will see the result as below. If you can't, trying to reopen your console and try the command again.
```
$ npm
npm <command>

Usage:

npm install        install all the dependencies in your project
npm install <foo>  add the <foo> dependency to your project
npm test           run this project's tests
npm run <foo>      run the script named <foo>
npm <command> -h   quick help on <command>
npm -l             display usage info for all commands
npm help <term>    search for help on <term>
npm help npm       more involved overview
```
* Third, run the following command. <br/> `npm start` is the command to run frontend server.
```
cd [location of the git repository]/frontend
npm install
npm start
```
* Install [python3](https://www.python.org/downloads/) and [pip](https://pip.pypa.io/en/stable/installation/). Run the following command on `the other console`. If you can see the pip version in your console, you install pip successfully!
```
pip -V
```

* Then, start to install python dependencies:
```
cd [location of the git repository]/backend
pip install flask
pip install -U flask-cors
pip install selenium
pip install bs4
pip install webdriver-manager
```

* Now, you can start the backend by running `flask run` on your console
* Conclusion:<br/>After installing all ncessary dependencies, you can run the following command to start the frontend and backend server in separate console:
```
cd [location of the git repository]/frontend
npm start

cd [location of the git repository]/backend
flask run
```


## License
The project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license. 


## How to Contribute?
Please see our CONTRIBUTING.md for instructions on how to contribute to the repo and assist us in improving the project.


## Team Members
* [Setu Kumar Basak](https://github.com/setu1421)  
* [Conor Thomason](https://github.com/ConorThomason)  
* [Keertana Vellanki](https://github.com/KeertanaVellanki)  
* [Muntasir Hoq](https://github.com/muntasirhoq)  
* [Matthew Sohacki](https://github.com/msohacki)  
