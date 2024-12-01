// https://striveschool-api.herokuapp.com/api/deezer/search?q=INSERISCIQUIUNAQUERY

// esempio: https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem



let search = (query) => {

    query = document.querySelector("#searchField").value;   // prende valore da input ricerca
    console.log(query);

    let section = document.querySelector(`#found`);     // seleziona la sezione dell'artista
    let row = section.querySelector(`#searchSection`);  // seleziona la riga dell'artista
    row.innerHTML = ""                                  // svuota div
    let title = document.querySelector(`#found h2`)     // seleziona titolo e aggiunge nome artista ricercato
    title.innerText = ""
    console.log(title);

    //fetch
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query)
        .then((raw) => raw.json())
        .then((res) => {

            let singles = res.data;
            console.log(singles);
            section.classList.remove("d-none");

            title.innerText = `Search results for ${query}`    // inserisci 

            for (let i = 0; i < singles.length; i++) {
                let element = singles[i]
                row.innerHTML += `<div class="col">
                    <div class="card">
                        <img src="${element.album.cover_xl}" class="card-img-top  w-100">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">Artist: ${element.artist.name}</p>
                            <p class="card-text">Album: ${element.album.title}</p>
                         </div>
                    </div>
                </div>`
            }

        })
        .catch((err) => console.log(err));
    document.querySelector("#searchField").value = ""
}

// creazione pulsante "crea Lista"

let li = document.createElement("li")
li.innerHTML = `<!-- Button trigger modal -->
                <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="creaLista">
                    Crea Lista
                </button>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content bg-dark text-white">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-light" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>`

document.querySelector(".navbar-nav ul").appendChild(li)

document.querySelector("#creaLista").addEventListener("click", () => {

    query = document.querySelector("#searchField").value;   // prende valore da input ricerca
    console.log(query);

    search ()               // avvia funzione per caricare le card nello sfondo, che apparirebbero solo cliccando su button go

    let title = document.querySelector(".modal-title")      // prende titolo modale, lo svuota e lo ripopola con nome artista
    title.innerText = ""
    title.innerText = query

    let lista = document.querySelector(".modal-body")       // prende body modale e lo svuota
    lista.innerHTML = ""


    //fetch
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query)
        .then((raw) => raw.json())
        .then((res) => {

            let singles = res.data;
            console.log(singles);

            let albumETitolo = []               // dichiara array vuoto

            for (let i = 0; i < singles.length; i++) {
                let element = singles[i]
                let info = {}                   // dichiara oggetto vuoto e salva dentro album e titolo
                info.Album = element.album.title
                info.Title = element.title
                albumETitolo.push(info)         // salva oggetto dentro ad array
            }
            console.log(albumETitolo)

            // cicla array albumETitolo e stampa nel modale lista con titolo e canzone 
            for (let i = 0; i < albumETitolo.length; i++) {
                lista.innerHTML += `<h5 class="text-danger">${albumETitolo[i].Title}</h5>
                                    <p>${albumETitolo[i].Album}</p>`
            }
        })
        .catch((err) => console.log(err));
    document.querySelector("#searchField").value = ""
})