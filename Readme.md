# nodelander
### Fast Deploying NodeJS Landing Page And Lead Capture
* Uses Express vHost To Manage Multiple Domains
* Serves Multiple Landing Pages and Marketing Sites
* Uses Shared Private Assets (npm) and Public Assets (bower / images)
* Preconfigured Routes for A/B Testing
* Collects Emails And Other Validated Form Info
* Email Autoresponse Using Nodemailer
* Slack Notifications Integration
* Login And View DB with Admin Panel

### Built With
* NodeJS
* MongoDB
* Bootstrap
* Jade
* Express
* Passport
* Mongoose
* Bower

### Install
    git clone git@github.com:altninja/nodelander.git
    cd nodelander
    cp config/sample-secrets.js config/secrets.js // Update Your Config Info
    npm install && bower install
    npm run seed
    sudo npm run local

### Setup
You need to add the following to your directory ```private/etc/hosts``` 
	```127.0.0.1 *.nodelander.dev```

### Development

* Go to http://nodelander.dev in your browser to view the default corporate landing page
* The Admin Panel is located at http://admin.nodelander.dev
* A/B Lead Capture pages with dedicated views and styles are available at http://leads.nodelander.dev/a and http://leads.nodelander.dev/b
* Confirmatiom Page is served after lead capture http://leads.nodelander.dev/leads

### Deployment
	npm run prod

## TODO:
	Domain Management
	List Export
	Notification Settings
	Deployment Scripts
	Cluster Support
	eBook Offer Site
	Product Lander
	Google Analytics
	Facebook Conversion Tracking

	Live Reload
	Independent Crashing
	Clean Updates
	Improved Relative Paths
