const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('enquiryForm').addEventListener('submit', function(e){
  e.preventDefault();
  const f = new FormData(this);
  const subject = encodeURIComponent(`Commercial Enquiry - ${f.get('product')} - ${f.get('company')}`);
  const body = encodeURIComponent(
`Dear Shray & Co Supplies Ltd,

Please find my enquiry details below:

Name: ${f.get('name')}
Company: ${f.get('company')}
Email: ${f.get('email')}
Country: ${f.get('country')}
Product: ${f.get('product')}
Quantity: ${f.get('quantity')}

Message:
${f.get('message')}

Kind regards,
${f.get('name')}`
  );
  window.location.href = `mailto:nishpatel@shraysuppliesltd.com?subject=${subject}&body=${body}`;
});
