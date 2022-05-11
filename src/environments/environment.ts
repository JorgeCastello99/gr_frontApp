// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl: 'https://grapi.growthroad.es:5555',
  apiUrl: 'http://localhost:3000',
  secretKey: 'SdgyR3gqrsamrbmOfD0neipEKWa1QquE',
  firebaseConfig: {
    apiKey: "AIzaSyB1Qa6YBBTSp1VaJPEUH2jjE4yku742UmM",
    authDomain: "growthroad-bb7ac.firebaseapp.com",
    databaseURL: "https://growthroad-bb7ac-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "growthroad-bb7ac",
    storageBucket: "gs://growthroad-bb7ac.appspot.com/perfil_imagen",
    messagingSenderId: "239868820299",
    appId: "1:239868820299:web:99ded0bc951f0c7cc206ce",
    measurementId: "G-LSBL4YKBEB"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
