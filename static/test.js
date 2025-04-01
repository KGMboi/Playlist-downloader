
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
        <h2>${playlist.name} ${playlist.owner}</h2>
        <p id="url">${playlist.external_urls.spotify}</p>
        <p>Tracks: ${playlist.tracks.total} </p>
        <button onclick="">Download</button>`



      display.appendChild(innerDisplay)
    };
  }

  // console.log(respuesta)
}

async function downloadPlaylist(url, name) {
  //obtenemos el link

  let data = { url: url, name: name }
  console.log(data)
  let promesa = await fetch("/download_playlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })


  let response = await promesa.blob()

  let blobUrl = window.URL.createObjectURL(response)

  let link = document.createElement("a")
  link.href = blobUrl
  link.download = `${name}.zip`
  document.body.appendChild(link)

  link.click()

  window.URL.revokeObjectURL(blobUrl); // Free memory
  document.body.removeChild(link); // Remove the link



}


