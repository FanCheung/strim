// import { Subject, Observable } from 'rxjs'
// import { map, startWith } from 'rxjs/operators'
import { html } from 'snabbdom-jsx';
import * as Snabbdom from 'snabbdom-pragma'
/* @jsx html */
html.createElement = html
import * as snabbdom from 'snabbdom';
import classModule from 'snabbdom/modules/class'
import propsModule from 'snabbdom/modules/props'
import styleModule from 'snabbdom/modules/style'
import eventlistenersModule from 'snabbdom/modules/eventlisteners'
import { Subject, Observable } from 'rxjs'
import { tap, filter, map, startWith } from 'rxjs/operators'

const patch = snabbdom.init([ // Init patch function with chosen modules
  classModule, propsModule, styleModule, eventlistenersModule
]);

import h from 'snabbdom/h'

class Component {

  vDom
  constructor() {

  }
  // events streams
  on() { }

  render() {
    this.view('asdkf')
  }

  view(props) {
    this.vDom = <button on-click={props}></button>;
    return this.vDom
  }

  getService() {

  }

  input() {

  }

  destroy() {

  }
}


const App = () => {

}

const Todos = (props) => {
  let action = {}
  const dom = () => {

  }

}

const Todo = (props, children) => {

  const action = new Subject()
  const doAction = (action) => {
    return (params) => {
      action.next({ action, params })
    }
  }

  const filterAction = (value) => filter(({ action }) => action === value)
  const on = (value) => action.pipe(filterAction(value))

  const dom = (props, children, internal) => <div key={Math.random()}
    hook={
      { postpatch: (old, vnode) => { console.log(vnode) } }
    }>
    <strong>{props.title}</strong>
    <input type="text" id="kdkd" on={{ input: (e) => doAction('input')(e) }} value={internal.value} />
    {children}
    <button on-click={(e) => doAction('update')(e)}>Update</button>
    <button on-click={(e) => doAction('update')(e)}>Delete</button>
  </div >

  let view = dom(props, children, {})

  const doUpdate = (vNode) => map(res => {
    vNode = update(vNode, dom(res, null, null))
    return vNode
  })

  const out = on('delete').pipe(tap(e => props.onDelete.next()))

  /** only need to do internal upates */
  on('input').pipe(
    doUpdate(view)
  )

  return view
}

const render = (ob) => {
  let res
  ob.subscribe((e) => res = e)
  return res
}

const update = (oldNode, newNode) => {
  // oldNode = patch(oldNode, newNode)
  return oldNode
}

var oldNode = document.getElementById('placeholder')
// update(oldNode, <div>kdfjksf</div>)

console.log(h('div', {}, []))
console.log(<div>kdsakfk</div>)
// alert('kdfk')


function Field(props, children) {

}