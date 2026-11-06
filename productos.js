const productData = {
  pina: {
    name: 'Piña MD2',
    image: 'resources/pina-md2-editorial.png',
    alt: 'Piña MD2 fresca',
    description: 'Piña tropical seleccionada por su dulzor, color de pulpa y condición de llegada.',
    specs: [['Origen', 'Panamá'], ['Presentación', 'Bajo consulta'], ['Calibre', 'Bajo consulta'], ['Disponibilidad', 'Sujeta a temporada y volumen']]
  },
  yuca: {
    name: 'Yuca',
    image: 'resources/yuca-editorial.png',
    alt: 'Yuca fresca para exportación',
    description: 'Raíz fresca seleccionada para una cadena de suministro eficiente y una presentación cuidada.',
    specs: [['Origen', 'Panamá'], ['Presentación', 'Bajo consulta'], ['Formato', 'Fresco'], ['Disponibilidad', 'Sujeta a temporada y volumen']]
  },
  aguacate: {
    name: 'Aguacate Hass',
    image: 'resources/aguacate-hass-editorial.png',
    alt: 'Aguacate Hass fresco',
    description: 'Aguacate de pulpa cremosa y color intenso, disponible de acuerdo con calibre y programa comercial.',
    specs: [['Origen', 'Bajo consulta'], ['Presentación', 'Bajo consulta'], ['Calibre', 'Bajo consulta'], ['Disponibilidad', 'Sujeta a temporada y volumen']]
  }
};

const dialog = document.querySelector('#product-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogName = document.querySelector('#dialog-product-name');
const dialogDescription = document.querySelector('#dialog-description');
const dialogSpecs = document.querySelector('#dialog-specs');

document.querySelectorAll('.details-trigger[data-product]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = productData[trigger.dataset.product];
    if (!item) return;
    dialogImage.src = item.image;
    dialogImage.alt = item.alt;
    dialogName.textContent = item.name;
    dialogDescription.textContent = item.description;
    dialogSpecs.replaceChildren(...item.specs.map(([label, value]) => {
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const detail = document.createElement('dd');
      term.textContent = label;
      detail.textContent = value;
      row.append(term, detail);
      return row;
    }));
    dialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

const filter = document.querySelector('#product-filter');
const cards = [...document.querySelectorAll('.figma-product-card')];
const searchStatus = document.querySelector('#search-status');
document.querySelector('.product-search').addEventListener('submit', (event) => event.preventDefault());
filter.addEventListener('input', () => {
  const search = filter.value.trim().toLocaleLowerCase('es');
  let visible = 0;
  cards.forEach((card) => {
    const matches = !search || card.dataset.product.includes(search);
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  searchStatus.textContent = search && !visible ? 'No encontramos ese producto. Consulta nuestro portafolio.' : '';
});

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#products-nav');
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});
