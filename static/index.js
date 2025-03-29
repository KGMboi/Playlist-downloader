
const client_id = "8990dec5bcb04b5ca5ca645f5d97b0c2"
const client_secret = "8597d095699444ba8dcdfa9821cbf0e1"


let acces_token = ""


document.addEventListener("DOMContentLoaded", async () => {
    
    const authHeader = btoa(`${client_id}:${client_secret}`)

    const promesa = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });
  

    let response = await promesa.json()

    console.log(response)
    acces_token = response



})
async function searchPlaylist() {
    let username = document.getElementById('username').value

    const promesa = await fetch(`https://api.spotify.com/v1/users/${username}/playlists`, {
        headers: { "Authorization": `Bearer ${acces_token.access_token}` },
      });

    let playlists = await promesa.json()

    console.log(playlists)
    let display = document.getElementById('display')
    

    
    for(let playlist of playlists.items) {

        let innerDisplay = document.createElement('div')
        innerDisplay.innerHTML = `<img src="${playlist.images[0].url}" alt="">
        <h1>${playlist.name} ${playlist.owner}</h1>
        <p>${playlist.external_urls.spotify}</p>
        <p>Tracks: ${playlist.tracks.total} </p>`


        display.appendChild(innerDisplay)
    };

    
    console.log(respuesta)
}