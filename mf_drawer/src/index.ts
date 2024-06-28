import './styles.scss';

const drawerElement: HTMLElement | null = document.getElementById('drawer');
if (drawerElement) {
  drawerElement.innerText = 'Hello from drawer Micro-Frontend with TypeScript';
}