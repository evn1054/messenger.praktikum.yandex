import Block, { BaseProps } from '@core/Block';
import './navigation.scss';
import { RegistrationPage } from '@pages/registration';
import { NotFoundPage } from '@pages/errorPages/pageNotFound';
import { LoginPage } from '@pages/login';
import { ServerErrorPage } from '@pages/errorPages/serverErrorPage';
import { ChatListPage } from '@pages/chatListPage';
import { ProfilePage } from '@pages/profilePage';

export const ROUTES = {
  profile: '/profile',
  registration: '/registration',
  login: '/login',
  notFoundPage: '/404',
  serverErrorPage: '/500',
  chatListPage: '/chatListPage',
};

// export const PAGES = {
//   // [ROUTES.Home]: HomePage,
//   [ROUTES.profile]: ProfilePage,
//   // [ROUTES.ChangeInformation]: ChangeInformationPage,
//   // [ROUTES.ChangePassword]: ChangePasswordPage,
//   [ROUTES.registration]: RegistrationPage,
//   [ROUTES.login]: LoginPage,
//   [ROUTES.notFoundPage]: NotFoundPage,
//   [ROUTES.serverErrorPage]: ServerErrorPage,
// };

const pages = {
  login: LoginPage,
  registration: RegistrationPage,
  notFoundPage: NotFoundPage,
  serverErrorPage: ServerErrorPage,
  chatListPage: ChatListPage,
  profile: ProfilePage,
};

export function navigate(route: string) {
  const root = document.getElementById('app');

  const PageBlock = pages[route as keyof typeof pages];
  const page = new PageBlock({});
  const element = page.getElement();

  if (root && element) {
    root.innerHTML = '';
    root.append(element);
    page.dispatchComponentDidMount();
  }
}

export class Navigation extends Block<BaseProps> {
  render() {
    return this.compile('{{{items}}}', this._props);
  }

  addEvents() {
    super.addEvents();
    const element = this.getElement();
    if (element) {
      element.querySelectorAll('a').forEach((link: HTMLAnchorElement) => {
        link.addEventListener('click', (e: MouseEvent) => {
          if (e.target instanceof HTMLAnchorElement) {
            const page = e.target.getAttribute('href')!.slice(1);

            if (page) {
              navigate(page);

              e.preventDefault();
              e.stopImmediatePropagation();
            }
          }
        });
      });
    }
  }
}
