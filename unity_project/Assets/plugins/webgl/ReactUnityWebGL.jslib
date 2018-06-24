mergeInto(LibraryManager.library, {
  SendRotation: function(rotation) {
    ReactUnityWebGL.SendRotation(rotation);
  },
  SendMessage: function(message) {
    ReactUnityWebGL.SendMessage(message);
  }
});