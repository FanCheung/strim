
import * as Snabbdom from 'snabbdom-pragma'
import { map } from 'rxjs/operators'
import { setState, onStateChange, patchChange } from './lib'
import { Subject } from 'rxjs';

const action = new Subject()
export function Todo(props, children) {
  // props.items = []
  let todo = {}
  const dom = (props, children) =>
    <section>
      <input type="text"
        hook-init={res => todo = res}
        on-input={(e: any) => setState('todo', e.target.value)} />
      <button on-click={function (e) {
        // controlled from
        action.next('addTodo')
        // uncontroled form
        todo.elm.value = ""
      }}>Add</button>
      {/* {props.items.map(todo =>
        <Todo item={todo}>{children}</Todo>
      )} */}
    </section>

  const view = dom(props, children)
  // of({props,children}),
 onStateChange('addTodo').pipe() 
  onStateChange('todo')
    .pipe(
      map(items => Object.assign(props, { items })),
      patchChange(view, dom(props, children), props, children)
    ).subscribe()
  return view
}