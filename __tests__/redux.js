import SnackBar from '../src'
import { INITIAL_STATE, transformProps } from '../src/reducer'

it('transforms Snack item properly', () => {
  const transformedProps = transformProps({
    title: 'Making the world happier'
  })

  expect(transformedProps).toMatchObject({
    children: 'Making the world happier'
  })
})

it('shows Snack item properly', () => {
  const item = {
    title: 'Making the world happier'
  }

  const showState = SnackBar.reducer(INITIAL_STATE, SnackBar.actions.show(item))
  const state = SnackBar.reducer(INITIAL_STATE, SnackBar.actions.add(item))

  expect(showState).toMatchObject(state)

  expect(state.current).toMatchObject({
    children: 'Making the world happier'
  })

  expect(state.items).toHaveLength(0)
})

it('adds Snack item properly when there is an active item', () => {
  const item = {
    children: 'Making the world happier'
  }

  const newItem = {
    children: 'Making a happier world'
  }

  const state = SnackBar.reducer({ current: item, items: [] }, SnackBar.actions.add(newItem))

  expect(state.current).toMatchObject(item)
  expect(state.items).toHaveLength(1)
  expect(state.items[0]).toMatchObject(newItem)

  const newState = SnackBar.reducer(state, SnackBar.actions.add(newItem))

  expect(newState.current).toMatchObject(item)
  expect(newState.items).toHaveLength(2)
  expect([...newState.items].pop()).toMatchObject(newItem)
})

it('adds Snack item properly and shows the first item when it is inactive', () => {
  const item = {
    children: 'Making the world happier'
  }

  const newItem = {
    children: 'Making a happier world'
  }

  const state = SnackBar.reducer({ current: null, items: [item] }, SnackBar.actions.add(newItem))

  expect(state.current).toMatchObject(item)
  expect(state.items).toHaveLength(1)
  expect(state.items[0]).toMatchObject(newItem)
})

it('should dismiss current item properly', () => {
  const item = {
    children: 'Making the world happier'
  }

  const state = SnackBar.reducer({ current: item, items: [] }, SnackBar.actions.dismiss())

  expect(state.current).toBeNull()
  expect(state.items).toHaveLength(0)
})

it('should show the next item when dismissing', () => {
  const item = {
    children: 'Making the world happier'
  }

  const newItem = {
    children: 'Making a happier world'
  }

  const state = SnackBar.reducer({ current: item, items: [newItem] }, SnackBar.actions.dismiss())

  expect(state.current).toMatchObject(newItem)
  expect(state.items).toHaveLength(0)
})
