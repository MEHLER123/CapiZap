// Adicionar os seus links do Firebase 
const firebaseConfig = {
  apiKey: "AIzaSyB_tCdpV93pAQhRpxnBoFMok7_iuqvZhss",
  authDomain: "capizap-f683f.firebaseapp.com",
  databaseURL: "https://capizap-f683f-default-rtdb.firebaseio.com",
  projectId: "capizap-f683f",
  storageBucket: "capizap-f683f.appspot.com",
  messagingSenderId: "556533034794",
  appId: "1:556533034794:web:6581a11e6b137972c0b853"
};
firebase.initializeApp(firebaseConfig);

// Criar a função addRoom: 
var nomeusuario = localStorage.getItem("NomeUsuario");
document.getElementById("nomeUsuario").innerHTML="Bem-Vindo, " + nomeusuario;
 
function addRoom(){

  roomName = document.getElementById("roomName").value;
  firebase.database().ref("/").child(roomName).update({

    purpose:"Adicionando nome da Toca"
  }); 
  localStorage.setItem("roomName" , roomName);
  window.location = "mensagem.html";

}
// Obter os nomes das salas já gravadas no Firebase: 
function getData() {  
    firebase.database().ref("/").on('value', function(snapshot) {
      document.getElementById("output").innerHTML = ""; 
      snapshot.forEach(function(childSnapshot) { 
        childKey  = childSnapshot.key;
        roomName = childKey;
        console.log("Nome da sala: " + roomName);
        row = "<div class='roomName' id="+ roomName+" onclick='redirectToRoomName(this.id)' >#"+ roomName +"</div><hr>";
        document.getElementById("output").innerHTML += row;
      });
    });
  }

// Chamar a função getData
getData(); 

// Redirecionar para a sala escolhida 
function redirectToRoomName(name){

  console.log(name);
  localStorage.setItem("roomName" , roomName);
  window.location = "mensagem.html"
}

// Fazer o logout 
function logout(){
  localStorage.removeItem("NomeUsuario");
  localStorage.removeItem("roomName");
  window.location = "index.html"
}