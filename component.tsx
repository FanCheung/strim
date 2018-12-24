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
import { Subject, Observable, ObjectUnsubscribedError, Notification } from 'rxjs'
import { tap, pluck, filter, map, startWith, materialize } from 'rxjs/operators'
const patch = snabbdom.init([classModule, propsModule, styleModule, eventlistenersModule])
import h from 'snabbdom/h'


const state = new Subject()

const fire = (a) => {
  return (data) => {
    state.next({ action: a, data })
  }
}

const filterAction = (value) => filter(({ action }) => action === value)
const on = (value) => state.pipe(filterAction(value), map((res: any) => ({ [value]: res.data })),
  tap(console.warn)
)

const attachRef = (dest) => (src) => {
  console.log(src, dest)
  dest = src
  console.log(dest)
  return dest
}

const App = (props) => {
  return <Todo></Todo>
}

const Todo = (props, children, ...k) => {
  let output = {
    delete: new Subject()
  }

  let state: any = {}

  console.log(props)
  const dom = (props, children, state) => <div key="9299999929"
    hook={
      { postpatch: (old, vnode) => { console.log(vnode) } }
    }>
    <strong>{props.title}</strong>
    <time>{props.date}</time>
    <input type="text" id="kdsf" key={1} on={{ input: (e: any) => fire('input')(e.target.value) }} value={props.value} />
    {children}
    {props.item}
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


const Todos = (props, children) => {
  let todo = {}
  const addTodo = new Subject()
  // props.items = []
  const dom = (props, children) =>
    <section>
      <input type="text"
        hook-init={res => todo = res}
        on-input={(e: any) => fire('todo')(e.target.value)} />
      <button on-click={function (e) {
        // controlled from
        addTodo.next(todo.elm.value)
        // uncontroled form
        console.log(todo.elm.value)
        todo.elm.value = ""
      }}>Add</button>
      {props.items.map(todo =>
        <Todo item={todo}>{children}</Todo>
      )}
    </section>

  const view = dom(props, children)
  const doUpdate = (vNode, props) => tap(() => {
    vNode = update(vNode, dom(props, children))
    return vNode
  })

  addTodo.pipe(
    tap(() => console.log(props.todos)),
    map(todo => {
      props.todos.push(todo)
      return props
    }),
    // map(todos => Object.assign(props, { todos })),
    tap(console.log),
    // attach(props,children,value)
    doUpdate(view, props)
  ).subscribe()

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
  a="kfk" items={[]} dataset={{ action: 'reset' }} ></Todos>)


