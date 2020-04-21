const templateTodoItem = document.createElement('template')
templateTodoItem.innerHTML = `
  <style>
    li {
      list-style-type: none;
    }
    button.remove-btn {
      border-radius: 50%;
      outline-width: 0;
    }
  </style>
  <li class="item">
    <label>
      <input type="checkbox">
      <slot></slot>
    </label>
    <button class="remove-btn">x</button>
  </li>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateTodoItem.content.cloneNode(true))
    const $button = this.shadowRoot.querySelector('.remove-btn')
    $button.addEventListener('click', this._removeTodo.bind(this))
  }

  _removeTodo(event) {
    const removeEvent = new CustomEvent('remove-todo', {
      bubbles: true,
      composed: true,
      detail: { index: this.index },
    })
    event.target.dispatchEvent(removeEvent)
  }
}

customElements.define('todo-item', TodoItem)
