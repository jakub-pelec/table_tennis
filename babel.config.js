module.exports = {
  "presets": ['module:metro-react-native-babel-preset'],
  "plugins": [
    ["module-resolver", {
    "root": [
      "./source"
    ],
    "extensions": [
      ".ios.ts",
      ".android.ts",
      ".ts",
      ".ios.tsx",
      ".android.tsx",
      ".tsx",
      ".jsx",
      ".js",
      ".json"
    ],
    "alias": {
      "@components": "./source/components/",
      "@assets": "./source/assets/",
      "@actions": "./source/actions/",
      "@constants": "./source/constants/",
      "@shared": "./source/shared/",
      "@typings": "./source/typings/",
      "@utils": "./source/utils/",
      "@schemas": "./source/schemas/",
      "@env": "./source/env/",
      "@reducers": "./source/reducers/"
    }
  }]
  ]
};
