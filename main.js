function entrar(){

    var NomeUsuario = document.getElementById("NomeUsuario").value;
    localStorage.setItem("NomeUsuario" , NomeUsuario);
    window.location = "sala.html";
}