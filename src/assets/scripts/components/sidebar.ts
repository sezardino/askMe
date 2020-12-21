import AbsComponent from './absComponent';

const sidebarTemplate = (name: string): string => {
  return `
  <aside class="sidebar">
    <h1 class="sidebar__title">Ask a question</h1>
    <p class="sidebar__author">for ${name}</p>
  </aside>
  `;
};

class Sidebar extends AbsComponent {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
  getTemplate() {
    return sidebarTemplate(this.name);
  }
}

export default Sidebar;
