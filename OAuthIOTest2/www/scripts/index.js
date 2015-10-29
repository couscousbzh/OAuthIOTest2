
var OauthIOPublicKey = 'RH-mnK6I3Q3H36GJfBpMPeWBDKs'; //PUT YOUR KEY FROM OAUTH.IO HERE

var providerFacebook = 'facebook';
var providerInstagram = 'instagram';

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Gérer les événements de suspension et de reprise Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // do nothing above. start code here
        AppInit();
                
    };

    function onPause() {
        // TODO: cette application a été suspendue. Enregistrez l'état de l'application ici.
        console.log('onPause');
    };

    function onResume() {
        // TODO: cette application a été réactivée. Restaurez l'état de l'application ici.
        console.log('onResume');
    };
})();


function AppInit() {

    OAuth.initialize(OauthIOPublicKey);
    
    InitFacebookApi();
    
    document.getElementById("buttonPostMessageOnMyWall").addEventListener("click", buttonPostMessageOnMyWall);
    document.getElementById("buttonPostMessagePhotoLinkOnMyWall").addEventListener("click", buttonPostMessagePhotoLinkOnMyWall);
    document.getElementById("buttonPostPhotoOnMyWall").addEventListener("click", buttonPostPhotoOnMyWall);

    document.getElementById("buttonLoginFBStandardAPI").addEventListener("click", buttonLoginFBStandardAPI);

    RefreshPage();
}

function InitFacebookApi()
{
    window.fbAsyncInit = function () {
        FB.init({
            appId: '1671360816443358',
            status: true,
            xfbml: true,
            version: 'v2.5'
        });
        console.log('FB init ok');
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "http://connect.facebook.net/fr_FR/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    
}


function RefreshPage() {
    RefreshPage_Facebook();
}
function RefreshPage_Facebook() {

}

/*************************/
/* FACEBOOK Avec OAUTH.IO*/

function buttonPostMessageOnMyWall()
{
    //Affiche des infos sur OAuth
    //console.log(OAuth);

    var facebook = OAuth.create(providerFacebook);

    //If already logged in FB:
    if (facebook) {

        facebook.post('/me/feed', {
            data: {
                message: 'Hello Mr. 93 !'
            }
        })
            
        .done(function (returndata) {
            console.log(returndata);
        }).fail(function (err) {
            console.log(err);
        });

    }
    //If not already logged in FB:
    else {
        Login();
    }
}

function buttonPostMessagePhotoLinkOnMyWall() {
    //Affiche des infos sur OAuth
    //console.log(OAuth);

    var facebook = OAuth.create(providerFacebook);

    //If already logged in FB:
    if (facebook) {

facebook.post('/me/feed', {
    data: {
        message: 'Un singe en hiver',
        link : 'http://reactor.fr/singe.jpg'
    }
})

.done(function (returndata) {
    console.log(returndata);
}).fail(function (err) {
    console.log(err);
});

    }
        //If not already logged in FB:
    else {
        Login();
    }
}

function buttonPostPhotoOnMyWall() {
    //Affiche des infos sur OAuth
    //console.log(OAuth);

    var facebook = OAuth.create(providerFacebook);

    //If already logged in FB:
    if (facebook) {

        alert('ne fonctionne pas pour le moment');

        //facebook.post('/me/photos', {
        //    data: {
        //        message: 'photo description',
        //        link: 'images/singe.jpg'
        //    }
        //})

        //.done(function (returndata) {
        //    console.log(returndata);
        //}).fail(function (err) {
        //    console.log(err);
        //});

    }
        //If not already logged in FB:
    else {
        Login();
    }
}

function Login() {
  
    OAuth.popup(providerFacebook, {
        cache: true //Permet de conserver le user logged en cache
    })
    .done(function (result) {
        RefreshPage_Facebook();
    })
    .fail(function (err) {
        console.log('OAuth.popup fail : ' + err);
    });

    
}


/*************************/
/* FACEBOOK Standard API */

function buttonLoginFBStandardAPI() {
    

    console.log('buttonLoginFBStandardAPI');

    console.log(FB);

    FB.getLoginStatus(function (response) {
        console.log('111');

        if (response.status === 'connected') {
            console.log('Logged in.');
        }
        else {
            console.log('login in process');
            FB.login();
        }
        console.log('???');
    }, true);

    console.log('!!!');
      

    //FB.ui(
    // {
    //     method: 'share',
    //     href: 'https://developers.facebook.com/docs/'
    // }, function (response) { });



    //FB.ui(
    //   {
    //       method: 'stream.publish',
    //       message: 'Message here.',
    //       attachment: {
    //           name: 'Name here',
    //           caption: 'Caption here.',
    //           description: (
    //             'description here'
    //           ),
    //           href: 'http://kmturley.blogspot.fr/2014/10/facebook-login-inside-hybrid-app-using.html'
    //       },
    //       action_links: [
    //         { text: 'Code blabla', href: 'http://kmturley.blogspot.fr/2014/10/facebook-login-inside-hybrid-app-using.html' }
    //       ],
    //       user_prompt_message: 'Personal message here'
    //   },
    //   function (response) {
    //       if (response && response.post_id) {
    //           alert('Post was published.');
    //       } else {
    //           alert('Post was not published.');
    //       }
    //   }
    // );

}
