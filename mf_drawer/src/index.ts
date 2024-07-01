const videosButton = document.getElementById('videos-link') as HTMLAnchorElement;
const favsButton = document.getElementById('favs-link') as HTMLAnchorElement;

videosButton!.addEventListener('click', (event) => {
  event.preventDefault()
  top!.window.location.href = 'http://localhost:3000/videos'
});

favsButton!.addEventListener('click', (event) => {
  event.preventDefault()
  top!.window.location.href = 'http://localhost:3000/favs'
});


const getModeParameter = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('mode');
}

window.onload = () => {
  const mode = getModeParameter();
  document.body.className = ''
  document.body.classList.add(mode!);
}

