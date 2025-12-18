type Lang = 'en' | 'ee' | 'ru';

let lang: Lang = 'en';

type Translation = {
    title: string;
    welcomeMessage: string;
    logoutButton: string;
    header: {
        home: string;
        about: string;
        contact: string;
    }
}

type Langs = {
    [key in Lang]: Translation
}

const langs: Langs =
{
    en: {
        title: "Welcome to Sipster",
        welcomeMessage: "Your favorite SIP client",
        logoutButton: "Logout",
        header: {
            home: "Home",
            about: "About Us",
            contact: "Contact"
        }
    },
    ee: {
        title: "Bienvenido a Sipster",
        welcomeMessage: "Tu cliente SIP favorito",
        logoutButton: "Cerrar sesión",
        header: {
            home: "Inicio",
            about: "Sobre nosotros",
            contact: "Contacto"
        }
    },
    ru: {
        title: "Добро пожаловать в Sipster",
        welcomeMessage: "Ваш любимый SIP клиент",
        logoutButton: "Выйти",
        header: {
            home: "Главная",
            about: "О нас",
            contact: "Контакт"
        }
    }
}

export const switchLang = (newLang: Lang) => {
    lang = newLang;
}

export const i18n = (): Translation => {
    return langs[lang];
};