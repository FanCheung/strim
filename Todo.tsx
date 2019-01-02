
import * as Snabbdom from 'snabbdom-pragma'
import { tap, map, mapTo, withLatestFrom, switchMap } from 'rxjs/operators'
import { action, getHook, setState, valueChange, setValue, patchChange, emit, on } from './lib'
// import classes from './todo.css'
// console.log(classes)
export const Todo = (props, children) => {
  let todo = {}
  // props.items = []
  const dom = (props, children) =>
    <section>
      <strong>{props.item.title}</strong>
      <input type="text" class={{ hidden: !props.edit }} on-input={(e: any) => setValue('todo', e.target.value)} />
      <button on-click={e => action('edit', null)}>Edit</button>
      <button class={{ hidden: !props.edit }} on-click={e => action('save', null)}>Save</button>
      <button on-click={e => action('delete', null)}>Remove</button>
    </section>

  const view = dom(props, children)
  console.log(props)
  // of({props,children}),
  on('edit').pipe(mapTo({ edit: true }))
  on('save').pipe(tap(() => emit('onSave', null)), mapTo({ edit: false }))
  on('delete').pipe(tap(() => emit('onDelete', null)))

  on('edit').pipe(
    map(todo => {
      props.items.push(todo)
      return props
    }),
    map(todos => Object.assign(props, { todos })),
    patchChange(view, dom, props, children)
  ).subscribe()

  return view
}