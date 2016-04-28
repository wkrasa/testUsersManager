+ login mechanism
+- cookie login
+ config file
+ db connection menagement (mongoose)
+ less
+ jade
- bundles
+ angular
- mvc mechanism (controllers)
-- request addres parsing + mapping to controllers
- REST service
+ client side validation
- server validation mechanism - validate domain models- return dictionary with errors !!!
- translations !!! 
-- also for angular
+ add loggers for action, security, errors
+- update server with loggers
+ check promisses tutorial
- angular animate!

- users managment app
-- crud for users
-- crud for groups

-tests: see http://code.tutsplus.com/tutorials/build-a-complete-mvc-website-with-expressjs--net-34168
-- jasmine !	

------VIEWS----- 
- create views
-- create footer
-- create header
-- create menu
-- create main view
-- create partial view for index/home page
+- create special route for partial views for angular
- use bootstrap 
-- check bootstrap javascript for angular (modal, etc) (http://getbootstrap.com/javascript/)
+-- add directives for modal, so it can be used from angular
+- check bootstrap tutorial
- create layout for mobile devices !
+ create login view with bootstrap form styles
+ create registration view
+ add proper validation for views in angular
+- login view
+- registration view

- switch to rest api for login/logout/register !!!

+ create registration mechanism on server
+- save users to DB
+ create registration mechanism on client side 
- create server mechanism for returning validation errors

+ add custom login cookie management: add custom 'use' module  for express (replace passport - store user in session)

+ jade tutorial
+ add angular
+- ng-view
+- ng-route
-- services for users and categories (resources)
-- think over few directives, f.e. 3 state button, color selection !!!
+- add interceptor for 401 status
+ create domain model for user (mongoose)
- request forgery token

- use batarang for angular
+ add extra request for angular, in order to perform check, if user was not logged in form cookie

- hash user password, when user is created and logged in
- change routes/controllers to use DI insted of require
- add some funtions to request prototype, f.e. functions from authModule	
- worm more on translations mechanism:
-- add ingore routes for css, publec, etc
-- add files as link to angular app
-- for angulars mechanism, allow nested namespaces in translation files
-- add mechanism to separate file, so it is removed from app
-- check ng-view views refreshing, after user logs in
--- or add all translations from angular level
--- in this case add drective ng-translate, which will translate content and react on change-lang event !!!!!


