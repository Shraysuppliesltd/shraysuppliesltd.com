const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (toggle && nav) {
  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (
      nav.classList.contains('open') &&
      !nav.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });
}

const year = document.getElementById('year');
if (year) {
  year.textContent = String(new Date().getFullYear());
}


const enquirySelect = document.querySelector('#enquiry select[name="product"]');
document.querySelectorAll('[data-enquiry-product]').forEach((link) => {
  link.addEventListener('click', () => {
    if (enquirySelect) enquirySelect.value = link.dataset.enquiryProduct || '';
  });
});

const enquiryLabels = {
  name: 'Name',
  company: 'Company',
  email: 'Email',
  telephone: 'Telephone',
  product: 'Product',
  quantity: 'Quantity required',
  destination: 'Destination country',
  packaging: 'Packaging preference',
  message: 'Further requirements'
};

document.querySelectorAll('[data-mailto-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const lines = ['Website enquiry', ''];
    Object.entries(enquiryLabels).forEach(([name, label]) => {
      const value = String(fields.get(name) || '').trim();
      if (value) lines.push(label + ': ' + value);
    });
    lines.push('', 'Please contact me regarding this enquiry.');
    const subject = form.dataset.formSubject || 'Website enquiry';
    window.location.href = 'mailto:nishpatel@shraysuppliesltd.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
  });
});