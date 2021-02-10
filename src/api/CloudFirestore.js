import firebase from 'firebase';


export function FirebaseInit() {
  firebase.initializeApp({
    apiKey: 'AIzaSyBkb4D11XYmDihWk67m73TVJJUkYwDzLIU',
    authDomain: 'ruptiva-data-base.firebaseapp.com',
    projectId: 'ruptiva-data-base'
  });
}

export async function CreateUser(name, document, type) {
  if (firebase.apps.length === 0) {
    FirebaseInit();
  }

  var db = firebase.firestore();

  response = await db.collection("users").add({
    name: name,
    document: document,
    type: type
  });

  console.log('Firebase request')
};

export async function GetUsers() {
    if (firebase.apps.length === 0) {
      FirebaseInit();
    }

    var db = firebase.firestore();

    const response=db.collection('users');
    const data= await response.get()

    let users = []

    data.docs.forEach(item=>{
      const user = item.data()
      users = [...users, 
        {
          id: item.id, 
          name: user.name,
          document: user.document,
          type: user.type 
        }]
    })

    console.log(users)

    return users;
};

export async function DeleteUser(id) {
  if (firebase.apps.length === 0) {
    FirebaseInit();
  }

  var db = firebase.firestore();

  const doc = db.collection('users').doc(id);

  await doc.delete();
};