const URL_MOVIES = "https://japceibal.github.io/japflix_api/movies-data.json";
const btnBuscar = document.getElementById("btnBuscar");
const lista = document.getElementById("lista");

let movies = [];

// Obtener las películas y almacenarlas en el array movies
function moviesData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            movies = data;
            console.log(movies);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// Agrega la info de las películas al html
function showMovies(array) {
    lista.innerHTML = "";

    array.forEach((movie, index) => {
        let stars = "";
        let vote = Math.round(movie.vote_average / 2) // Se divide el vote_average y Math.round() redondea al número entero más cercano.

        // Bucle que genera 5 estrellas. Dependiendo de la calificación se llenan (checked) o se dejan vacías (unchecked)
        for (let i = 0; i < 5; i++) {
            if (i < vote) {
                stars += `<i class="fa fa-star checked" aria-hidden="true"></i>`;
            } else {
                stars += `<i class="fa fa-star unchecked" aria-hidden="true"></i>`;
            }
        }

        let offcanvasId = `offcanvasTop_${index}`; // Asigna un ID único para cada offcanvas

        let releaseDate = new Date(movie.release_date); // Convierte la fecha de lanzamiento en un objeto Date de JS
        let releaseYear = releaseDate.getFullYear(); // getFullYear obtiene solo el año del objeto Date

        lista.innerHTML += `

            <li class="row" data-bs-toggle="offcanvas" data-bs-target="#${offcanvasId}" aria-controls="${offcanvasId}">
    
                <div class="col-10">
                    <h4><strong> ${movie.title} </strong></h4>
                    <p> ${movie.tagline} </p>
                </div>
                <div class="stars col-2">${stars}</div>

            </li>

            <div class="offcanvas offcanvas-top" tabindex="-1" id="${offcanvasId}" aria-labelledby="${offcanvasId}Label">
                
                <div class="offcanvas-header">
                    <h4 class="offcanvas-title" id="${offcanvasId}Label"> ${movie.title} </h4>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div class="offcanvas-body"> 
                    <P id="overview">${movie.overview}</p>
                    <hr>

                    <div class="row"> 
                        <p class="col-11"> ${movie.genres.map(genre => genre.name).join(' - ')}</p> 

                        <div class="dropdown col-1">
                            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside"> More </button>
                            <ul class="dropdown-menu more-menu">
                                <li class="dropdown-item">Year: ${releaseYear}</li>
                                <li class="dropdown-item">Runtime: ${movie.runtime} mins</li>
                                <li class="dropdown-item">Budget: $${movie.budget}</li>
                                <li class="dropdown-item">Revenue: $${movie.revenue}</li>
                            </ul>
                        </div>

                    </div>
                        
                </div> 

            </div>    
        `; 
    });
    // Linea 66: join selecciona el nombre de cada elemento del array movie.genres y los une con guiones
}


// Función para buscar las películas y mostrarlas
function searchMovie() {

    btnBuscar.addEventListener("click", function () {
        const input = document.getElementById("inputBuscar").value.toLowerCase();

        if (input!=""){
            let filteredMovies = movies.filter(movie => {
                return movie.title.toLowerCase().includes(input) ||
                    movie.tagline.toLowerCase().includes(input) ||
                    movie.overview.toLowerCase().includes(input) ||
                    movie.genres.some(genre => genre.name.toLowerCase().includes(input)); //some verifica si algun elemento del array cumple la condición
            });
        showMovies(filteredMovies); // Mostrar las películas filtradas
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    moviesData(URL_MOVIES); // Obtener las películas sin mostrarlas
    searchMovie();
});