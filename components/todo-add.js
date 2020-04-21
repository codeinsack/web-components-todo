const templateTodoAdd = document.createElement('template')
templateTodoAdd.innerHTML = `
  <style>
  </style>
  <div>
    <input type="text">
    <button>Add</button>
  </div>
`;

class TodoAdd extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateTodoAdd.content.cloneNode(true))
  }
}

customElements.define('todo-add', TodoAdd)
