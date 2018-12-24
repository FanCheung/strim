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
import { Subject, Observable, ObjectUnsubscribedError } from 'rxjs'
import { tap, pluck, filter, map, startWith } from 'rxjs/operators'

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

const action = new Subject()

const fire = (a) => {
  return (data) => {
    action.next({ action: a, data })
  }
}

const filterAction = (value) => filter(({ action }) => action === value)
const on = (value) => action.pipe(filterAction(value), map((res: any) => ({ [value]: res.data })),
  tap(console.warn)
)


const App = (props) => {
  return <Todo></Todo>
}

const Todo = (props, children, ...k) => {
  let output = {
    delete: new Subject()
  }

  let state: any = {}

  const dom = (props, children, state) => <div key="9299999929"
    hook={
      { postpatch: (old, vnode) => { console.log(vnode) } }
    }>
    <strong>{props.title}</strong>
    <time>{props.date}</time>
    <input type="text" id="kdsf" key={1} on={{ input: (e: any) => fire('input')(e.target.value) }} value={props.value} />
    {children}
    {props.input}
    <button on-click={(e) => fire('update')(e)}>Update</button>
    <button on-click={(e) => fire('delete')(e)}>Delete</button>
  </div >

  let view = dom(props, children, state)
  const doUpdate = (vNode) => map(res => {

    vNode = update(vNode, dom(res, children, state))
    return vNode
  })

  const out = on('delete')
    .pipe(tap(e => props.onDelete.next()))

  on('input').pipe(
    map(res => Object.assign(props, res)),
    // attach(props,children,value)
    doUpdate(view)
  ).subscribe(console.log)
  return view

}

let todos = []
let Todos = (props, children) => {
  const getInstance = (instance) => {
    return (ref) => { instance = ref }
  }
  let todo = {}
  const attachRef = (dest) => (src) => { dest = src }
  const addTodo = new Subject()
  const dom = (props, children) =>
    <section>
      <input type="text"
        hook-init={attachRef(todo)}
        on-input={(e: any) => fire('todo')(e.target.value)} />
      <button on-click={function (e) {
        addTodo.next(props.todo)
        // console.log(props)
        console.log(todo.elm.value)
      }}>Add</button>
      <Todo>{children}</Todo>
    </section>

  const view = dom(props, children)
  return view
}


const render = (ob) => {
  let res
  ob.subscribe((e) => res = e)
  return res
}

const update = (oldNode, newNode) => {
  oldNode = patch(oldNode, newNode)
  return oldNode
}

var oldNode = document.getElementById('placeholder')
update(oldNode, <Todos
  a="kfk" dataset={{ action: 'reset' }} ></Todos>)
