var base_url='http://localhost:8080';
state = {
  remember_me:false,
  login_value:false,
  currentDiv:'id06'

};

angular.module('mainApp',[]).controller('discover',function($http,$scope,$window,$location){
  


  $scope.loginlogout=function(){
      if(state.login_value==false)
        document.getElementById('id01').style.display='block';
      else{
        state.remember_me=false;
        state.login_value=false;
        //state.token
        $('#id07').text('login');

      }
  }


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
        alert('wrong username or password');
       // document.getElementById('id03').innerHTML = "Wrong keyword entry";
       //$('#id03').show();
    });
    //$('#id03').hide();

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
      
   document.getElementById('id01').style.display='block';

    }
   
    
  };

  $scope.createforum=function(){
    var token=state.token;
    var title=$scope.title;
    var text=$scope.text;
    var url=base_url+'/forum/create';
    $.post(url,
        {
         
         token:token,
         title:title,
         text:text
      },
      function(data, status){
      if(status=="success"){
        $('#id14').hide;
        $('#id16').show();

      }
      });
  };



    $scope.forum=function ()

    {
        document.getElementById(state.currentDiv).style.display='none';
        document.getElementById('id05').style.display='block';
        state.currentDiv='id05';
        var  url=base_url+'/forum/all';
        $.get(
            url,
            {},
            function(data,status) {
                //var response=JSON.parse(JSON.stringify(data));
                var $ul = $('#id05')
                $.each(data.forum, function(idx,item){
                    var author_username=item.author_username;
                   var body= item.body;
                    var id=item.id;
                    var title=item.title;
                        $ul.append('<li style="color:red">'+author_username+' '+body+' '+id+' '+title+'</li>');
                    })

            });


    };

});

function explore(){
   document.getElementById(state.currentDiv).style.display='none';
    document.getElementById('id04').style.display='block';  
     state.currentDiv='id04';


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



