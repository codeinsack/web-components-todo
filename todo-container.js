class TodoContainer extends HTMLElement {
  constructor() {
    super();
    console.log('todo-container constructor')
  }
}

customElements.define('todo-container', TodoContainer)
