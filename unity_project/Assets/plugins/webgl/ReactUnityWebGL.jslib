mergeInto(LibraryManager.library, {
  RotationDidUpdate: function(degrees) {
    ReactUnityWebGL.RotationDidUpdate(degrees);
  },
  Say: function(message) {
    ReactUnityWebGL.Say(message);
  }
});