//デバッグ用HTMLを出力
function debug(message) {
  var newElement = document.createElement("div");
  var item = "";
  for(var i = 0; i < message.length; i++) {
    item += message[i] + '\n';
  }
  newElement.innerHTML = '<h1>Support Source Type List:</h1><textarea name="contents" rows=' + message.length +'>' + item + '</textarea>';
  var parent_object = document.getElementById("debug");
  parent_object.appendChild(newElement);
}

//デバッグ用HTMLを出力
function debugChannels(message) {
  var newElement = document.createElement("div");
  var item = "";
  for(var i = 0; i < message.length; i++) {
    item += message[i].name + '\n';
  }
  newElement.innerHTML = '<h1>Channel List:</h1><textarea name="contents" rows=' + message.length +'>' + item + '</textarea>';
  var parent_object = document.getElementById("debug");
  parent_object.appendChild(newElement);
}

window.onload = function() {
  var tv = window.navigator.tv;
  video = document.getElementById('video-player');
  
  if (!tv) {
    alert ('failed to get tv. check permission.');
    return;
  }
  
  tv.getTuners().then (function onsuccess(tuners) {
    if (tuners.length == 0) {
      alert ('getTuners() fail.');
      return;
    }
    
    // Get the supported TV source types for the TV tuner. 
    var sourceTypes = tuners[0].getSupportedSourceTypes();
    if(sourceTypes.length > 0) {
      debug(sourceTypes);
    }
    
    tuners[0].setCurrentSource (sourceTypes[0]).then(function onsuccess() {
      video.mozSrcObject = tuners[0].stream;  // for STB 
      
      currentSource = tuners[0].currentSource;
      currentSource.getChannels().then(function onsuccess(channels) {
        if(channels.length > 0) {
          debugChannels(channels);
        }
      }, function onerror(error) {
        alert ('getChannels() error');
      });
    }, function onerror(error) {
      alert ('setCurrentSource() error');
    });
  }, function onerror(error) {
    alert ('getTuners() error.');
  });
};