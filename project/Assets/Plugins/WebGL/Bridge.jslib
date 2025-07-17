mergeInto(LibraryManager.library, {
  ScoreDidUpdate: function (score) {
    dispatchReactUnityEvent("scoreDidUpdate", score);
  },
});
