// Load the responsive display safeguards after the main stylesheet.
const responsiveFixes = document.createElement('link');
responsiveFixes.rel = 'stylesheet';
responsiveFixes.href = '/responsive-fixes.css?v=20261004';
document.head.appendChild(responsiveFixes);

// Keep the public website positioned as an independent sourcing company.
const publicCopyReplacements = [
  [/Request a Quotation/g, 'Send an Enquiry'],
  [/REQUEST A QUOTATION/g, 'SEND AN ENQUIRY'],
  [/request a quotation/gi, 'send an enquiry'],
  [/quotation enquiry/gi, 'website enquiry'],
  [/quotation request/gi, 'website enquiry'],
  [/quotation response/gi, 'enquiry response'],
  [/detailed quotations/gi, 'detailed responses'],
  [/detailed quotation/gi, 'detailed response'],
  [/each quotation/gi, 'each enquiry'],
  [/with the quotation/gi, 'during the order process'],
  [/prepare quotations/gi, 'respond to commercial enquiries'],
  [/For quotations, product documentation or supply enquiries/gi, 'For product sourcing and supply enquiries'],
  [/quotation and supply terms/gi, 'commercial and supply terms'],
  [/agreed quotation/gi, 'agreed commercial terms'],
  [/technical documentation and coordinated logistics/gi, 'commercial coordination and logistics'],
  [/product sourcing, commercial coordination, technical documentation and logistics/gi, 'product sourcing, commercial coordination and logistics'],
  [/Product availability, pack size, documentation, commercial terms and destination-market suitability/gi, 'Product availability, pack size, commercial terms and destination-market suitability'],
  [/Commercial and technical documentation is reviewed for the specific order and destination market\./gi, 'Commercial requirements are reviewed for the specific order and destination market.'],
  [/product, documentation and destination-market checks/gi, 'product availability and destination-market checks'],
  [/availability, documentation or destination-market checks/gi, 'availability or destination-market checks'],
  [/supported by documentation, commercial sourcing and logistics coordination/gi, 'supported by commercial sourcing and logistics coordination'],
  [/Product availability, specifications, pricing, packaging, documentation, regulatory suitability, delivery terms and lead times/gi, 'Product availability, specifications, pricing, packaging, regulatory suitability, delivery terms and lead times']
];

const replacePublicText = (root = document.body) => {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    let value = node.nodeValue;
    publicCopyReplacements.forEach(([pattern, replacement]) => { value = value.replace(pattern, replacement); });
    node.nodeValue = value;
  });
};
replacePublicText();

// Buyer-confidence section: factual trust signals for an independent sourcing company.
const trustSection = document.querySelector('.trust-section');
if (trustSection) {
  const kicker = trustSection.querySelector('.section-kicker');
  const heading = trustSection.querySelector('h2');
  const intro = trustSection.querySelector('.trust-heading p');
  const grid = trustSection.querySelector('.home-trust-grid');
  if (kicker) kicker.textContent = 'WHY BUYERS CAN TRUST SHRAY & CO';
  if (heading) heading.textContent = 'Professional sourcing. Clear communication. Traceable business.';
  if (intro) intro.textContent = 'Shray & Co Supplies Ltd provides a clear UK point of contact for chemical sourcing, coordinating customer requirements with established international supply channels and confirming commercial terms in writing.';
  if (grid) grid.innerHTML = `
    <article><strong>UK-registered company</strong><span>Shray &amp; Co Supplies Ltd<br><a class="companies-house-link" href="https://find-and-update.company-information.service.gov.uk/company/15989906" target="_blank" rel="noopener">Company No. 15989906 — verify at Companies House</a></span></article>
    <article><strong>Direct commercial contact</strong><span>Deal directly with Nish Patel, Director, through our published UK business contact details.</span></article>
    <article><strong>International sourcing network</strong><span>We coordinate chemical sourcing through established international supply channels according to the customer's specific requirement and destination.</span></article>
    <article><strong>Clear written commercial terms</strong><span>Product, quantity, packaging, price, delivery terms and other agreed commercial details are confirmed in writing.</span></article>
    <article><strong>Traceable order process</strong><span>Enquiries and orders are handled through a clear commercial process with written confirmation at the appropriate stages.</span></article>
    <article><strong>Professional logistics coordination</strong><span>We support the commercial coordination of international supply and logistics arrangements for each confirmed order.</span></article>`;
}

// Remove public-facing blocks that specifically advertise TDS/SDS/COA.
document.querySelectorAll('.benefit').forEach((item) => {
  if (/TDS|SDS|COA|Documentation Support/i.test(item.textContent)) item.remove();
});
document.querySelectorAll('.stats-grid article').forEach((item) => {
  if (/TDS|SDS|COA|document types available/i.test(item.textContent)) item.remove();
});
document.querySelectorAll('.faq-list details').forEach((item) => {
  if (/TDS|SDS|COA|technical documentation/i.test(item.textContent)) item.remove();
});

const qualitySection = document.querySelector('.quality-section');
if (qualitySection && /TDS|SDS|COA|documentation/i.test(qualitySection.textContent)) {
  const kicker = qualitySection.querySelector('.section-kicker');
  const heading = qualitySection.querySelector('h2');
  const paragraph = qualitySection.querySelector('p');
  if (kicker) kicker.textContent = 'QUALITY & SUPPLY';
  if (heading) heading.textContent = 'Supporting professional commercial sourcing';
  if (paragraph) paragraph.textContent = 'We review product requirements, availability, specifications, regulatory status and destination-market suitability for each enquiry. Supply details are confirmed directly with the customer before an order is accepted.';
}

const enquiryChecklist = document.querySelector('.enquiry-check-list');
if (enquiryChecklist) enquiryChecklist.querySelectorAll('li').forEach((item) => {
  if (/documentation/i.test(item.textContent)) item.textContent = 'Intended application or other commercial requirements';
});

const messageField = document.querySelector('#enquiry textarea[name="message"]');
if (messageField) messageField.placeholder = 'Please include any delivery, application or other commercial requirements.';

const enquiryForm = document.querySelector('#enquiry form');
if (enquiryForm) {
  const subject = enquiryForm.querySelector('input[name="_subject"]');
  const autoresponse = enquiryForm.querySelector('input[name="_autoresponse"]');
  const submit = enquiryForm.querySelector('.form-submit');
  if (subject) subject.value = 'Website enquiry — Shray & Co Supplies Ltd';
  if (autoresponse) autoresponse.value = 'Thank you for contacting Shray & Co Supplies Ltd. We have received your enquiry and aim to acknowledge it within one working day. A detailed response may require product availability and destination-market checks.';
  if (submit) submit.innerHTML = 'Send enquiry <span aria-hidden="true">→</span>';
}

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) {
  const closeMenu = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = 'Menu'; };
  toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.textContent = open ? 'Close' : 'Menu'; });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('click', (event) => { if (nav.classList.contains('open') && !nav.contains(event.target) && !toggle.contains(event.target)) closeMenu(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });
}

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const enquirySelect = document.querySelector('#enquiry select[name="product"]');
document.querySelectorAll('[data-enquiry-product]').forEach((link) => link.addEventListener('click', () => {
  if (enquirySelect) enquirySelect.value = link.dataset.enquiryProduct || '';
}));

const productPage = document.querySelector('.product-page');
if (productPage) window.addEventListener('pageshow', () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), { once: true });
