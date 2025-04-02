
const client_id = "8990dec5bcb04b5ca5ca645f5d97b0c2"
const client_secret = "8597d095699444ba8dcdfa9821cbf0e1"


let acces_token = ""


let catGifs;


document.addEventListener("DOMContentLoaded", async () => {

  const authHeader = btoa(`${client_id}:${client_secret}`)

  catGifs = await getCatGif()

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
  console.log("juan")
  acces_token = response

  console.log(catGifs)

})
async function searchPlaylist() {
  let username = document.getElementById('username').value
  let displayy = document.getElementById('display')
  displayy.innerHTML = ""

  const promesa = await fetch(`https://api.spotify.com/v1/users/${username}/playlists`, {
    headers: { "Authorization": `Bearer ${acces_token.access_token}` },
  });

  let playlists = await promesa.json()


  console.log(playlists)
  let display = document.getElementById('display')

  if (playlists == null || playlists.items.length == 0) {
    display.innerHTML = "<h2>No hay playlists</h2>"
  }
  else {
    for (let playlist of playlists.items) {

      let innerDisplay = document.createElement('div')
      innerDisplay.innerHTML =
        `<img src="${playlist.images[0].url}" alt="">
        <h2>${playlist.name} </h2>  
        <p >${playlist.description}</>
        <p hidden id="url">${playlist.external_urls.spotify}</p>
        <p>Tracks: ${playlist.tracks.total} </p>
        <button onclick="downloadPlaylist('${playlist.external_urls.spotify}','${playlist.name}')">Download</button>`

      display.appendChild(innerDisplay)
    };
  }

  // console.log(respuesta)
}

async function downloadPlaylist(url, name) {
  //obtenemos el link

  let data = { url: url, name: name }
  console.log(data)
  var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {
    backdrop: 'static', // Disable closing the modal by clicking outside
    keyboard: false      // Disable closing the modal with the keyboard's escape key
  });
  myModal.show();
  document.getElementById('catDisplay').src = catGifs



  let loading = true;
  let interval = setInterval(() => {
    if (loading) {
      console.log("Loading...")
    }; // This action happens while waiting
  }, 1000);

  let promesa = await fetch("/download_playlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })


  let response = await promesa.blob()


  loading = false;
  clearInterval(interval);
  myModal.hide()

  let blobUrl = window.URL.createObjectURL(response)

  let link = document.createElement("a")
  link.href = blobUrl
  link.download = `${name}.zip`
  document.body.appendChild(link)

  link.click()

  window.URL.revokeObjectURL(blobUrl); // Free memory
  document.body.removeChild(link); // Remove the link
}

// This function fetches a random cat image from The Cat API
async function getCatGif() {
  const response = await fetch('https://api.thecatapi.com/v1/images/search?mime_types=gif', {
    headers: { 'x-api-key': 'live_Px5Vg1InHEcAQhOUKc2eTNN3GeiLdsKYp9I9nYEu9u2f4k7wzh1cCCJ48iYTawVj' }
  });
  const data = await response.json();

  console.log(data)
  return data[0].url;
}