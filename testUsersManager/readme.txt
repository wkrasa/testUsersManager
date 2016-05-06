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
+ REST service
+ client side validation
- server validation mechanism 
-- validate domain models- return dictionary with errors !!!
-- add new directive: error, that will require ng-model and will add proper errors basing on errors returned from server
--- replace 'p(class="error" ng-show=...' with this directive
--- another approach: maybe add error directive on the form level, and review all ng-models and add errors
+ translations 
+- also for angular
+ add loggers for action, security, errors
+- update server with loggers
+ check promisses tutorial
- angular animate!

- users managment app
-- crud for users
+-- ctrl + servicef
+-- list
+-- create
+-- update
--- details
--- delete
---- groups selection
-- crud for groups
+-- ctrl + service !!!
+-- list
--- create
--- update
--- details
--- delete

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
- create server mechanism for returning validation errors !!!
-- create custom valiadtion srv and use fluent syntaxt in order to create validator objects!!!

+ add custom login cookie management: add custom 'use' module  for express (replace passport - store user in session)

+ jade tutorial
+ add angular
+- ng-view
+- ng-route
-- think over few directives, f.e. 3 state button, color selection !!!
+- add interceptor for 401 status
+ create domain model for user (mongoose)
- request forgery token

- use batarang for angular
+ add extra request for angular, in order to perform check, if user was not logged in form cookie

- hash user password, when user is created and logged in
- change routes/controllers to use DI insted of require
- add some funtions to request prototype, f.e. functions from authModule	

- rewrite example from book: d&d, angular


