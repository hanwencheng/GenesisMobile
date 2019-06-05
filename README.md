# GenesisMobile
React native mobile application for genesis space

### Quick Start

(Recommend if you do not have node installed)

* Install NVM: https://github.com/creationix/nvm

* Install NODE WITH NVM: `nvm install latest`

* Install globally expo-cli   `npm install -g expo-cli`

* Enter Project(Genesis Mobile) folder and install Dependency： `npm install`

* start with`expo start`

* run Emulator in the opened window

* Please create new branch and make PR to master branch.

### Contribute(Chinese)

基本如何新建component，可以看这个[录制的视频](https://zoom.us/recording/share/vePRFto2ubrnEzihfatogSU_b3HR3VBZCMfoza8K8P6wIumekTziMw?startTime=1545263766000)。

##### Framework

The main structure is using expo with react native:
https://expo.io/

react native integrate many component，each of them could be check on documentation website, for example, Alert:
https://facebook.github.io/react-native/docs/alert

Also expo has some special component, like this Document Picker:
https://docs.expo.io/versions/latest/sdk/document-picker/

##### Other vendors

React Navigation: https://reactnavigation.org/

Redux: https://redux.js.org/

lodash: https://lodash.com/docs/4.17.11

##### Difference of Android and iOS

How to write platform specific code on react native:
https://facebook.github.io/react-native/docs/platform-specific-code


### Build and Deploy
 
##### Build

Check [Expo Document](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/)


##### Deploy
Check [Expo Document](https://docs.expo.io/versions/latest/distribution/uploading-apps/)

in short
* build locally with `expo build:ios`
* upload IPA file to test flight through Application Loader 








