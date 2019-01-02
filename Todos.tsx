
import * as Snabbdom from 'snabbdom-pragma'
import { tap, map, withLatestFrom, switchMap, combineLatest } from 'rxjs/operators'
import { action, getHook, setState, valueChange, setValue, patchChange, emit, on } from './lib'
import { Subject } from 'rxjs';
import { Todo } from './Todo'

export function Todos(props, children) {
  props.items = props.items || []
  let todo = {}
  // const hooks = getHooks(view)
  props.onUpdate = new Subject()
  /** 
   * onAddItem
   */
  const dom = (props, children) =>
    <section>
      <input type="text"
        hook-init={
          res => todo = res}
        on-input={(e: any) => setValue('todo', e.target.value)} />
      <button on-click={function (e) {
        // emit(props.addTodo, 'aksdkf')
        // controlled from
        action('addTodo', e.target)
        // uncontroled form
        // todo.elm.value = ""
      }}>Add</button>
      {props.items.map(todo => <Todo item={todo} onUpdate={e => props.onUpdate.next(e)}></Todo>)}
    </section>
  const view = dom(props, children)
  const mergeProps = (arr: any) => Object.assign.apply(arr)

  props.onUpdate.pipe(tap(console.log)).subscribe()
  on('addTodo').pipe(
    withLatestFrom(valueChange('todo')),
    map(res => res[1]),
    tap((res: any) => props.items.push({ title: res.todo, id: new Date().getTime() })),
    patchChange(view, dom, props, children)
  ).subscribe(console.warn)

  return view
}