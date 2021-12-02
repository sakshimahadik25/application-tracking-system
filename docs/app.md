# app module

The flask application for our program


### class app.Users
Bases: `flask_mongoengine.Document`

Users class. Holds full name, username, password, as well as applications and resumes


#### applications()
+  A list field that wraps a standard field, allowing multiple instances of the field to be used as a list in the database.


#### authTokens()
+ A list field that wraps a standard field, allowing multiple instances of the field to be used as a list in the database.


#### fullName()
+ A unicode string field.


#### id()
+ 32-bit integer field.


#### password()
+ A unicode string field.


#### resume()
+ A GridFS storage field.


#### to_json()
Returns the user details in JSON object


* **Returns**

    JSON object



#### username()
A unicode string field.


### app.create_app()
Creates a server hosted on localhost


* **Returns**

    Flask object



### app.get_new_application_id(user_id)
Returns the next value to be used for new application


* **Param**

    user_id: User id of the active user



* **Returns**

    key with new application_id



### app.get_new_user_id()
Returns the next value to be used for new user


* **Returns**

    key with new user_id
