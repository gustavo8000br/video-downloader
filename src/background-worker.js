try {
    importScripts(
      //"bower_components/async/lib/async.js",
      //"bower_components/lodash/dist/lodash.js",
      //"lib/analytics.js",
      "lib/tabs.js",
      "lib/vimeo.js",
      "lib/app.js",
      "background.js");
  } catch (e) {
    console.error(e);
  }