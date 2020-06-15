import {$} from '../../core/Dom'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  // Возвращает корневую дом ноду для эксэля
  getRoot() {
    const $root = $.create('div', 'excel')

    // Component - класс конструктор
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot().$el)
    this.components.forEach(component => {
      component.init()
    });
  }
}
