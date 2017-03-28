var base_url='http://localhost:8080';
state = {
  remember_me:false,
  login_value:false,
  currentDiv:'id06'
};

angular.module('mainApp',[]).controller('loginControl',function($http,$scope,$window,$location){
  
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
        state.token=data.token;
        //$('#id01').css('display','none');
        if(data.status=="OK"){
        $('#id01').hide();
        state.login_value=true;
        if(state.remember_me==true)
          document.cookie=username+state.token;
        //$("#id07").attr('value', 'logout');
        $('#id07').text('logout');//.button("refresh");
       }
       else
       {
        $('#id03').show();
       }
    });


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