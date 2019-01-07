
import * as Snabbdom from 'snabbdom-pragma'
import { tap, map, withLatestFrom, switchMap, combineLatest } from 'rxjs/operators'
import { action, getHook, setState, valueChange, setValue, patchChange, emit, on, mv } from './lib'
import { Subject } from 'rxjs';
import { Todo } from './Todo'

const dom = (props, children) => {
  const todoUpdate = new Subject()

  return [
    <section>
      <input type="text"
        hook-init={() => { }}
        on-input={(e: any) => setValue('todo', e.target.value)} />
      <button on-click={function (e) {
        // emit(props.addTodo, 'aksdkf')
        action('addTodo', e.target)
        props.outputPon(e)
        // todo.elm.value = ""
      }}>Add</button>
      <button on-click={() => { }}>test</button>
      {props.items.map(todo => <Todo item={todo} onUpdate={(e) => action('todoUpdate', e)}></Todo>)}
    </section >,
    { todoUpdate }
  ]
}

function model(props, output) {
  // props.items = props.items || []
  // const hooks = getHooks(view)
  props.onUpdate = new Subject()
  props.onUpdate.pipe(tap(console.log)).subscribe()
  return on('addTodo').pipe(
    withLatestFrom(valueChange('todo')),
    map(res => res[1]),
    map((res: any) => {
      return { items: [{ title: res, id: new Date().getTime() }, ...props.items] }
    })
  )

}


export const Todos = mv(model, dom)
