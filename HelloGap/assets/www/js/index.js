
//Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);


function onLoad()
     {

          document.addEventListener("deviceready", onDeviceReady, true);

     }

     function onDeviceReady()
     { 
    	 navigator.notification.alert("PhoneGap is working!!");
     }

     
     function click2() 
     {
    	 alert("clikkaAAAAA!");
    	 navigator.notification.alert("PhoneGap button working!!!!!");
     }

     function msg() 
     {
    	 alert("clikkaAAAAA!");
    	 navigator.notification.alert("PhoneGap button working!!!!!");
     }
     
     //Vibrate for 2 seconds
     function vibrate() {
         navigator.notification.vibrate(2000);
     }

     // Beep three times
     function playBeep() {
         navigator.notification.beep(1);
     }
     
       