//selecciona el elemento con el id pasado por parametro
const listaTweets = document.getElementById('lista-tweets');

EventListeners();

function EventListeners() {

    //selecciona el elemento con el id pasado por parametro y le agrega un evento
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    //agrega un evento a listaTweets
    listaTweets.addEventListener('click', borrarTweet);
    //contenido cargardo     se ejecuta una vez que se carge toda la pagina
    document.addEventListener('DOMContentLoaded', localStorageListo);



}

function agregarTweet(e) {

    //deja sin evento a eventos anteriores
    e.preventDefault();
    
    const tweet = document.getElementById('tweet').value;

    
    const botonBorrar = document.createElement('a'); //crea un nuevo elemento 'a'
    botonBorrar.classList = 'borrar-tweet'; //asinga una clase a el elemento
    botonBorrar.innerText = 'X'; // asigna un texto al elemento

    const li = document.createElement('li');
    li.innerText = tweet; //asigna el contenido de tweet al elemento 'li'

    listaTweets.appendChild(li); //a listaTweets le agrega el elemento li
    li.appendChild(botonBorrar);//a li le agrega el elemento borrarBoton(es un 'a')

    agregarAlLocalStorage(tweet);

    limpiar();

}

function borrarTweet(e) {
    
    e.preventDefault();

    if (e.target.className === 'borrar-tweet') {
        //selecciona el elemento padre de 'e' y lo elimina
        e.target.parentElement.remove();

    }

    borrarTweetLocalStorage(e.target.parentElement.innerText);


}

function localStorageListo() {

    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function (tweet) {
        
        const botonBorrar = document.createElement('a'); //crea un nuevo elemento 'a'
        botonBorrar.classList = 'borrar-tweet'; //asinga una clase a el elemento
        botonBorrar.innerText = 'X'; // asigna un texto al elemento

        const li = document.createElement('li');
        li.innerText = tweet; //asigna el contenido de tweet al elemento 'li'

        listaTweets.appendChild(li); //a listaTweets le agrega el elemento li
        li.appendChild(botonBorrar);//a li le agrega el elemento borrarBoton(es un 'a')
    });

}

function agregarAlLocalStorage(tweet) {
 
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    //agrega al final del 'tweets' el parametro pasado
    tweets.push(tweet);

    //agrega al local storage      convierte un json en un array de strings
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

function obtenerTweetsLocalStorage() {
    
    let tweets;
    //verifica que el local storage no este vacio
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        //lee los elementos del local storage y los convierte en un json
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

function borrarTweetLocalStorage(tweet) {
    
    let tweets, tweetBorrar;
    //genera un sub sitring de la posicion A hasta B
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function (tweet, index) {
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1);
       } 
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function limpiar() {
    //limpia el textArea
    document.querySelector('#tweet').value = "";
}