var base_url='http://localhost:8080';
state = {
  remember_me:false,
  login_value:false

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
        //$("#id07").attr('value', 'logout');
        $('#id07').text('logout').button("refresh");
       }
    });


  };
});