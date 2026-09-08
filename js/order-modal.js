/* ============================================================================
   ORDER MODAL — click "Order Now" on any dish. Pizza-style items show a
   size selector; mithai-style (weight) items let the customer type their
   own gram/kg amount, with the price calculated live. Either way it opens
   WhatsApp with all the order details pre-filled as a message.
   Change ORDER_WHATSAPP_NUMBER below if the order number ever changes.
   ============================================================================ */

(function () {
  var ORDER_WHATSAPP_NUMBER = "918081456316"; // country code + number, no + or spaces

  document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.getElementById('orderModalOverlay');
    var closeBtn = document.getElementById('orderModalClose');
    var dishLabel = document.getElementById('orderModalDish');
    var optionsMount = document.getElementById('orderOptionsGroup');
    var weightMount = document.getElementById('orderWeightGroup');
    var weightAmount = document.getElementById('weightAmount');
    var weightUnit = document.getElementById('weightUnit');
    var weightPreview = document.getElementById('weightPricePreview');
    var quantityField = document.getElementById('quantityField');
    var form = document.getElementById('orderForm');
    var locationBtn = document.getElementById('shareLocationBtn');
    var locationStatus = document.getElementById('locationStatus');
    var lastFocused = null;
    var currentOptions = [];
    var currentMode = 'options'; // 'options' or 'weight'
    var currentPricePerKg = 0;
    var sharedLocationUrl = '';

    if (!overlay || !form) return;

    function formatPrice(p) {
      return typeof p === 'number' ? '\u20B9' + Math.round(p) : p;
    }

    function renderOptions(options) {
      currentOptions = options || [];
      if (currentOptions.length <= 1) {
        optionsMount.innerHTML = '';
        optionsMount.hidden = true;
        return;
      }
      optionsMount.hidden = false;
      optionsMount.innerHTML =
        '<span class="order-options-label">Size / Portion chunein:</span>' +
        '<div class="order-options-list">' +
        currentOptions
          .map(function (o, i) {
            var id = 'orderOpt' + i;
            return (
              '<label class="order-option-pill" for="' + id + '">' +
                '<input type="radio" name="sizeOption" id="' + id + '" value="' + i + '"' + (i === 0 ? ' checked' : '') + '>' +
                '<span>' + (o.label || '') + ' ' + formatPrice(o.price) + '</span>' +
              '</label>'
            );
          })
          .join('') +
        '</div>';
    }

    function updateWeightPreview() {
      var amount = parseFloat(weightAmount.value) || 0;
      var unit = weightUnit.value;
      var kg = unit === 'kg' ? amount : amount / 1000;
      var total = kg * currentPricePerKg;
      weightPreview.textContent = amount > 0
        ? 'Total: ' + formatPrice(total) + ' (' + amount + ' ' + (unit === 'kg' ? 'kg' : 'gram') + ' \u00d7 ' + formatPrice(currentPricePerKg) + '/kg)'
        : '';
    }

    function openModal(dishName, mode, options, pricePerKg) {
      lastFocused = document.activeElement;
      dishLabel.textContent = dishName;
      form.dataset.dish = dishName;
      currentMode = mode;

      if (mode === 'weight') {
        currentPricePerKg = pricePerKg || 0;
        optionsMount.hidden = true;
        optionsMount.innerHTML = '';
        weightMount.hidden = false;
        quantityField.hidden = true;
        weightAmount.value = 500;
        weightUnit.value = 'g';
        updateWeightPreview();
      } else {
        weightMount.hidden = true;
        quantityField.hidden = false;
        renderOptions(options);
      }

      sharedLocationUrl = '';
      if (locationStatus) locationStatus.textContent = '';
      if (locationBtn) locationBtn.classList.remove('is-done');

      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () { overlay.classList.add('is-open'); });
      var firstInput = form.querySelector('input[type="text"], input[type="tel"]');
      if (firstInput) firstInput.focus();
    }

    function closeModal() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(function () { overlay.hidden = true; }, 200);
      if (lastFocused) lastFocused.focus();
    }

    if (weightAmount) weightAmount.addEventListener('input', updateWeightPreview);
    if (weightUnit) weightUnit.addEventListener('change', updateWeightPreview);

    // Open on any "Order Now" button (menu is rendered dynamically, so we
    // listen on the document and check the clicked element).
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.btn-order-now');
      if (!btn) return;

      if (btn.dataset.unit === 'weight') {
        openModal(btn.dataset.dish, 'weight', null, parseFloat(btn.dataset.pricePerKg) || 0);
      } else {
        var options = [];
        try { options = JSON.parse(btn.dataset.options || '[]'); } catch (err) { options = []; }
        openModal(btn.dataset.dish, 'options', options, 0);
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !overlay.hidden) closeModal();
    });

    // Live location — uses the browser's own GPS/network location, the
    // customer must allow the permission prompt. Works once the site is
    // hosted over HTTPS (e.g. GitHub Pages); it needs a secure connection.
    if (locationBtn) {
      locationBtn.addEventListener('click', function () {
        if (!('geolocation' in navigator)) {
          locationStatus.textContent = 'Is browser mein location share nahi ho sakti — address type kar dein.';
          return;
        }
        locationStatus.textContent = 'Location le rahe hain...';
        navigator.geolocation.getCurrentPosition(
          function (pos) {
            var lat = pos.coords.latitude.toFixed(6);
            var lng = pos.coords.longitude.toFixed(6);
            sharedLocationUrl = 'https://maps.google.com/?q=' + lat + ',' + lng;
            locationStatus.textContent = 'Location add ho gayi \u2713';
            locationBtn.classList.add('is-done');
          },
          function () {
            locationStatus.textContent = 'Location nahi mil payi — apna address neeche likh dein.';
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.elements['name'].value.trim();
      var mobile = form.elements['mobile'].value.trim();
      var address = form.elements['address'].value.trim();
      var notes = form.elements['notes'].value.trim();
      var dish = form.dataset.dish || '';

      if (!name || !mobile || !address) {
        return; // native "required" validation will already flag these
      }

      var dishLine, quantityLine, priceLine;

      if (currentMode === 'weight') {
        var amount = parseFloat(weightAmount.value) || 0;
        var unit = weightUnit.value === 'kg' ? 'kg' : 'gram';
        var kg = weightUnit.value === 'kg' ? amount : amount / 1000;
        var total = Math.round(kg * currentPricePerKg);
        dishLine = dish;
        quantityLine = amount + ' ' + unit;
        priceLine = formatPrice(total);
      } else {
        var selectedIndex = 0;
        var checkedInput = form.querySelector('input[name="sizeOption"]:checked');
        if (checkedInput) selectedIndex = parseInt(checkedInput.value, 10) || 0;
        var chosen = currentOptions[selectedIndex] || {};
        dishLine = dish + (chosen.label ? ' (' + chosen.label + ')' : '');
        quantityLine = form.elements['quantity'].value || '1';
        priceLine = formatPrice(chosen.price !== undefined ? chosen.price : '');
      }

      var lines = [
        'Naya Order \u2014 Makhan Bhog Sweets and Pizza King',
        '',
        'Dish: ' + dishLine,
        'Quantity: ' + quantityLine,
        'Price: ' + priceLine,
        '',
        'Grahak ki Jaankari:',
        'Naam: ' + name,
        'Mobile: ' + mobile,
        'Address: ' + address
      ];

      if (sharedLocationUrl) {
        lines.push('Live Location: ' + sharedLocationUrl);
      }
      lines.push('Extra Note: ' + (notes || '-'));

      var message = encodeURIComponent(lines.join('\n'));
      var url = 'https://wa.me/' + ORDER_WHATSAPP_NUMBER + '?text=' + message;

      window.open(url, '_blank', 'noopener');
      form.reset();
      closeModal();
    });
  });
})();
