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
        console.log(data);
        state.token=data.token;
        if(data.status=="OK"){
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
    console.log({
          username: username,
          password: password,
          email:email,
          phone:phone
      });
    if(password!=rpassword){
      $('id11').show();
    }
    else{
      var url=base_url+'/user/create';

      $.post(url,
        {
          username: username,
          password: password,
          email:email,
          phone:phone
      },
      function(data, status){
        console.log(data);

      });
    
    }
  };


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
