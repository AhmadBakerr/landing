const navbarList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
const scrollToTopButton = document.createElement('button');

sections.forEach((section) => {
    const sectionId = section.id;
    const sectionNav = section.getAttribute('data-nav');
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="#${sectionId}" class="menu__link">${sectionNav}</a>`;
    navbarList.appendChild(listItem);
});

function setActiveSection() {
    sections.forEach((section) => {
        const bounding = section.getBoundingClientRect();
        const link = document.querySelector(`a[href="#${section.id}"]`);

        if (bounding.top >= -200 && bounding.top <= 200) {
            section.classList.add('your-active-class');
            link.classList.add('active-link');
        } else {
            section.classList.remove('your-active-class');
            link.classList.remove('active-link');
        }
    });
}

navbarList.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.nodeName === 'A') {
        const targetId = event.target.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
});

scrollToTopButton.textContent = '↑ Top';
scrollToTopButton.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopButton);

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function handleScrollToTopButton() {
    if (window.scrollY > window.innerHeight) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
}

let isScrolling;
function hideNavbarWhileIdle() {
    const header = document.querySelector('.page__header');
    window.clearTimeout(isScrolling);

    header.style.display = 'block';
    isScrolling = setTimeout(() => {
        header.style.display = 'none';
    }, 3000);
}

document.addEventListener('scroll', () => {
    setActiveSection();
    handleScrollToTopButton();
    hideNavbarWhileIdle();
});
