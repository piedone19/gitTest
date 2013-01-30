
   // Wait for PhoneGap to load
   document.addEventListener("deviceready", onDeviceReady, false);

   // PhoneGap is ready
   function onDeviceReady() {
	// Do cool things here...
	   
	   var element = document.getElementById('uuid');

	           var uuid = device.uuid;
	   		   element.innerHTML = uuid; 
	   
	   //jquery cross domain allow
	   $( document ).bind( "mobileinit", function() {
		    // Make your jQuery Mobile framework configuration changes here!
		    $.support.cors = true;
		    $.mobile.allowCrossDomainPages = true;
		    $.mobile.buttonMarkup.hoverDelay = 0;
		});  
	   
	   
   }

   function getImage() {
	   alert("getImage2013!!!");
       // Retrieve image file location from specified source
       navigator.camera.getPicture(uploadPhoto, function(message) {
		alert('get picture failed');
	},{
		quality: 50, 
		destinationType: navigator.camera.DestinationType.FILE_URI,
	    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
	}
       );

   }
   
   function camera() {
       // Retrieve image file location from specified source
	   alert("camera2013_1!!!");
       navigator.camera.getPicture(uploadPhoto, function(message) {
		alert('get picture failed');
	},{
		quality: 50, 
		destinationType: navigator.camera.DestinationType.FILE_URI,
	    sourceType: navigator.camera.PictureSourceType.CAMERA
	}
       );
       alert("camera2013_2!!!");
   }

   function uploadPhoto(imageURI) {
       var options = new FileUploadOptions();
       options.fileKey="file";
       options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
       options.mimeType="image/jpeg";

       var params = new Object();
       params.nome = $("#nome").val();
       params.cognome = $("#cognome").val();
       params.contatto = $("#contatto").val();
       params.commento = $("#commento").val();;
       params.uuid = $("#uuid").val();;

       options.params = params;
       options.chunkedMode = false;

       var urlUpload = getUrlUpload();
       
       fileTransfer( imageURI, urlUpload, options );
       
   }

   function fileTransfer(imageURI, urlUpload, options) 
   {
	    var ft = new FileTransfer();
      
       //percentuale upload
       ft.onprogress = function(progressEvent) {
    	       if (progressEvent.lengthComputable) {
    	         var percentage = Math.round( (progressEvent.loaded / progressEvent.total) * 100) ;
    	   		 var strpercentage = "uploading... " + percentage + " % "; 
    	   		 //$("#percentage").html(strpercentage);
    	   		
    	   		$.mobile.loading( 'show', {
    	   			text: strpercentage,
    	   			textVisible: true,
    	   			theme: 'a',
    	   			html: ""
    	   		});
    	   		 
    	       } else {
    	         var percentage = "uploading...";
    	       }
    	   };
       
       ft.upload(imageURI, urlUpload, win,
    		   function fail(error)
       			{
           			//alert("An error has occurred: Code = " + error.code + " Retry, please! ");
    	            fileTransfer(imageURI, urlUpload, options);
       			}
    		   
    		   , options);
	   
   }
   
   //get the url to upload
   function getUrlUpload() 
   {
	   //check wifi / 3g 
       var networkState = navigator.connection.type;
       switch( networkState ) 
       {
       //case "wifi":
       //var urlUpload = "http://10.0.0.10/www/phonegap/upload.php";
       //break;	   
       
        default:
        //var urlUpload = "http://79.14.84.13/phonegap/upload.php"; 	
        var urlUpload = "http://www.alfapin.com/carnevale/gap/upload.php"; 	
       }
       return urlUpload;
   }
   
   
   function win(r) {
       console.log("Code = " + r.responseCode);
       console.log("Response = " + r.response);
       console.log("Sent = " + r.bytesSent);
       //alert("OK " + r.response);
       alert("File caricato correttamente!");
       $("#percentage").html("");
       $.mobile.loading( 'hide');
   }

   

   //************************************************************
   // VIDEO************************************************************
   //************************************************************
   
   function video() 
   {
	   alert("video2013_1!!!");
	   navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1});
	   alert("video2013_2!!!");
   }
   
	// Called when capture operation is finished
   //
   function captureSuccess(mediaFiles) {
       var i, len;
       for (i = 0, len = mediaFiles.length; i < len; i += 1) {
           uploadFile(mediaFiles[i]);
       }       
   }

   // Called if something bad happens.
   // 
   function captureError(error) {
       var msg = 'An error occurred during capture: ' + error.code;
       navigator.notification.alert(msg, null, 'Uh oh!');
   }
   
// Upload files to server
   function uploadFile(mediaFile) {
       var ft = new FileTransfer(),
           path = mediaFile.fullPath,
           name = mediaFile.name;

       //percentuale upload
       ft.onprogress = function(progressEvent) {
    	       if (progressEvent.lengthComputable) {
    	         var percentage = Math.round( (progressEvent.loaded / progressEvent.total) * 100) ;
    	   		 var strpercentage = "uploading... " + percentage + " % "; 
    	   		 $("#percentage").html(strpercentage);
    	       } else {
    	         var percentage = "uploading...";
    	       }
    	   };
       
    	   var options = new FileUploadOptions();
           options.fileKey="file";
           options.fileName= name;
           options.mimeType="video/mp4";

           var params = new Object();
           params.name = $("#name").val();
           params.commento = $("#commento").val();;

           options.params = params;
           options.chunkedMode = false;   
    	   
       ft.upload(path, getUrlUpload(),
           function(result) {
               console.log('Upload success: ' + result.responseCode);
               console.log(result.bytesSent + ' bytes sent');
               alert("Video caricato correttamente!");
               $("#percentage").html("");
           },
           function(error) {
               console.log('Error uploading file ' + path + ': ' + error.code);
           },
           options);   
   }
   