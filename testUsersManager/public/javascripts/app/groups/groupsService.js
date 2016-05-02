angular.module('testUsersManager')
.value('groupsUrl', '/groups/')
.factory('groupsService', function ($resource, $http, groupsUrl) {
    var resource = $resource(groupsUrl + ':id', { id: '@Id' }, {
        update: { method: 'PUT' }
    });
    
    resource.getGroupByID = function (id, success, error) {
        return resource.get({ id: id }).$promise;
    }
    
    resource.getGroups = function () {
        return resource.query().$promise;
    }
    
    resource.saveGroup = function (newGroup) {
        return new resource(newGroup).$save(null);
    }
    
    resource.updateGroup = function (group) {
        return resource.update(null, group).$promise;
    }
    
    resource.deleteGroup = function (group) {
        return new group.$delete({ id: user._id });
    }
    
    return resource;
});