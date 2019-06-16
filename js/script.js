function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars
}

function listPokemons() {
  const {
    page,
    order
  } = getUrlVars();

  axios.get('https://pokeapi.co/api/v2/pokemon/', {
      params: {
        limit: 20,
        offset: (page || 0) * 20
      }
    })
    .then(function (response) {
      renderPokemon(response.data.results);
      getPagesNumber(response.data.count, page || 0);
    })
}

async function renderPokemon(pokemons) {
  for (poke of pokemons) {

    const response = await axios.get(poke.url)

    // base materializze
    var colElement = document.createElement("div");
    colElement.setAttribute('class', 'col m3');

    // card div
    var cardElement = document.createElement("div");
    cardElement.setAttribute('class', 'card');
    colElement.appendChild(cardElement)


    // imagem do pokemon
    var cardImageElement = document.createElement("div");
    cardImageElement.setAttribute('class', 'card-image');
    cardElement.appendChild(cardImageElement)

    var cardImage = document.createElement("IMG");
    cardImage.setAttribute("src", response.data.sprites.front_default);
    cardImageElement.appendChild(cardImage)


    // nome do pokemon
    var titleElement = document.createElement("span")
    titleElement.setAttribute('class', 'card-title')
    cardImageElement.appendChild(titleElement)

    var titleText = document.createTextNode(poke.name)
    titleElement.appendChild(titleText)


    // descrição do pokemon
    var descElement = document.createElement("ul");
    descElement.setAttribute('class', 'collapsible');
    cardElement.appendChild(descElement)

    var descItem = document.createElement("li")
    descElement.appendChild(descItem)

    var descTitle = document.createElement("div")
    descTitle.setAttribute("class", "collapsible-header")
    descItem.appendChild(descTitle)

    var descIcon = document.createElement("i")
    descIcon.setAttribute("class", "material-icons")
    descIcon.innerHTML = "info";
    descTitle.appendChild(descIcon)

    var descTitleText = document.createTextNode("Info")
    descTitle.appendChild(descTitleText)

    var descBody = document.createElement("div")
    descBody.setAttribute("class", "collapsible-body")
    descItem.appendChild(descBody)

    var descBodyContent = document.createElement("ul")
    descBodyContent.setAttribute("class", "collection with-header")
    descBody.appendChild(descBodyContent)

    var descHeader = document.createElement("li")
    descHeader.setAttribute("class", "collection-header")
    descHeader.innerHTML = "Stats"
    descBodyContent.appendChild(descHeader)

    for (index = 0; index < response.data.stats.length; ++index) {
      var descContent = document.createElement("li")
      descContent.setAttribute("class", "collection-item")

      var statTitle = document.createTextNode(response.data.stats[index].stat.name)
      descContent.appendChild(statTitle)

      var statDiv = document.createElement("div")
      statDiv.setAttribute("class", "right")

      var statValue = document.createTextNode(response.data.stats[index].base_stat)
      statDiv.appendChild(statValue)


      descContent.appendChild(statDiv)

      descBodyContent.appendChild(descContent)
    }

    document.getElementById("pokemons").appendChild(colElement);
    M.AutoInit();
  }
}

async function renderPages(pages) {
  const {
    page
  } = getUrlVars()
  const pageId = document.querySelector("pages")


  var pageElement = document.createElement("li")
  pageElement.setAttribute("data-pageid", pages)
  pageElement.setAttribute("class", "waves-effect")

  var pageLink = document.createElement("a")
  pageLink.setAttribute("href", "file:///Z:/bennymon/index.html?page=" + pages)
  pageElement.appendChild(pageLink)

  var pageItemId = document.createTextNode(pages)
  pageLink.appendChild(pageItemId)

  pageId.appendChild(pageElement)

  var liactive = document.querySelector(`li[data-pageid='${page}']`)
  liactive.setAttribute('class', 'active')
}

function getPagesNumber(count, page) {
  var pagesNumber = count / 20

  page = parseInt(page)

  for (let i = Math.max(0, page - 2); i < Math.min(pagesNumber, page + 5); i++) {
    renderPages(i)

  }
}



// materialize

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    toolbarEnabled: true
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems, options);
});