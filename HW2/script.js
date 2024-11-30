// https://striveschool-api.herokuapp.com/api/deezer/search?q=INSERISCIQUIUNAQUERY

// esempio: https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem



let search = (query, id) => {

    query = document.querySelector("#searchField").value;   // prende valore da input ricerca
    console.log(query);

    let section = document.querySelector(`#found`);     //seleziona la sezione dell'artista
    let row = section.querySelector(`#searchSection`);  //seleziona la riga dell'artista
    row.innerHTML = ""
    let title = document.querySelector(`#found h2`)     // seleziona titolo e aggiunge nome artista ricercato
    title.innerText = ""
    title.innerText += `Search results for ${query}`
    console.log(title);

    //fetch
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query)
        .then((raw) => raw.json())
        .then((res) => {

            let singles = res.data;
            console.log(singles);
            section.classList.remove("d-none");

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
