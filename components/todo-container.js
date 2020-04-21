const templateTodoContainer = document.createElement('template')
templateTodoContainer.innerHTML = `
  <h1>What we need to do</h1>
  <todo-add></todo-add>
  <todo-list></todo-list>
`;

class TodoContainer extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this._list = [
      { text: 'Learn Web Components', checked: false },
      { text: 'Learn React', checked: true },
      { text: 'Learn Vue', checked: true },
      { text: 'Learn JavaScript', checked: true },
    ];
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateTodoContainer.content.cloneNode(true))
    this.$list = this.shadowRoot.querySelector('todo-list')
    this.addEventListener('add-new-todo', this._addNewItem.bind(this))
    this.addEventListener('remove-todo', this._removeItem.bind(this))
    this.$list.setAttribute('list', JSON.stringify(this._list))
  }

  _addNewItem(event) {
    const { newTodoText } = event.detail
    this._list.push({
      text: newTodoText,
      checked: false,
    })
    this.$list.setAttribute('list', JSON.stringify(this._list))
  }

  _removeItem(event) {
    const { index } = event.detail
    this._list.splice(index, 1)
    this.$list.setAttribute('list', JSON.stringify(this._list))
  }
}

customElements.define('todo-container', TodoContainer)
