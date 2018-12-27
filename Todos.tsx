
import * as Snabbdom from 'snabbdom-pragma'
import { map, withLatestFrom, switchMap } from 'rxjs/operators'
import { setState, valueChange, setValue, patchChange, emit, on } from './lib'
import { Subject } from 'rxjs';

const action = new Subject()
export function Todos(props, children) {
  // props.items = []
  let todo = {}
  const hooks = getHooks(view)

  /** 
   * onAddItem
   * 
   */

  const dom = (props, children) =>
    <section>
      <input type="text"
        hook-init={

          res => todo = res}
        on-input={(e: any) => setValue('todo', e.target.value)} />
      {props.a}
      <button on-click={function (e) {
        emit(props.addTodo, 'aksdkf')
        // controlled from
        action.next('addTodo')
        // uncontroled form
        todo.elm.value = ""
      }}>Add</button>
      {props.items.map(todo =>
        <Todo item={todo}>{children}</Todo>
      )}
    </section>


  const view = dom(props, children)
  // of({props,children}),
  console.log(view, props, children)

  const mergeProps = () => { }
  on('addTodo').pipe(
    withLatestFrom(valueChange('todo')),
return { todo: 'ikdfk', fjk: 'dkfkk' }

  patchChange(view, dom, props, children)
  ).subscribe(console.warn)

  return view
}