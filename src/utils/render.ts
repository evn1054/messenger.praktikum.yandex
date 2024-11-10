import { IndexLayout } from '../layout/IndexLayout';

export const renderDOM = (query: string, component: IndexLayout) => {
  const root = document.querySelector(query);
  const content = component.getContent();

  if (root && content) {
    root.appendChild(content);
  }
  component.dispatchComponentDidMount();
  return root;
};
