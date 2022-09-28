function create_movie_list(){ // active, movie_price, movie_name, poster_img, movie_cast, movie_desc, Youtube
    var movies = [];
    movies.push([1,10,"Minions","minions.jpg","Steve Carell ... Gru (voice)","The untold story of one twelve-year-old's dream to become the world's greatest supervillain.","6DxjJzmYsXo"]);
    movies.push([1,12,"The Batman","batman.jpg","Robert Pattinson	...	Bruce Wayne / The Batma","When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.","mqqft2x_Aa4"]);
    movies.push([1,8,"Naked Gun 33 1/3: The Final Insult","naked_gun.jpg","Leslie Nielsen	...	Lt. Frank Drebin","Frank Drebin (Leslie Nielsen) comes out of retirement to help Police Squad infiltrate a gang of terrorists planning to detonate a bomb at the Academy Awards.","SQaULBUqxMs"]);
    movies.push([1,14,"Fifty Shades of Grey","50.jpg","Dakota Johnson	...	Anastasia Steele","Literature student Anastasia Steele's life changes forever when she meets handsome, yet tormented, billionaire Christian Grey.","SfZWFDs0LxA"]);
    movies.push([1,9,"Dumb and Dumber To","dumb.jpg","Jim Carrey	...	Lloyd","20 years since their first adventure, Lloyd and Harry go on a road trip to find Harry's newly discovered daughter, who was given up for adoption.","dmNddThxi4c"]);
    movies.push([1,11,"The Hangover","hangover.jpg","Bradley Cooper	...	Phil","Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.","tcdUhdOlz9M"]);
    movies.push([1,7,"Saw","saw.jpg","Leigh Whannell	...	Adam Faulkner-Stanheight","Two strangers awaken in a room with no recollection of how they got there, and soon discover they're pawns in a deadly game perpetrated by a notorious serial killer.","OCZp5v8V-94"]);

    localStorage.setItem('movies', JSON.stringify(movies));
    console.log('movies');
    console.log(movies);
};

const movies = JSON.parse(localStorage.getItem('movies')); // visas filmas
const div_movies = document.getElementById('movies');
var i = 0;
movies.forEach((movie,movie_index) => {
    i++;
   div_movies.insertAdjacentHTML("beforeend", "<span class='poster' ><a href='back_movie.html?id=" + movie_index + "'><img height='330' src= './poster/"+ movies[movie_index].at(3)+ "' alt='Poster'><h5>" + movies[movie_index].at(2) + "</h5></a></span>");
    if (i == 3){ // pēc 3 filmām jauna rinda
        div_movies.insertAdjacentHTML("beforeend", "<br>");
        i = 0;
    }
});