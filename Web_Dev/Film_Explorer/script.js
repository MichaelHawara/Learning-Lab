const APILINK = 'https://api.themoviedb.org/3/discover/movie?';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=17d988526afadaa191af7d9c64320000&query=";
const APIKEY = "api_key=17d988526afadaa191af7d9c64320000";

const main = document.getElementById("section")
const form = document.getElementById("form")
const search = document.getElementById("query")

function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(function (data) {
            data.results.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');

                const div_row = document.createElement('div');
                div_row.setAttribute('class', 'row');

                const div_column = document.createElement('div');
                div_column.setAttribute('class', 'column');

                const div_center = document.createElement('div');
                div_center.setAttribute('class', 'center');

                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.setAttribute('id', 'image');

                const title = document.createElement('h3');
                title.setAttribute('id', 'title');

                title.innerHTML = `${element.title}`;
                image.src = IMG_PATH + element.poster_path;
                if (!element.poster_path) {
                    return;
                }

                div_center.appendChild(image);
                div_card.appendChild(div_center);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);

                main.appendChild(div_row)

            });
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;

    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }
});

const categories = {
    popular: "popular",
    top_rated: "top_rated",
    upcoming: "upcoming",
    genres: {
        action: "action",
        adventure: "adventure",
        animation: "animation",
        comedy: "comedy",
        crime: "crime",
        documentary: "documentary",
        drama: "drama",
        family: "family",
        fantasy: "fantasy",
        history: "history",
        horror: "horror",
        music: "music",
        mystery: "mystery",
        romance: "romance",
        science_fiction: "science_fiction",
        tv_movie: "tv_movie",
        thriller: "thriller",
        war: "war",
        western: "western"
    }
};

Object.keys(categories).forEach((category) => {
    document.getElementById(category).addEventListener("click", (e) => {
        e.preventDefault();
        let page = 1;
        main.innerHTML = '';
        let with_genres = '';
        let sort_by = 'popularity';
        if (category === "popular") {
            sort_by = 'popularity';
        }
        else if (category === "top_rated") {
            sort_by = 'vote_average';
        }
        else if (category === "upcoming") {
            sort_by = 'release_date';
        }
        url = `${APILINK}page=${page}&sort_by=${sort_by}.desc&${with_genres}&${APIKEY}`;
        returnMovies(url);
        pageButtons(url);
    });
});

// Add event listeners to genre links
document.querySelectorAll('#genres a').forEach((genreLink) => {
    genreLink.addEventListener("click", (e) => {
        e.preventDefault();
        main.innerHTML = '';
        const with_genres = `with_genres=${genreLink.getAttribute('data-category')}&`;
        let url = `${APILINK}page=${page}&sort_by=${sort_by}.desc&${with_genres}&${APIKEY}`;
        returnMovies(url);
        pageButtons(url);
    });
});

function pageButtons(url) {
    document.getElementById("pageButtons").addEventListener("click", (e) => {
        const regex = /page=(\d+)/;
        const match = url.match(regex);

        let page = parseInt(match[1]);
        if (e.target.id === "prevButton" && page > 1) {
            page--;
        }
        else if (e.target.id === "nextButton") {
            page++;
        }
        main.innerHTML = '';
        let newUrl = url.replace(regex, `page=${page}`);
        returnMovies(newUrl);
    });
}

// On Startup
returnMovies(APILINK + APIKEY);