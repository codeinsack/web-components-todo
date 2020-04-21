const templateTodoItem = document.createElement('template')
templateTodoItem.innerHTML = `
  <style>
    li {
      list-style-type: none;
    }
    button {
      border-radius: 50%;
      outline-width: 0;
    }
  </style>
  <li class="item">
    <label>
      <input type="checkbox">
      <slot></slot>
    </label>
    <button>x</button>
  </li>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateTodoItem.content.cloneNode(true))
  }
}

customElements.define('todo-item', TodoItem)
