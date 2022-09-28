const movies = JSON.parse(localStorage.getItem('movies')); // visas filmas
const div_movies = document.getElementById('movies');
var i = 0;
movies.forEach((movie,movie_index) => {
    i++;
   div_movies.insertAdjacentHTML("beforeend", "<span class='poster' ><a href='film.html?id=" + movie_index + "'><img height='330' src= './poster/"+ movies[movie_index].at(3)+ "' alt='Poster'><h5>" + movies[movie_index].at(2) + "</h5></a></span>");
    if (i == 3){ // pēc 3 filmām jauna rinda
        div_movies.insertAdjacentHTML("beforeend", "<br>");
        i = 0;
    }
});