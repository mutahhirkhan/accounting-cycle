import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBpfaqC0KAv_95cy6bdU87vPp6enOWMLq8",
//   authDomain: "financialaccounting-007.firebaseapp.com",
//   projectId: "financialaccounting-007",
//   storageBucket: "financialaccounting-007.appspot.com",
//   messagingSenderId: "297926347039",
//   appId: "1:297926347039:web:cf1d3fb75ef8a05e6b482a",
//   measurementId: "G-5RHY15KBWZ"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCgCOsK---FZVDasAqeTBB761aoCH32_D4",
  authDomain: "acc-cycle.firebaseapp.com",
  projectId: "acc-cycle",
  storageBucket: "acc-cycle.appspot.com",
  messagingSenderId: "38607076012",
  appId: "1:38607076012:web:f86c59ccadb53a0612bd09",
  measurementId: "G-8MD5MYT93J"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }