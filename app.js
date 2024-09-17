
const characterList = document.getElementById('character-list');
const selectElement = document.querySelector(".filters");
const result = document.querySelector(".character-list");
const loading = document.querySelector(".loading");

function getApiUrl(type) {
  const apiUrls = {
    'all': 'https://ihatov08.github.io/kimetsu_api/api/all.json',
    'hashira': 'https://ihatov08.github.io/kimetsu_api/api/hashira.json',
    'oni': 'https://ihatov08.github.io/kimetsu_api/api/oni.json',
    'kisatsutai': 'https://ihatov08.github.io/kimetsu_api/api/kisatsutai.json'
  };
  return apiUrls[type];
}

// APIからデータを取得
async function fetchAllCharacters(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if(!response.ok) throw new Error('APIの取得に失敗しました。')
    return await response.json();
  } catch(error) {
    loading.style.display = 'none';
    result.innerHTML = `<p>データの取得に失敗しました。</p>`;
    console.error(error);
    return null;
  }
}

async function displayCharacters(type) {
  const apiUrl = getApiUrl(type);
  const fetchCharacter = await fetchAllCharacters(apiUrl);
  
  if(fetchCharacter) {
    renderCharacters(fetchCharacter);
  }
}

async function renderCharacters(characters) {
  const url = 'https://ihatov08.github.io/';
  result.innerHTML = '';
  // ローディング表示
  loading.style.display = 'block';

  // キャラクター表示
  for (const ch of characters) {
    const characterDiv = document.createElement('div');
    characterDiv.classList.add('character-item');
    characterDiv.innerHTML = `
      <h3>${ch.name}</h3>
      <img src="${url + ch.image}" alt="${ch.name}">
      <p>カテゴリ：${ch.category}</p>
    `;
    result.appendChild(characterDiv);
  }

  // ローディングを非表示
  loading.style.display = 'none';
}

// デフォルトですべてのキャラクターを表示
(async function() {
  await displayCharacters('all');
})();

// ラジオボタンのchangeイベント
selectElement.addEventListener("change", (event) => {
  const selectedType = event.target.value;
  displayCharacters(selectedType);
});
