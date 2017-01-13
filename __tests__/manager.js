import RootSiblings from 'react-native-root-siblings'
import SnackBarManager from '../src/SnackBarManager'

const TITLE = 'Making the world happier'

it('shows Snack item properly', () => {
  const SnackBar = new SnackBarManager()

  SnackBar.show(TITLE)

  const { current, queue } = SnackBar.get()
  expect(current).toBeInstanceOf(RootSiblings)
  expect(queue).toHaveLength(0)
})

it('adds Snack item immediately when there is no active item', () => {
  const SnackBar = new SnackBarManager()

  SnackBar.add(TITLE)

  const { current, queue } = SnackBar.get()
  expect(current).toBeInstanceOf(RootSiblings)
  expect(queue).toHaveLength(0)
})

it('adds Snack item properly when there is an active item', () => {
  const SnackBar = new SnackBarManager()
  const newTitle = 'Making a happier world'

  SnackBar.add(TITLE)
  SnackBar.add(newTitle)

  const { current, queue } = SnackBar.get()

  expect(current).toBeInstanceOf(RootSiblings)
  expect(queue).toHaveLength(1)
  expect(queue[0]).toMatchObject({
    title: newTitle
  })
})

it('should dismiss current item properly', () => {
  const SnackBar = new SnackBarManager()

  SnackBar.add(TITLE, () => {
    SnackBar.dismiss(() => {
      const { current, queue } = SnackBar.get()

      expect(current).toBeNull()
      expect(queue).toHaveLength(0)
    })
  })
})

it('should show the next item when dismissing', () => {
  const SnackBar = new SnackBarManager()
  const newTitle = 'Making a happier world'

  SnackBar.add(TITLE, () => {
    SnackBar.add(newTitle, () => {
      SnackBar.dismiss(() => {
        const { current, queue } = SnackBar.get()

        expect(current).toBeInstanceOf(RootSiblings)
        expect(queue).toHaveLength(0)
      })
    })
  })
})
