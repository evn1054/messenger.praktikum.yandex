import Block from '@core/Block.ts';
import './Nav.scss';
import {
  LoginPage, NotFoundPage, RegistrationPage, ServerErrorPage,
} from '@pages';

export const ROUTES = {
  // Home = '/',
  // Profile = '/profile',
  // ChangeInformation = '/change-information',
  // ChangePassword = '/change-password',
  registration: '/registration',
  login: '/login',
  notFoundPage: '/404',
  serverErrorPage: '/500',
  // Logout = '/logout',
};

export const PAGES = {
  // [ROUTES.Home]: HomePage,
  // [ROUTES.Profile]: ProfilePage,
  // [ROUTES.ChangeInformation]: ChangeInformationPage,
  // [ROUTES.ChangePassword]: ChangePasswordPage,
  [ROUTES.registration]: RegistrationPage,
  [ROUTES.login]: LoginPage,
  [ROUTES.notFoundPage]: NotFoundPage,
  [ROUTES.serverErrorPage]: ServerErrorPage,
};

const pages = {
  // login: [Pages.LoginPage],
  login: LoginPage,
  registration: RegistrationPage,
  notFoundPage: NotFoundPage,
  serverErrorPage: ServerErrorPage,
  // chatList: [Pages.ChatList],
  // nav: [Pages.NavigatePage],
  // profile: [Pages.ProfilePage],
};

export function navigate(route) {
  const root = document.getElementById('app');

  const PageBlock = pages[route];
  const page = new PageBlock();
  root.innerHTML = '';
  root.append(page.getElement());
  page.dispatchComponentDidMount();
}

export default class Nav extends Block {
  render() {
    return this.compile('{{{items}}}');
  }

  addEvents() {
    super.addEvents();
    this._element.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', (e) => {
        const page = (e.target).getAttribute('href').slice(1);
        if (page) {
          navigate(page);

          e.preventDefault();
          e.stopImmediatePropagation();
        }
      });
    });
  }
}
