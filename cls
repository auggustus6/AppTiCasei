warning: LF will be replaced by CRLF in android/app/build.gradle.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in android/app/src/main/java/com/mobileticasei/MainActivity.java.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in android/app/src/main/java/com/mobileticasei/MainApplication.java.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in metro.config.js.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/config/ReactotronConfig.js.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/index.js.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/pages/Main/index.js.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/routes.js.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/services/api.js.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/store/index.js.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/store/sagas/index.js.
The file will have its original line endings in your working directory
[1mdiff --git a/android/app/build.gradle b/android/app/build.gradle[m
[1mindex 44bfec9..ad1d87a 100644[m
[1m--- a/android/app/build.gradle[m
[1m+++ b/android/app/build.gradle[m
[36m@@ -78,6 +78,7 @@[m [mimport com.android.build.OutputFile[m
 project.ext.react = [[m
     entryFile: "index.js",[m
     enableHermes: false,  // clean and rebuild if changing[m
[32m+[m[32m    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf', 'Feather.ttf', 'FontAwesome.ttf' ] // Name of the font files you want to copy[m
 ][m
 [m
 apply from: "../../node_modules/react-native/react.gradle"[m
[36m@@ -181,6 +182,8 @@[m [mandroid {[m
 dependencies {[m
     implementation fileTree(dir: "libs", include: ["*.jar"])[m
     implementation "com.facebook.react:react-native:+"  // From node_modules[m
[32m+[m[32m    implementation 'androidx.appcompat:appcompat:1.1.0-rc01'[m
[32m+[m[32m    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02'[m
 [m
     if (enableHermes) {[m
         def hermesPath = "../../node_modules/hermes-engine/android/";[m
[36m@@ -197,5 +200,5 @@[m [mtask copyDownloadableDepsToLibs(type: Copy) {[m
     from configurations.compile[m
     into 'libs'[m
 }[m
[31m-[m
[32m+[m[32mapply from: "../../node_modules/react-native-vector-icons/fonts.gradle"[m
 apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)[m
[1mdiff --git a/android/app/src/main/java/com/mobileticasei/MainActivity.java b/android/app/src/main/java/com/mobileticasei/MainActivity.java[m
[1mindex c3d5ddf..83bf05a 100644[m
[1m--- a/android/app/src/main/java/com/mobileticasei/MainActivity.java[m
[1m+++ b/android/app/src/main/java/com/mobileticasei/MainActivity.java[m
[36m@@ -2,6 +2,10 @@[m [mpackage com.mobileticasei;[m
 [m
 import com.facebook.react.ReactActivity;[m
 [m
[32m+[m[32mimport com.facebook.react.ReactActivityDelegate;[m
[32m+[m[32mimport com.facebook.react.ReactRootView;[m
[32m+[m[32mimport com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;[m
[32m+[m
 public class MainActivity extends ReactActivity {[m
 [m
   /**[m
[36m@@ -12,4 +16,14 @@[m [mpublic class MainActivity extends ReactActivity {[m
   protected String getMainComponentName() {[m
     return "MobileTiCasei";[m
   }[m
[32m+[m
[32m+[m[32m  @Override[m
[32m+[m[32m    protected ReactActivityDelegate createReactActivityDelegate() {[m
[32m+[m[32m        return new ReactActivityDelegate(this, getMainComponentName()) {[m
[32m+[m[32m          @Override[m
[32m+[m[32m          protected ReactRootView createRootView() {[m
[32m+[m[32m          return new RNGestureHandlerEnabledRootView(MainActivity.this);[m
[32m+[m[32m          }[m
[32m+[m[32m        };[m
[32m+[m[32m      }[m
 }[m
[1mdiff --git a/android/app/src/main/java/com/mobileticasei/MainApplication.java b/android/app/src/main/java/com/mobileticasei/MainApplication.java[m
[1mindex 848734f..e370a4d 100644[m
[1m--- a/android/app/src/main/java/com/mobileticasei/MainApplication.java[m
[1m+++ b/android/app/src/main/java/com/mobileticasei/MainApplication.java[m
[36m@@ -10,15 +10,20 @@[m [mimport com.facebook.soloader.SoLoader;[m
 import java.lang.reflect.InvocationTargetException;[m
 import java.util.List;[m
 [m
[32m+[m
[32m+[m
 public class MainApplication extends Application implements ReactApplication {[m
 [m
[32m+[m
[32m+[m
[32m+[m
   private final ReactNativeHost mReactNativeHost =[m
       new ReactNativeHost(this) {[m
         @Override[m
         public boolean getUseDeveloperSupport() {[m
           return BuildConfig.DEBUG;[m
         }[m
[31m-[m
[32m+[m[41m        [m
         @Override[m
         protected List<ReactPackage> getPackages() {[m
           @SuppressWarnings("UnnecessaryLocalVariable")[m
[1mdiff --git a/metro.config.js b/metro.config.js[m
[1mindex 13a9642..4cdc5f0 100644[m
[1m--- a/metro.config.js[m
[1m+++ b/metro.config.js[m
[36m@@ -5,13 +5,30 @@[m
  * @format[m
  */[m
 [m
[31m-module.exports = {[m
[31m-  transformer: {[m
[31m-    getTransformOptions: async () => ({[m
[31m-      transform: {[m
[31m-        experimentalImportSupport: false,[m
[31m-        inlineRequires: false,[m
[31m-      },[m
[31m-    }),[m
[31m-  },[m
[31m-};[m
[32m+[m[32mconst { getDefaultConfig } = require("metro-config");[m
[32m+[m
[32m+[m[32mmodule.exports = (async () => {[m
[32m+[m[32m  const {[m
[32m+[m[32m    resolver: { sourceExts, assetExts }[m
[32m+[m[32m  } = await getDefaultConfig();[m
[32m+[m[32m  return {[m
[32m+[m[32m    transformer: {[m
[32m+[m[32m      babelTransformerPath: require.resolve("react-native-svg-transformer")[m
[32m+[m[32m    },[m
[32m+[m[32m    resolver: {[m
[32m+[m[32m      assetExts: assetExts.filter(ext => ext !== "svg"),[m
[32m+[m[32m      sourceExts: [...sourceExts, "svg"][m
[32m+[m[32m    }[m
[32m+[m[32m  };[m
[32m+[m[32m})();[m
[32m+[m
[32m+[m[32m// module.exports = {[m
[32m+[m[32m//   transformer: {[m
[32m+[m[32m//     getTransformOptions: async () => ({[m
[32m+[m[32m//       transform: {[m
[32m+[m[32m//         experimentalImportSupport: false,[m
[32m+[m[32m//         inlineRequires: false,[m
[32m+[m[32m//       },[m
[32m+[m[32m//     }),[m
[32m+[m[32m//   },[m
[32m+[m[32m// };[m
[1mdiff --git a/src/config/ReactotronConfig.js b/src/config/ReactotronConfig.js[m
[1mindex 5daff00..e41bc38 100644[m
[1m--- a/src/config/ReactotronConfig.js[m
[1m+++ b/src/config/ReactotronConfig.js[m
[36m@@ -3,7 +3,9 @@[m [mimport { reactotronRedux } from 'reactotron-redux';[m
 import sagaPlugin from 'reactotron-redux-saga';[m
 [m
 if (__DEV__) {[m
[31m-  const tron = Reactotron.configure()[m
[32m+[m[32m  const tron = Reactotron.configure({[m
[32m+[m[32m    host: '192.168.15.19'[m
[32m+[m[32m  })[m
     .use(reactotronRedux())[m
     .use(sagaPlugin())[m
     .connect();[m
[1mdiff --git a/src/index.js b/src/index.js[m
[1mindex 7ce6901..7898875 100644[m
[1m--- a/src/index.js[m
[1m+++ b/src/index.js[m
[36m@@ -3,12 +3,12 @@[m [mimport React from 'react';[m
 import '~/config/ReactotronConfig';[m
 [m
 import { Provider } from 'react-redux';[m
[31m-import store from './store';[m
[32m+[m[32mimport storeConfig from './store';[m
 [m
 import Routes from '~/routes';[m
 [m
 const App = () => ([m
[31m-  <Provider store={store}>[m
[32m+[m[32m  <Provider store={storeConfig}>