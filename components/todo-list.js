const templateTodoList = document.createElement('template')
templateTodoList.innerHTML = `
  <ul class="list"></ul>
`;

class TodoList extends HTMLElement {
  constructor() {
    super()
    this._list = []
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateTodoList.content.cloneNode(true))
    this.$list = this.shadowRoot.querySelector('.list')
    this._render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }
    if (name === 'list') {
      this._list = JSON.parse(newValue)
      this._render()
    }
  }

  static get observedAttributes() {
    return ['list']
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

customElements.define('todo-list', TodoList)
