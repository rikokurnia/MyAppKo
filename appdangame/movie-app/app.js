let movieNameRef = document.querySelector('#movie-name');
let searchBtn = document.getElementById('search-btn');
let result = document.getElementById('result')


//function to fetch data from API
let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=99460c04`;
 //if input field is empty
        if(movieName.length <= 0) {
            result.innerHTML = `<h3 class='msg'>Please Enter A movie Name</h3>`
        }
    //if input field is NOT empty
        else {
            fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                    //if movie exist in database
                        if(data.Response == 'True'){
                            result.innerHTML= `
                            <div class="info">
                                <img src=${data.Poster} class="poster">
                                <div>
                                    <h2>${data.Title}</h2>
                                    <div class="rating">
                                    <img width="16" height="20" src="https://img.icons8.com/fluency/48/star.png" alt="star"/>                      
                                      <h4>${data.imdbRating}</h4>
                                    </div>
                                    <div class="details">
                                        <span>${data.Rated}</span>
                                        <span>${data.Year}</span>
                                        <span>${data.Runtime}</span>
                                    </div>
                                    <div class="genre">
                                        <div>${data.Genre.split(',').join("</div><div>")}</div>
                                    </div>
                                </div>
                            </div>
                            <h3>Plot:</h3>
                            <p>${data.Plot}</p>
                            <h3>Cast:</h3>
                            <p>${data.Actors}</p>
                                `;
                        }
                    //If movie does'nt exist in database
                        else{
                            result.innerHTML = `<h3 class="msg">${data.Error}</h3>`
                        }
            })
            //if occurs error
                .catch(() => {
                    result.innerHTML= `<h3 class="msg">Error Occured</h3>`
                })
        }
}

searchBtn.addEventListener('click', getMovie)
window.addEventListener('load', getMovie)