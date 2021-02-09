import firebase from 'firebase';


export function FirebaseInit() {
  firebase.initializeApp({
    apiKey: 'AIzaSyBkb4D11XYmDihWk67m73TVJJUkYwDzLIU',
    authDomain: 'ruptiva-data-base.firebaseapp.com',
    projectId: 'ruptiva-data-base'
  });
}

export async function CreateUser(name, document, type) {
  var db = firebase.firestore();

  response = await db.collection("users").add({
    name: name,
    document: document,
    type: type
  });

  console.log('Firebase request')
  for (let i=0; i<50000000;) {
    i = i + 1
  }
};