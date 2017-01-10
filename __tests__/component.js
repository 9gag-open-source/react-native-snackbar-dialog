import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import SnackBar from '../src'

it('renders static SnackBar properly', () => {
  const tree = renderer.create(
    <SnackBar isStatic>
      Making the world happier
    </SnackBar>
  ).toJSON()

  expect(tree).toMatchSnapshot()

  expect(tree.type).toBe('View')
  expect(tree.children.length).toBe(1)

  const children = tree.children[0]

  expect(children.type).toBe('Text')
  expect(children.children[0]).toBe('Making the world happier')
})

it('renders inline SnackBar properly', () => {
  let isClicked = false

  const onConfirm = () => { isClicked = true }

  // const tree = renderer.create(
  const wrapper = shallow(
    <SnackBar confirmText='Learn more' onConfirm={onConfirm}>
      Making the world happier
    </SnackBar>
  )

  const inlineView = wrapper.children()
  const inlineStyle = inlineView.props().style

  expect(inlineStyle.justifyContent).toBe('space-between')

  const buttonWrapper = inlineView.first().children().last()
  const buttonText = buttonWrapper.children().first().props().children

  expect(buttonText).toBe('Learn more')

  expect(isClicked).toBe(false)
  buttonWrapper.props().onPress()
  expect(isClicked).toBe(true)
})
