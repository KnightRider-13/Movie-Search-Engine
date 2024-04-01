const movieContainer = document.querySelector(".movies__container");
const buttonHeader = document.querySelector(".header__button");
const movieResults = document.querySelector(".movies__results--container");
const movieKeyword = document.querySelector(".movie__keyword");
const inputBox = document.querySelector(".header__input");
let movies = [];

function movieSearch(e) {
    e.preventDefault();
    let keyword = (e.target.firstElementChild.value);
    movieKeyword.innerHTML = `"` + keyword + `"`;
    main(keyword);
}

function filterMovies(event){
    let filter = event.target.value;
    filteringMovies(movies, filter);
    }

function filteringMovies(movies, filter){
    if(filter === "NEW_TO_OLD"){
        movies.sort((a, b) => (b.Year - a.Year));
    }
        else if(filter === "OLD_TO_NEW"){
        movies.sort((a, b) => (a.Year - b.Year));
        }
        movieContainer.innerHTML = movies.map(movie => movieHtml(movie)).join("");
}

async function main(keyword){
    const promise = await fetch(`http://www.omdbapi.com/?apikey=af3cb781&s=${keyword}`);
    const moviesData = await promise.json();
    movies = moviesData.Search.slice(0, 6);
    filteringMovies(movies, filter);
    if(movies){
        movieContainer.innerHTML = movies.map(movie => movieHtml(movie)).join("");
    }
    else{
        movieContainer.classList += " no-movies";
        movieContainer.innerHTML = "<h3>No Movies Found</h3>";
    }
}
main();
    
function toggleMoviesLoading(){
    buttonHeader.classList += " movies__loading";
    movieResults.classList += " movies__loading";
    document.body.classList += " movies__loaded";
    setTimeout(() => {
        buttonHeader.classList.remove("movies__loading");
        window.location.href = "#movies";
    }, 2000)
}

function movieHtml(movie){
    return `<div class="movies">
    <figure class="movies__img-wrapper">
        <img src="${movie.Poster}" class="movies__img">
    </figure>
    <h3 class="movie__title">${movie.Title}</h3>
    <h4 class="movie__year">${movie.Year}</h4>
</div>`
}

function contact(){
    alert("This function is temporarily unavailable");
}

