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

// Enviar mensagem 
var nomeUsuario = localStorage.getItem("NomeUsuario");
var RoomName = localStorage.getItem("roomName");
function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(RoomName).push({
        name:nomeUsuario,message:msg,like:0
    });
    document.getElementById("msg").value = "";

}

// Obter os nomes das salas/mensagens já gravadas no Firebase: 
function getData(){ 
    firebase.database().ref("/"+RoomName).on('value', function(snapshot) { 
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        console.log(firebase_message_id);
        console.log(message_data);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4> "+ name + "<img class='user_tick' src='capibara.png'></h4>";
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Curtidas: "+ like +"</span></button><hr>";
        row = name_with_tag + message_with_tag +like_button + span_with_tag;       
        document.getElementById("output").innerHTML += row;
    } });  }); 
}

// Chamar a função getData
getData();

// Dar like nas mensagens 
function updateLike(message_id){

    console.log("clicou no botão curtir" + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value
    updatedLikes = Number(likes) + 1
    console.log(updatedLikes);
    firebase.database().ref(RoomName).child(message_id).update({
        like: updatedLikes
        
    });

} 


// Fazer o logout 
function logout(){
    localStorage.removeItem("NomeUsuario");
    localStorage.removeItem("roomName");
    window.location.replace("index.html");
} 
