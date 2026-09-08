/* ============================================================================
   MENU RENDERER — builds the jump-nav and category sections from
   /data/menu-data.js so the menu can be edited without touching HTML.

   Two kinds of items:
   - "options" items (pizza sizes, portions, flat price) — the list row
     shows only the lowest/most attractive price ("se shuru" if there is
     more than one option); the full choice appears once "Order Now" is
     clicked, inside the modal.
   - "weight" items (mithai) — the list row shows a clean "₹X/kg" rate;
     the customer types their own gram/kg amount when ordering.
   ============================================================================ */

(function () {
  var ICONS = {
    mithai:
      '<circle cx="24" cy="27" r="15" fill="#D9A441"/><circle cx="18" cy="21" r="1.6" fill="#B9862E"/><circle cx="28" cy="19" r="1.6" fill="#B9862E"/><circle cx="30" cy="28" r="1.6" fill="#B9862E"/><circle cx="19" cy="32" r="1.6" fill="#B9862E"/><circle cx="25" cy="10" r="2.6" fill="#4B6B3A"/>',
    pizza:
      '<path d="M24 44 L8 10 A34 34 0 0 0 40 10 Z" fill="#E1523D"/><path d="M8 10 A34 34 0 0 0 40 10" fill="none" stroke="#F0CE84" stroke-width="3"/><circle cx="20" cy="23" r="2.2" fill="#8B2E1E"/><circle cx="28" cy="29" r="2.2" fill="#8B2E1E"/>',
    fastfood:
      '<path d="M6 30c0-10 10-18 24-18 8 0 12 4 12 8 0 6-8 10-20 10-8 0-12 2-16 4Z" fill="#E9C77B"/><path d="M6 30c0-10 10-18 24-18" fill="none" stroke="#B9862E" stroke-width="1.5"/>'
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatPrice(p) {
    return typeof p === 'number' ? '\u20B9' + p : escapeHtml(p);
  }

  // What shows in the compact list row — one clean, attractive price.
  function rowPriceDisplay(item) {
    if (item.unit === 'weight') {
      return formatPrice(item.pricePerKg) + '/kg';
    }
    var options = item.options || [];
    if (options.length <= 1) {
      return formatPrice(options[0] ? options[0].price : '');
    }
    // Show the lowest-priced option as the attractive headline price.
    var lowest = options.reduce(function (min, o) {
      return (typeof o.price === 'number' && o.price < min.price) ? o : min;
    }, options[0]);
    return formatPrice(lowest.price) + ' se shuru';
  }

  function buildJumpNav(categories) {
    return categories
      .map(function (cat) {
        return '<a href="#' + cat.id + '">' + escapeHtml(cat.title) + '</a>';
      })
      .join('');
  }

  function buildItemRow(item) {
    var note = item.note
      ? '<span class="item-note">' + escapeHtml(item.note) + '</span>'
      : '';

    var dataAttrs;
    if (item.unit === 'weight') {
      dataAttrs = 'data-unit="weight" data-price-per-kg="' + item.pricePerKg + '"';
    } else {
      dataAttrs = 'data-options="' + escapeHtml(JSON.stringify(item.options)) + '"';
    }

    return (
      '<div class="menu-row">' +
        '<div class="item-info">' +
          '<span class="item-name">' + escapeHtml(item.name) + note + '</span>' +
        '</div>' +
        '<div class="item-action">' +
          '<span class="item-price">' + rowPriceDisplay(item) + '</span>' +
          '<button type="button" class="btn-order-now" data-dish="' + escapeHtml(item.name) + '" ' + dataAttrs + '>' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16v12.5H9l-5 3.5V4Z"/></svg>' +
            'Order Now' +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }

  function buildCategory(cat) {
    var icon = ICONS[cat.icon] || ICONS.mithai;
    var items = cat.items.map(buildItemRow).join('');
    return (
      '<section class="menu-category" id="' + cat.id + '">' +
        '<div class="container">' +
          '<div class="menu-cat-head reveal">' +
            '<svg viewBox="0 0 48 48" aria-hidden="true">' + icon + '</svg>' +
            '<div>' +
              '<h2>' + escapeHtml(cat.title) + '</h2>' +
              '<p>' + escapeHtml(cat.description || '') + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="menu-list reveal-stagger">' + items + '</div>' +
        '</div>' +
      '</section>'
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    var navMount = document.getElementById('menuJumpNav');
    var listMount = document.getElementById('menuCategories');
    if (!navMount || !listMount || typeof MENU_DATA === 'undefined') return;

    navMount.innerHTML = buildJumpNav(MENU_DATA.categories);
    listMount.innerHTML = MENU_DATA.categories.map(buildCategory).join('');

    if (window.observeReveals) window.observeReveals();
  });
})();
