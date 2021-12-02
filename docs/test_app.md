# test_app module

Test module for the backend


### test_app.client()
Creates a client fixture for tests to use


* **Returns**

    client fixture



### test_app.test_add_application(client, mocker, user)
Tests that using the application POST endpoint saves data


* **Parameters**

    
    * **client** – mongodb client


    * **user** – the test user object



### test_app.test_alive(client)
Tests that the application is running properly


* **Parameters**

    **client** – mongodb client



### test_app.test_alive_status_code(client)
Tests that / returns 200


* **Parameters**

    **client** – mongodb client



### test_app.test_delete_application(client, user)
Tests that using the application DELETE endpoint deletes data


* **Parameters**

    
    * **client** – mongodb client


    * **user** – the test user object



### test_app.test_get_data(client, user)
Tests that using the application GET endpoint returns data


* **Parameters**

    
    * **client** – mongodb client


    * **user** – the test user object



### test_app.test_logout(client, user)
Tests that using the logout function does not return an error


* **Parameters**

    
    * **client** – mongodb client


    * **user** – the test user object



### test_app.test_resume(client, mocker, user)
Tests that using the resume endpoint returns data


* **Parameters**

    
    * **client** – mongodb client


    * **mocker** – pytest mocker


    * **user** – the test user object



### test_app.test_search(client)
Tests that the search is running properly


* **Parameters**

    **client** – mongodb client



### test_app.test_update_application(client, user)
Tests that using the application PUT endpoint functions


* **Parameters**

    
    * **client** – mongodb client


    * **user** – the test user object



### test_app.user(client)
Creates a user with test data


* **Parameters**

    **client** – the mongodb client



* **Returns**

    the user object and auth token
