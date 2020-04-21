const templateTodoAdd = document.createElement('template')
templateTodoAdd.innerHTML = `
  <style>
  </style>
  <div>
    <input class="todo" type="text">
    <button class="add-btn">Add</button>
  </div>
`;

class TodoAdd extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateTodoAdd.content.cloneNode(true))
    this.$input = this.shadowRoot.querySelector('.todo')
    const $button = this.shadowRoot.querySelector('.add-btn')
    $button.addEventListener('click', this._addNewTodo.bind(this))
  }

  _addNewTodo(event) {
    const { value } = this.$input
    const addEvent = new CustomEvent('add-new-todo', {
      bubbles: true,
      composed: true,
      detail: { newTodoText: value },
    })
    event.target.dispatchEvent(addEvent)
  }
}

customElements.define('todo-add', TodoAdd)
