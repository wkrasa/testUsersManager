angular.module('testUsersManager')
.directive('messagesDir', function ($timeout, messagesSrv) {
    return {
        restring: "EA",
        scope: { },
        link: function (scope, elm, attrs) {
            scope.msgType = attrs['msgType'];

            scope.checkMessage = function (msg) {
                if (scope.msgType == null) { return true; }
                if (msg.type == null) { return true; }
                return (msg.type == scope.msgType);
            }

            scope.displayMessage = function (msg) {
                var levelClass = "alert-info";
                if (msg.level == 1) { levelClass = "alert-warning"; }
                else if (msg.level == 2) { levelClass = "alert-danger"; }
                var p = angular.element('<p class="clearfix  alert ' + levelClass + '"><span class="pull-left">' + msg.text + '</span><span class="pull-right close">&times;</span></p>');
                elm.append(p);
                p.on('click', function () { p.addClass('hidden'); });
                $timeout(function () {
                    p.hide(300);
                    //p.remove();
                }, 3000);
            }

            angular.forEach(messagesSrv.messages, function (msg) {
                if (scope.checkMessage(msg)) {
                    scope.displayMessage(msg);
                }
            });

            messagesSrv.registerObserver(function (msg) {
                if (scope.checkMessage(msg)) {
                    scope.displayMessage(msg);
                }
            });


        }
    }
}).factory('messagesSrv', function () {
    var messagesSrv = {};
    messagesSrv.messages = [];

    messagesSrv.addMessageFilter = function (text, level, type) {
        var msg = { text: text, level: level, type: type }
        messagesSrv.messages.push(msg);
        messagesSrv.onMessageAdded(msg);
    }

    messagesSrv.addMessage = function (text, level) {
        messagesSrv.addMessageFilter(text, level, null);
    }

    messagesSrv.addMessageSimple = function (text) {
        messagesSrv.addMessageFilter(text, 0, null);
    }

    messagesSrv.addMessageInfo = function (text) {
        messagesSrv.addMessageFilter(text, 0, null);
    }

    messagesSrv.addMessageWrn = function (text) {
        messagesSrv.addMessageFilter(text, 1, null);
    }

    messagesSrv.addMessageError = function (text) {
        messagesSrv.addMessageFilter(text, 2, null);
    }

    messagesSrv.messageObservers = [];

    messagesSrv.registerObserver = function (observerFn) {
        messagesSrv.messageObservers.push(observerFn);
    }

    messagesSrv.deregisterObserver = function (observerFn) {
        messagesSrv.messageObservers.remove(observerFn);
    }

    messagesSrv.onMessageAdded = function (msg) {
        angular.forEach(messagesSrv.messageObservers, function (observer) {

            observer(msg);
        });
    }

    return messagesSrv;
});