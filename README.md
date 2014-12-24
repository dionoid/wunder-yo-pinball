wunder-yo-pinball
=================

These are the scripts that I used in my WunderYoPinball project for The Great Wunderbar Holiday Challenge 2014.  
Read all about the project on https://www.hackster.io/dionoid/wunder-yo-pinball

##Azure Mobile Service

The WunderYoPinball project uses an Azure Mobile Service to enqueue en dequeue users from the waiting list.

* First create a Mobile Service in Azure, and add a new table named "WaitingList" and add a column named "username" (string).

* Now add two new api's: enqueue and dequeue (type JavaScript). Sources of these scripts can be found in the folder "Azure Mobile Service/api"

* Test the enqueue api by calling https://[your-service-name].azure-mobile.net/api/enqueue?username=johndoe

* Test the dequeue api by calling https://[your-service-name].azure-mobile.net/api/dequeue

##Yo API account + callback

If you don't have a Yo account, first create one.

Then create a Yo API account for your pinball machine. Yo can do this in the Yo Dashboard (http://dev.justyo.co/).

Finally edit the API account and fill out the enqueue-api url as Callback.
This url should look like: https://[your-service-name].azure-mobile.net/api/enqueue  

Now everytime someone sends a Yo to your pinball machine's API username, the Yo services are going to trigger a GET request to this URL with the query parameter 'username', which is the user who sent the Yo.

##Raspberry Pi init.js script

I used a Raspberry Pi running RaspbianOS and a node.js script to:
* Read and analyse relayr's sensor-stream
* Detect if the pinball machine is available
* Get a username from the waiting list (using the "dequeue" api of the Azure Mobile Service) and send a "Yo" to this user

This init.js script and it's package.json can be found in the folder "Raspberry Pi". Please run "npm install" to install the node modules that the script needs.

###Have a great hacking time!
