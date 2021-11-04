## IMPROVEMENTS

When our team took over the project from the previous group, we thoroughly reviewed the project in order to establish an effective takeover strategy. We attempted to improve the project in as many ways as possible. We've detailed the enhancements we've made in this document.

* Easier setup instructions and Installation process:
//TODO

* Restructuring the Flask application:
The previous structure of the Flask application from phase 1 was not compatible for the testing. In this Phase 2, we have restructured the Flask application file app.py and have written tests on the API endpoints.

* Writing unit tests:
In Phase 1, there were no unit tests written for the application. In Phase 2, we have written unit tests using pytest and pytest-mock. More information on the test cases can be found in the Software documentation file. 

* Introducing Database:
Previously, the company data was stored in a CSV file. We have constructed a database to store all the information of the companies. We have used MongoDB to create the database.

* Removing unused codes and updating Gitignore:
We have removed some of the project's local environment related files which should not be present in the repository. For example: pycache folder. Previously, the gitignore files were not capable of ignoring e.g. the pycache folder. So, we have also updated the gitignore file so that no unnecessary files get pushed in future commits.

* CI/CD Pipeline for Frontend app:
We have created a CI/CD pipeline for the react(frontend) application using Github Actions. The React application has been deployed to Github pages. The application can be accessed using the following link https://team-glare.github.io/application-tracking-system/ 
Since the flask(backend) application has not been deployed, the react application is not fully functional.  

* Adding Linters, Code formatters:
We have added super-linter to our CI pipeline using Github Actions.

* Adding Software documentation:
We have added elaborate software documentation mentioning all the endpoint details.
