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
    this._render()
  }

  _render() {
    this._list.forEach((item, index) => {
      const $item = document.createElement('todo-item')
      const $list = this.shadowRoot.querySelector('.list')
      $item.textContent = item.text
      $item.checked = item.checked
      $item.index = index
      $list.appendChild($item)
    })
  }
}

customElements.define('todo-container', TodoContainer)
