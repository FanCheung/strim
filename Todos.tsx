
import * as Snabbdom from 'snabbdom-pragma'
import { map } from 'rxjs/operators'
import { setState, onStateChange, patchChange } from './lib'

export function Todo(props, children) {
  let todo = {}
  // props.items = []
  const dom = (props, children) =>
    <section>
      <input type="text"
        hook-init={res => todo = res}
        on-input={(e: any) => setState('todo', e.target.value)} />
      <button on-click={function (e) {
        // controlled from
        setState(props.stodos, [todo.elm.value, ...props.todos])
        // uncontroled form
        todo.elm.value = ""
      }}>Add</button>
      {/* {props.items.map(todo =>
        <Todo item={todo}>{children}</Todo>
      )} */}
    </section>

  const view = dom(props, children)
  // of({props,children}),
  onStateChange('todo').pipe(
    map(todo => {
      return todo
    }),
    // map(todos => Object.assign(props, { todos })),
    // attach(props,children,value)
    patchChange(view, dom(props, children), props, children)
  ).subscribe()
  return view
}