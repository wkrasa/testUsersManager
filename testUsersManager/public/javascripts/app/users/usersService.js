angular.module('testUsersManager')
.value('usersUrl', '/users/')
.factory('usersService', function ($resource, $http, usersUrl) {
    var resource = $resource(usersUrl + ':id', { id: '@Id' }, {
        update: { method: 'PUT' }
    });
    
    resource.getUserByID = function (id, success, error) {
        return resource.get({ id: id }).$promise;
    }
    
    resource.getUsers = function () {
        return resource.query().$promise;
    }

    resource.saveUser = function (newUser) {
        return new resource(newUser).$save(null);
    }
    
    resource.updateUser = function (user) {
        return resource.update(null, user).$promise;
    }
    
    resource.deleteUser = function (user) {
        return new user.$delete({ id: user._id });
    }
    
    return resource;
});