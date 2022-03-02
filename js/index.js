const URL_PATH = "https://api.themoviedb.org"
const API_KEY = "bcdc048eb2b6e00a0b02f4f5dcb896dc";

document.addEventListener("DOMContentLoaded",  () =>{
    renderNewsMovies();
    renderListMovies('popular','now-playing__list')
    renderListMovies('top_rated','top-rated-playing__list')
});

const getMovies = (type) =>{
    const url = `${URL_PATH}/3/movie/${type}?api_key=${API_KEY}&language=es-MX&page=1`;

   return fetch(url)
        .then(response => response.json())
        .then(result => result.results)
        .catch(error => console.log(error))
}

const renderNewsMovies = async () =>{
    const newMovies = await getMovies('now_playing');

    let html = "";

    newMovies.forEach((movie, index) => {
        const {id, title, overview,backdrop_path} = movie;
        const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
        const urlMovie = `../movie.html?id=${id}`;
       html += `
            <div class="carousel-item ${index === 0 ? "active" : null}" style="background-image: url(${urlImage})">
                <div class="carousel-caption">
                    <h5>${title}</h5>
                    <p>${overview}</p>
                    <a href="${urlMovie}" class="btn btn-primary">Más Informacion</a>
                </div>
            </div>
       `; 
    });

    html += `
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-news-movies" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-news-movies" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Siguiente</span>
        </button>
    `
    document.getElementsByClassName('list-news-movies')[0].innerHTML = html;
}

const renderListMovies = async (type, classLoc) => {
    const movies = await getMovies(type);

    let html = "";
    movies.forEach((movie, index) => {
    const {id, title, poster_path} = movie;
    const movieCover = `https://image.tmdb.org/t/p/w500${poster_path}`
    const urlMovie = `../movie.html?id=${id}`;

    if(index < 5){
        html+= `
        <li class="list-group-item">
            <img src="${movieCover}" alt="${title}">
            <h3>${title}</h3>
            <a href="${urlMovie}" class="btn btn-primary">Ver más</a>
        </li>
        `;
    }

    document.getElementsByClassName(classLoc)[0].innerHTML = html;
    });
}
