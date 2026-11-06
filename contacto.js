const form = document.querySelector('#whatsapp-form');
const productSelect = document.querySelector('#consulta-producto');
const requestedProduct = new URLSearchParams(window.location.search).get('producto');

if (requestedProduct) {
  productSelect.value = requestedProduct;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = new FormData(form);
  const lines = [
    'Hola, Fruveg del Pacífico. Deseo realizar una consulta comercial.',
    '',
    `Nombre: ${fields.get('nombre')}`,
    `Empresa: ${fields.get('empresa') || 'No indicada'}`,
    `País o mercado: ${fields.get('mercado')}`,
    `Producto: ${fields.get('producto')}`,
    `Volumen estimado: ${fields.get('volumen') || 'No indicado'}`,
    `Correo o teléfono: ${fields.get('contacto')}`,
    `Detalle: ${fields.get('mensaje') || 'Sin detalles adicionales'}`
  ];
  window.open(`https://wa.me/50762647738?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
});

const menu = document.querySelector('.contact-menu');
const navigation = document.querySelector('#contact-nav');
menu.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
