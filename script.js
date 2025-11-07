const modalRegister = document.getElementById('modal-register');
const modalLogin = document.getElementById('modal-login');
const backdrop = document.getElementById('backdrop');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.main-nav');

function toggleModal(modal, open) {
    if (!modal) return;
    const isOpen = open ?? modal.getAttribute('aria-hidden') === 'true';
    modal.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    backdrop.hidden = !isOpen;
}

function closeModals() {
    [modalRegister, modalLogin].forEach((modal) => {
        if (modal) modal.setAttribute('aria-hidden', 'true');
    });
    backdrop.hidden = true;
}

backdrop?.addEventListener('click', closeModals);

document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
        const type = trigger.dataset.openModal;
        closeModals();
        if (type === 'register') {
            toggleModal(modalRegister, true);
        } else if (type === 'login') {
            toggleModal(modalLogin, true);
        }
    });
});

document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', closeModals);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModals();
    }
});

burger?.addEventListener('click', () => {
    nav?.classList.toggle('open');
});

const searchForm = document.getElementById('search-form');
searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(searchForm);
    const activity = formData.get('activity');
    const city = formData.get('city');
    const modal = modalRegister;
    if (modal) {
        modal.querySelector('h2').textContent = 'Присоединяйтесь к поиску';
        modal.querySelector('button[type="submit"]').textContent = 'Получить доступ';
        modal.setAttribute('aria-hidden', 'false');
        backdrop.hidden = false;
    }
    const message = `Мы нашли несколько вариантов для «${activity}» в городе ${city}. Зарегистрируйтесь, чтобы увидеть подробности!`;
    alert(message);
});

const authForm = document.getElementById('auth-form');
authForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Спасибо! Мы отправили письмо с подтверждением.');
});

function initMap() {
    if (!window.ymaps) return;
    ymaps.ready(() => {
        const map = new ymaps.Map('map', {
            center: [55.751574, 37.573856],
            zoom: 11,
            controls: ['zoomControl', 'geolocationControl']
        });

        const points = [
            {
                coords: [55.763, 37.62],
                title: 'Утренний бег в парке Зарядье',
                description: 'Группа любителей собирается по вторникам и четвергам в 7:00'
            },
            {
                coords: [55.73, 37.52],
                title: 'Футбольная команда «Юго-Запад»',
                description: 'Ищем вратаря и защитника. Игры по выходным'
            },
            {
                coords: [55.78, 37.67],
                title: 'Персональный тренер по функционалу',
                description: 'Индивидуальные тренировки и подготовка к соревнованиям'
            }
        ];

        points.forEach((point) => {
            const placemark = new ymaps.Placemark(point.coords, {
                balloonContentHeader: `<strong>${point.title}</strong>`,
                balloonContentBody: point.description
            }, {
                preset: 'islands#redSportIcon'
            });
            map.geoObjects.add(placemark);
        });
    });
}

initMap();
