export default {

  async renderBaseTemplate(): Promise<void> {
    const html = `
    <div class="wrapper">
      <header class="header">

        <h1 id="invisible" class = "invisible">English for kids</h1>

        <nav id="burger-menu" class="burger-menu green">
          <a href id="burger-menu_button" class="burger-menu_button">
            <span class="burger-menu_lines"></span>
          </a>
          <ul id="burger-links" class="burger-links green">
          </ul>
        </nav>

        <div class="switch-container" id="switch-container">
          <label for="switch-input" class="switch">
            <input
              id = "switch-input"
              class="switch-input"
              type="checkbox"
              checked
            >
            <span id="switch-label" class="switch-label" data-on="train" data-off="play"></span>
            <span id="switch-handle" class="switch-handle"></span>
          </label>
        </div>
      </header>
      <div id="main-container" class="main-container">
        <div id="rating" class="rating none"> </div>
        
        ТУТ БУДУТ КАРТОЧКИ
        <br>
        ДО КОНЦА КРОССЧЕКА ПОСТАРАЮСЬ ДОДЕЛАТЬ ФУНКЦИОНАЛ

      </div>
      <footer class="footer">
        <a href="https://rs.school/js/" "rsschool-href"> 
          <img class="rsschool-logo" src="./assets/resource/control-img/rs_school_js.svg" alt="School logo">
        </a>
        <a href="https://github.com/drunich-z/" target="_blank"> 
            <img class="github-logo" src="./assets/resource/control-img/github-logo.png" alt="Git logo">
        </a>
        <div id="student" class="student">
          drunich-z, 2021
        </div>

      </footer>
      <div id="cover" class="cover hidden"></div>
    </div>
    `;
    const body = document.getElementById('body') as HTMLElement;
    body.innerHTML = html;
  },

  renderBurger(categories: Category[], authorized = false): string {
    const categoriesCount = categories.length;
    let result = '';
    result = `<a id="burger-link-main" href="#main" class="burger-link 
      ${authorized ? '' : 'burger-link_active'}" data-type="main">MAIN</a>
    `;
    for (let i = 0; i < categoriesCount; i++) {
      result += `<a id="burger-link-${categories[i].id}" href="#category"`
      + `class="burger-link" data-type="category" data-id="${categories[i].id}"`
      + `data-link="${categories[i].name}">${categories[i].name}</a>`;
    }
    result += '<a href="#statistics" class="burger-link" data-type="statistics" data-link="statistics">STATISTICS</a>';
    result += `<a id="burger-link-login" href="#login" class="burger-link burger-link-login 
      ${authorized ? 'hidden' : ''}" data-type="login" data-link="login">LOGIN</a>
    `;
    result += `<a id="burger-link-logout" href="#logout" class="burger-link burger-link-logout 
      ${authorized ? '' : 'hidden'}" data-type="logout" data-link="logout">LOGOUT</a>
    `;
    result += `<a id="burger-link-admin" href="#admin"class="burger-link burger-link-admin 
      ${authorized ? '' : 'hidden'}" data-type="admin" data-link="admin">ADMIN PANEL</a>
    `;
    result += `<a id="burger-link-reset" href="#" class="burger-link burger-link-reset
      ${authorized ? '' : 'hidden'}" data-type="reset" data-link="reset">RESET TO INITIAL STATE</a>
    `;

    return result;
  },

  renderCardsForGameCardsPage(cards: CardLocal[], mode: ApplicationMode = 'train'): string {
    const none = mode === 'train' ? '' : 'none';
    const cardCover = mode === 'train' ? '' : 'card-cover';
    let result = '<div id="rating" class="rating none"></div>';
    for (let i = 0; i < cards.length; i++) {
      result += `
        <div class="card-container">
          <div id="card-${cards[i].word}" 
               class="card ${cardCover}" 
               data-word=${cards[i].word}
               data-audiosrc=${cards[i].audio}>
            <div class="front" style="background-image: url('${cards[i].image}')">
              <div class="card-header ${none}">${cards[i].word}</div>

            </div>
            <div class="back ${none}" style="background-image: url('${cards[i].image}')">
              <div class="card-header ${none}">${cards[i].translation}</div>
            </div>
            <div class="rotate ${none}" 
                 style="background-image: url('./assets/resource/control-img/rotate.svg')"
                 data-word="${cards[i].word}">
            </div>
          </div>
        </div>
      `;
    }
    result += `
      <div id="btns" class="btns"> 
        <button id="button-start" 
                class="btn ${mode === 'train' ? 'none' : ''}"> 
          Start game
        </button>
              
      </div>
      `;
    return result;
  },

  renderCardsForMainCategoryPage(cards: CardCategory[], mode: ApplicationMode = 'train'): string {
    const green = mode === 'train' ? 'green' : '';
    let result = '';
    for (let i = 0; i < cards.length; i++) {
      result += `
      <a href="#category" class="main-card ${green}" 
                          data-category="${cards[i].name}" 
                          data-id="${cards[i].id}">
        <img src="${cards[i].image}" alt="category-picture" class="pict">
        ${cards[i].name}
      </a>
      `;
    }
    return result;
  },

  renderCardsForAdminCategoryPage(cards: CardCategory[]): string {
    let result = '';
    for (let i = 0; i < cards.length; i++) {
      result += `
      <div id="admin-category-card-${cards[i].id}" class="admin-category-card" data-id="${cards[i].id}">
        <div class="input-category-container">
          <label id="label-word" for="input-category"></label>
          <input id="input-category-${cards[i].id}" 
                 name="category-${cards[i].id}" 
                 type="text" 
                 class="input-category" 
                 value="${cards[i].name}" >
        </div>
        <a href="#" class="category-words" data-id="${cards[i].id}">words: ${cards[i].words}</a>
        <div class="category-btn-container">
          <button id="btnCatUpd-${cards[i].id}"
                  class="btn-update-category   
                  category-btn" data-id="${cards[i].id}">Update</button>
          <button id="btnCatSave-${cards[i].id}"
                  class="btn-save-category   
                  category-btn hidden" data-id="${cards[i].id}">Save</button>
          <button class="btn-add-word-category 
                  category-btn" data-id="${cards[i].id}">Add word</button>
          <button class="btn-delete-category 
                  category-btn" data-id="${cards[i].id}">Delete</button>
        </div>
      </div>
      `;
    }
    result += `
      <div class="admin-category-card">
        <h3>Create new category</h3>
        <img class="new-category" src="./assets/resource/control-img/plus.png" alt="new category">
      </div>
    `;
    return result;
  },

  renderCardsForAdminCardsCategoryPage(cards: CardLocal[]): string {
    let result = '';
    for (let i = 0; i < cards.length; i++) {
      result += `
      <div id="admin-word-card-${cards[i].word}" class="admin-card" data-word="${cards[i].word}">
        <div class="card-row">
          <label id="label-word" for="input-word">word:</label>
          <input name="word" 
                 id="input-word-${cards[i].word}"
                 data-word="${cards[i].word}"
                 value="${cards[i].word}" 
                 type="text" class="input-word" disabled>
        </div>
        <div class="card-row">
          <label id="label-translation" for="input-translation">translation:</label>
          <input name="translation" 
                 id="input-translation${cards[i].word}"
                 data-word="${cards[i].word}"
                 value="${cards[i].translation}" 
                 type="text" class="input-transation" disabled>
        </div>
        <div class="card-row">
          <label id="label-sound" for="input-sound">sound:</label>
          <input name="sound" 
                 id="input-sound-${cards[i].word}"
                 value="${cards[i].audio}" 
                 type="file" 
                 class="input-sound" accept=".mp3" disabled>
        </div>
        <div class="card-row">
          <label id="label-picture" for="input-picture">picture:</label>
          <input name="picture" 
                 id="input-picture-${cards[i].word}" 
                 type="file" 
                 class="input-picture" accept="image/*" disabled>
        </div>

        <div id="picture-preview-${cards[i].word}" class="picture-preview">
          <img id="preview" class="preview" src="${cards[i].image}" alt="preview">
        
        </div>
        
        <div id="sound-preview-${cards[i].word}" class="picture-preview">
          <img id="preview" class="preview" 
               src="./assets/resource/control-img/play-sound.jpg" 
               data-audio="${cards[i].audio}" alt="audio">
        </div>

        <div class="card-btn-container">
          <button id="btnCardUpd-${cards[i].word}"
                  class="btn-update-card   
                  card-btn" data-id="${cards[i].word}">Update</button>
          <button id="btnCardSave-${cards[i].word}"
                  class="btn-save-card   
                  card-btn hidden" data-id="${cards[i].word}">Save</button>
          <button class="btn-delete-card 
                  card-btn" data-id="${cards[i].word}">Delete</button>
        </div>
      </div>
      `;
    }
    result += `
      <div class="admin-add-new-card admin-card">
        <h3>Create new card</h3>
        <img class="new-card" src="./assets/resource/control-img/plus.png" alt="new card">
      </div>
    `;
    return result;
  },

  renderNewCardForm(): string {
    const html = `
      <form id="form-new-card" action="submit" class="modal-form">
        <div class="login-header">CREATE CARD</div>
          <div class="form-row">
            <label id="label-word" for="input-word">word:</label>
            <input name="word" id="input-word" type="text" class="input-word">
          </div>
          <div class="form-row">
            <label id="label-translation" for="input-translation">translation:</label>
            <input name="translation" id="input-translation" type="text" class="input-transation">
          </div>
          <div class="form-row">
            <label id="label-sound" for="input-sound">sound:</label>
            <input name="sound" id="input-sound" type="file" class="input-sound" accept=".mp3" >
          </div>
          <div class="form-row">
            <label id="label-picture" for="input-picture">picture:</label>
            <input name="picture" id="input-picture" type="file" class="input-picture" accept="image/*">
          </div>

          <span id="output" class="output">
            <img id="preview" class="preview" src="" alt="preview">
          </span>

          <div class="login-footer">
            <button id="btnCancel" class="btn-cancel">Cancel</button>
            <button id="btnOk" class="btn-ok">Ok</button>
          </div>

      </form>
    `;
    return html;
  },

  renderLoginForm(): string {
    const html = `
      <form id="form-login" action="submit" class="form-login">
      <div class="login-header">LOGIN  (admin/admin is correct)</div>
      <div class="login-row">
        <label id="label-login" for="input-login"></label>
        <input name="input-login" id="input-login" type="text" class="input-login" placeholder="LOGIN">
      </div>
      <div class="login-row">
        <label id="label-login" for="input-pass"></label>
        <input name="input-pass" id="input-pass" type="password" class="input-pass" placeholder="PASSWORD">
      </div>
      <div class="login-footer">
        <button id="btnCancel" class="btn-cancel">Cancel</button>
        <button id="btnOk" class="btn-ok">Ok</button>
      </div>
    </form>
    `;
    return html;
  },

  renderCreateCategoryForm(): string {
    const html = `
      <form id="form-create-category" action="submit" class="form-create-category">
      <div class="login-header">CREATE CATEGORY</div>
      <div class="login-row">
        <label id="label-login" for="input-new-name"></label>
        <input name="input-new-name" id="input-new-name" type="text" class="input-login" placeholder="CATEGORY NAME">
      </div>
      <div class="login-footer">
        <button id="btnCancel" class="btn-cancel">Cancel</button>
        <button id="btnOk" class="btn-ok">Ok</button>
      </div>
    </form>
    `;
    return html;
  },

};
