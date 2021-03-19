mergeInto(LibraryManager.library, {
  RotationDidUpdate: function (degrees) {
    ReactUnityWebGL.RotationDidUpdate(degrees);
  },
  Say: function (message) {
    ReactUnityWebGL.Say(Pointer_stringify(message));
  },
  ClickedPosition: function (x, y) {
    ReactUnityWebGL.ClickedPosition(x, y);
  }
});
