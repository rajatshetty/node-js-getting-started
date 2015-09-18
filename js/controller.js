/**
 * Created by rshetty2 on 9/14/15.
 */



'use strict';
function initController($scope,$routeParams,$location,DataStore,$rootScope) {

    $scope.showmsg=false;

    $scope.initPage=function()
    {
        var uri = $location.path();
        if(uri=='/page1'){
            $scope.data=DataStore.getPage1Data();
        }
        else if(uri=='/page2'){
            $scope.data=DataStore.getPage2Data();
        }
        else
        {
            $scope.data=DataStore.getWelcomePageData();
        }
    }

    $scope.authenticateUser=function(username,password){
        if((username=="user1" || username=="user2" || username=="user3") && password=="passwd"){
            $scope.showmsg=false;
            $rootScope.username=username;
            $location.url('page1');

        }
        else{
            $scope.showmsg=true;
        }
    }
}

function page1Controller($scope,$routeParams,$location,DataStore,$rootScope) {
    $scope.socket = io();

    $scope.listofUser=[];

    $scope.initPage=function()
    {
        var uri = $location.path();
        if(uri=='/page1'){
            $scope.data=DataStore.getPage1Data();
        }
        else if(uri=='/page2'){
            $scope.data=DataStore.getPage2Data();
        }
        else
        {
            $scope.data=DataStore.getWelcomePageData();
        }

        var socket = io();

        socket.on("pushnotification", function(user,currentuser,msg){
            alert("Message from "+currentuser+" as "+msg);
        });

        socket.emit('initiate',$rootScope.username);


        $scope.addToList=function(str){
            if($scope.listofUser.indexOf(str)){
                $scope.listofUser.push(str);
            }
            else{
                $scope.listofUser.splice(str,1);
            }
        }

        $scope.sendMessage=function(str){
            for(var i=0;i<$scope.listofUser.length;i++) {
                socket.emit('notify',$scope.listofUser[i],$rootScope.username, str);
            }
        }
    }

}

function page2Controller($scope,$routeParams,$location,DataStore) {

    $scope.initPage=function()
    {
        var uri = $location.path();
        if(uri=='/page1'){
            $scope.data=DataStore.getPage1Data();
        }
        else if(uri=='/page2'){
            $scope.data=DataStore.getPage2Data();
        }
        else
        {
            $scope.data=DataStore.getWelcomePageData();
        }

    }

}