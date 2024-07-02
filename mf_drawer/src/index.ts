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

  if (document.body.className === 'favs') {
    favsButton.style.backgroundColor = '#42a5f6';
    favsButton.style.color = '#fff';
    videosButton.style.backgroundColor = '#fff';
    videosButton.style.color = '#42a5f6';

    videosButton.addEventListener('mouseover', () => {
      videosButton.style.backgroundColor = '#007aff';
      videosButton.style.color = '#fff';
    });

    videosButton.addEventListener('mouseout', () => {
      videosButton.style.backgroundColor = '#fff';
      videosButton.style.color = '#42a5f6';
    });

    favsButton.addEventListener('mouseover', () => {
      favsButton.style.backgroundColor = '#007aff';
      favsButton.style.color = '#fff';
    });

    favsButton.addEventListener('mouseout', () => {
      favsButton.style.backgroundColor = '#42a5f6';
      favsButton.style.color = '#fff';
    });
}


}


// const fetchFavorites = async (): Promise<number> => {
//   try {
//       const response = await fetch('http://localhost:3000/storage/favorites');
//       if (!response.ok) {
//           throw new Error('Failed to fetch favorites');
//       }
//       const data = await response.json();
//       return data.length; // Assuming data is an array and we want the length
//   } catch (error) {
//       console.error('Error fetching favorites:', error);
//       return 0; // Default to 0 if fetch fails
//   }
// }

//  async function updateStarText() {
//   const favoritesCount = await fetchFavorites();
//   const starComponent = document.querySelector('star-component');
//   if (starComponent) {
//       starComponent.setAttribute('star-text', `${favoritesCount}`);
//   }
// }


const fetchFavorites = async (): Promise<number> => {
  try {
      const response = await fetch('http://localhost:3000/storage/favorites');
      if (!response.ok) {
          throw new Error('Failed to fetch favorites');
      }
      const data = await response.json();
      return data.length; 
  } catch (error) {
      console.error('Error fetching favorites:', error);
      return 0; 
  }
};

async function updateStarText() {
  const favoritesCount = await fetchFavorites();
  const starComponent = document.querySelector('star-component');
  if (starComponent) {
      starComponent.setAttribute('star-text', `${favoritesCount}`);
  }
}

window.addEventListener('message', (event) => {
  if (event.origin !== 'http://localhost:3000') {
      return;
  }
  console.log('message recieved: ', event.data);
  updateStarText();

})

updateStarText()



