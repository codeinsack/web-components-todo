const templateTodo = document.createElement('template')
templateTodo.innerHTML = `
  <h1>What we need to do</h1>
  <todo-add></todo-add>
  <ul class="list"></ul>
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
    this.shadowRoot.appendChild(templateTodo.content.cloneNode(true))
    this.$list = this.shadowRoot.querySelector('.list')
    this.addEventListener('add-new-todo', this._addNewItem.bind(this))
    this._render()
  }

  _addNewItem(event) {
    const { newTodoText } = event.detail
    this._list.push({
      text: newTodoText,
      checked: false,
    })
    this._render()
  }

  _render() {
    this.$list.innerHTML = '';
    this._list.forEach((item, index) => {
      const $item = document.createElement('todo-item')
      $item.textContent = item.text
      $item.checked = item.checked
      $item.index = index
      this.$list.appendChild($item)
    })
  }
}

customElements.define('todo-container', TodoContainer)
