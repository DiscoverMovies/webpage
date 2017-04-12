

//when login screen on other page options shouldnt work

var base_url='http://localhost:8080';
state = {
  remember_me:false,
  login_value:false,
  currentDiv:'id06'


};

angular.module('mainApp',[]).controller('discover',function($http,$scope,$window,$location){

    $scope.loginLogout=function(){
        if(state.login_value==false) {
            $('#id25').show();
        }
        else{
            state.remember_me=false;
            state.login_value=false;
            //state.token
            $('#id07').text('login');

        }
    };


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
                    $('#id25').hide();
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
      document.getElementById('id21').style.display='none';
      if(state.login_value==true){
          $('#id13').show();
    }
    else{

          $('#id25').show();
          //document.getElementById('id01').style.display='block';

    }
   
    
  };

  $scope.createforum=function(){

    var token=state.token;
    var title=$scope.title;
    var text=$scope.text;
    var url=base_url+'/forum/create';
    $.post(url,
        {
            title:title,
         token:token,

         text:text
      },
      function(data, status){
      if(data.status=="OK"){
          document.getElementById('id13').style.display='none';
        //$('#id13').hide;
          document.getElementById('id21').style.display='none';
          var $ul = $('#id05')
          $ul.append('<li>' + title+'</li>');
          $ul.append('<li>' + text+'</li>');

      }
      });
  };


    $scope.forum=function () {
        if (state.currentDiv != 'id05') {
            document.getElementById(state.currentDiv).style.display = 'none';
            document.getElementById('id05').style.display = 'block';
            state.currentDiv = 'id05';
            var url = base_url + '/forum/all';
            $.get(
                url,
                {},
                function (data, status) {
                    //var response=JSON.parse(JSON.stringify(data));
                    var $ul = $('#id21')
                    $.each(data.forum, function (idx, item) {
                        var author_username = item.author_username;
                        var body = item.body;
                        var id = item.id;
                        var title = item.title;
                        $ul.append('<li>' + id+'</li>');
                        $ul.append('<li style="color:red" >' + '<b>'+title+'</b>'+'</li>');
                        $ul.append('<li>' + 'created by'+author_username+'</li>');

                        $ul.append('<li>' + body+'</li>');
                        $ul.append('<br><br>')

                    })
                });


        }
        ;
    }
    $scope.explore=function () {


        document.getElementById(state.currentDiv).style.display='none';
        document.getElementById('id04').style.display='block';
        state.currentDiv='id04';


    };

    $scope.home=function(){

        document.getElementById(state.currentDiv).style.display='none';
        document.getElementById('id06').style.display='block';
        state.currentDiv='id06';


    };

    $scope.signUpForm=function(){
        document.getElementById('id25').style.display='none';
        document.getElementById('id10').style.display='block';
    };
    $scope.searchForum=function () {
        var url=base_url+'/forum/search';
        var searchforums=$scope.searchforums;
        $.get(url,
            {
                q:searchforums
            },
            function(data, status){
                $(".divforumsearch").empty();
                if(data.status=="OK"){

                    var $ul = $('#id26');
                    data.forums.forEach( function (v,k) {
                        $ul.append('<li>' + v.title+'</li>');
                        $ul.append('<li>' + v.author_username + '</li>');
                        $ul.append('<li>' + v.body + '</li>');
                        $ul.append('<li>' + v.id + '</li>');
                        $('#id26').show;
                        $( "#id27" ).autocomplete({
                            source: v.title
                        });

                    })

                    //console.log(data.forums.author_username);
                }
            });

    };

});








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



