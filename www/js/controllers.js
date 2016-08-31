angular.module('starter.controllers', ['ngStorage','starter.services', 'ngOpenFB', 'ngCordova','ngCordovaOauth'])
  

 //page login
  .controller("LoginCtrl", function($scope, $state, $cordovaOauth,$localStorage ,ngFB) {

    $scope.login = function() {

       console.log("log normal");
       //Log in to your own databse
    }
    
    $scope.login_facebook = function(){

        console.log("log facebook");
       //Log in with facebook API

        //Do not forget to put the good OAuth URL redirection
        $cordovaOauth.facebook("1161624057237110", ["email", "user_website", "user_location", "user_relationships"], {redirect_uri: "http://localhost/oauthcallback.html"}).then(function(result) {
            // results
            
            console.log(result);
            $localStorage.accessToken = result.access_token;
            console.log("voici le token: " + result.access_token);

            $state.go('tab.account');
            //$state.go('profile');


        }, function(error) {
            // error
            console.log(error);
        }); 



    }

    $scope.register = function(){


       console.log("sa rentre dans register");
       $state.go('register');


    }

  })

  //page register
  .controller('RegisterCtrl', function($scope, $state) {

      $scope.data = {};

      $scope.goToLogin = function(){

          $state.go('login');
      }

      $scope.register = function(data){

          console.log("process registration");
          console.log(data);
      }

  })

  .controller('ProfileCtrl', function ($scope, $http, $localStorage, $state) {
    
        $scope.init = function() {

         if($localStorage.hasOwnProperty("accessToken") === true) {
              $http.get("https://graph.facebook.com/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
                  $scope.profileData = result.data;
              }, function(error) {
                  alert("There was a problem getting your profile.  Check the logs for details.");
                  console.log(error);
              });
          } else {
              alert("Not signed in");
              $state.go("login");
          }

      }


 })


  .controller('AccountCtrl', function($scope, $http, $localStorage, $state) {
    
    $scope.settings = {
      enableFriends: true
    };


    $scope.init = function() {

         if($localStorage.hasOwnProperty("accessToken") === true) {
              $http.get("https://graph.facebook.com/v2.5/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
                  $scope.profileData = result.data;
              }, function(error) {
                  alert("There was a problem getting your profile.  Check the logs for details.");
                  console.log(error);
              });
          } else {
              alert("Not signed in");
              $state.go("login");
          }

    };

     $scope.logout = function() {
        
        $localStorage.accessToken = "";
        $state.go("login");
          
    };
  

  })




  .controller('DashCtrl', function($scope) {

  })

  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };

  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  });


