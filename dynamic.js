var base_url='http://localhost:8080';
state = {
  remember_me:false,
  login_value:false,
  currentDiv:'id06'

};

angular.module('mainApp',[]).controller('discover',function($http,$scope,$window,$location){
  
  $scope.login=function(){
    var username=$scope.uname;
    var password=$scope.psw;
    var url=base_url+'/user/auth';
    if($scope.checkbox==true)
      state.remember_me=true;
    $.post(url,
    {
        username: username,
        password: password
    },
    function(data, status){
        
        if(data.status=="OK"){
          state.token=data.token;
        $('#id01').hide();
        state.login_value=true;
        if(state.remember_me==true)
          document.cookie=username+state.token;
        $('#id07').text('logout');
       }
       else
       {
        $('#id03').show();
       }
    });


  };

  $scope.signup=function(){
    var username=$scope.sname;
    var password=$scope.spassword;
    var phone=$scope.sphone;
    var email=$scope.semail;
    var rpassword=$scope.srpassword;
   
    if(password!=rpassword){
      $('#id11').show();
    }
    else{

      var url=base_url+'/user/create';
      if($scope.checkbox1==true)
        state.remember_me=true;
      $.post(url,
        {
          username: username,
          password: password,
          email:email,
          phone:phone
      },
      function(data, status){
        state.token=data.token;
        $('#id10').hide();
        state.login_value=true;
        $('#id07').text('logout');
         if(state.remember_me==true)
          document.cookie=username+state.token;

      });
    
    }
  };

  $scope.createforumform=function(){
    if(state.login_value==true){
      $('#id13').show();
    }
    else{
       $('#id01').show();
       $scope.login();
       
    }
   
    
  };

  $scope.createforum=function(){
      var token=state.token;
    var title=$scope.title;
    var text=$scope.text;
  
    console.log(title,text,token);
    var url=base_url+'/forum/create';

    $.post(url,
        {
         
         token:token,
         title:title,
         text:text
      },
      function(data, status){
      if(status=="OK"){
        $('id14').hide;
        
      }
      });
  };



  /*$scope.searchforum=function(){
    var url=base_url+'/forum/search';
    var q=$scope.searchforums;
     $.post(url,
        {
         
         q:q
      },
      function(data, status){
      console.log(data);
     
      });

  }*/
/*
.directive('ng-enter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ng-enter);
                });
 
                event.preventDefault();
            }
        });
    };
});
*/

});

function explore(){
   document.getElementById(state.currentDiv).style.display='none';
    document.getElementById('id04').style.display='block';  
     state.currentDiv='id04';


}

function forum(){

   document.getElementById(state.currentDiv).style.display='none';
    document.getElementById('id05').style.display='block';  
     state.currentDiv='id05';


}

function home(){

   document.getElementById(state.currentDiv).style.display='none';
    document.getElementById('id06').style.display='block';  
     state.currentDiv='id06';


}

function signUpForm(){
  document.getElementById('id01').style.display='none';
  document.getElementById('id10').style.display='block';
}


/*angular.module('mainApp').directive('ng-enter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ng-enter);
                });
 
                event.preventDefault();
            }
        });
    };

});*/



