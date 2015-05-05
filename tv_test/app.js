window.addEventListener("load", function() {
  console.log("Hello World!");
});

alert(navigator.tv);

// Retrieve all the available TV tuners.
navigator.tv.getTuners().then(function onsuccess(tuners) {
  // Just use the first TV tuner.
  var tuner = tuners[0];

  // Set the 'oncurrentsourcechanged' event handler.
  tuner.oncurrentsourcechanged = function oncurrentsourcechanged(event) {
    alert("The current TV source has changed.");
  };

  // Get the supported TV source types for the TV tuner. 
  var sourceTypes = tuner.getSupportedSourceTypes();

  // Just use the first TV source type.
  tuner.setCurrentSource(sourceTypes[0]).then(function onsuccess() {
    alert("Succeeded to set the TV source.");
  }, function onerror(error) {
    alert(error);
  });
}, function onerror(error) {
  alert(error);
});

