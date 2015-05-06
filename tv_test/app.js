//デバッグ用HTMLを出力
function debug(message) {
  var newElement = document.createElement("div");
  var item = "";
  for(var i = 0; i < message.length; i++) {
    item += message[i] + '\n';
  }
  newElement.innerHTML = '<textarea name="contents" rows="30" cols="100">' + item + '</textarea>';
  var parent_object = document.getElementById("debug");
  parent_object.appendChild(newElement);
}

// Retrieve all the available TV tuners.
navigator.tv.getTuners().then(function onsuccess(tuners) {
  // Just use the first TV tuner.
  var tuner = tuners[0];
  
  //リンクして再生
  var video = document.getElementById("video-player");
  
  //エミュレータ環境
  video.src = tuner.stream;
  video.play();
  
  //本番環境
//  video.srcObject = tuner.stream;

/*
  // Set the 'oncurrentsourcechanged' event handler.
  tuner.oncurrentsourcechanged = function oncurrentsourcechanged(event) {
    alert("The current TV source has changed.");
  };
*/
  // Get the supported TV source types for the TV tuner. 
  var sourceTypes = tuner.getSupportedSourceTypes();
  if(sourceTypes.length > 0) {
    debug(sourceTypes);
  }
/*
  // Just use the first TV source type.
  tuner.setCurrentSource(sourceTypes[0]).then(function onsuccess() {
    alert("Succeeded to set the TV source.");
  }, function onerror(error) {
    alert(error);
  });
*/
}, function onerror(error) {
  alert(error);
});

