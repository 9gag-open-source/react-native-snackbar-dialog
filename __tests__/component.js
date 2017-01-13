import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import SnackBar from '../src/SnackBar'

// Using react-test-renderer
it('renders static SnackBar properly', () => {
  const tree = renderer.create(
    <SnackBar isStatic>
      Making the world happier
    </SnackBar>
  ).toJSON()

  expect(tree).toMatchSnapshot()

  expect(tree.type).toBe('View')
  expect(tree.children).toHaveLength(1)

  const children = tree.children[0]

  expect(children.type).toBe('Text')
  expect(children.children[0]).toBe('Making the world happier')
})

// Using Enzyme
it('renders inline SnackBar properly', () => {
  let isClicked = false
  const onConfirm = () => { isClicked = true }

  const wrapper = shallow(
    <SnackBar confirmText='Learn more' onConfirm={onConfirm}>
      Making the world happier
    </SnackBar>
  )

  const inlineView = wrapper.children()
  expect(inlineView.text()).toBe('<View />')
  const inlineStyle = inlineView.props().style
  expect(inlineStyle.justifyContent).toBe('space-between')

  const buttonWrapper = inlineView.children().last()
  expect(inlineView.text()).toBe('<View />')
  expect(buttonWrapper.children().props().children).toBe('Learn more')

  expect(isClicked).toBe(false)
  buttonWrapper.props().onPress()
  expect(isClicked).toBe(true)
})

it('renders dialog SnackBar properly', () => {
  let isClicked = false
  const onCancel = () => { isClicked = true }

  const wrapper = shallow(
    <SnackBar
      confirmText='Learn more'
      onConfirm={() => {}}
      cancelText='No thanks'
      onCancel={onCancel}
    >
      Making the world happier
    </SnackBar>
  )

  const viewWrapper = wrapper.children().children()
  expect(viewWrapper.length).toBe(2)

  const actionRowWrapper = viewWrapper.last()
  expect(actionRowWrapper.text()).toBe('<View />')
  expect(actionRowWrapper.children()).toHaveLength(2)

  const cancelButtonWrapper = actionRowWrapper.children().first()
  const confirmButtonWrapper = actionRowWrapper.children().last()

  expect(cancelButtonWrapper.children().props().children).toBe('No thanks')

  expect(isClicked).toBe(false)
  confirmButtonWrapper.props().onPress()
  expect(isClicked).toBe(false)
  cancelButtonWrapper.props().onPress()
  expect(isClicked).toBe(true)
})

it('renders SnackBar styles properly', () => {
  const wrapper = shallow(
    <SnackBar
      style={{ marginBottom: 20 }}
      backgroundColor='white'
      textColor='yellow'
      confirmText='Learn more'
      buttonColor='blue'
    >
      Making the world happier
    </SnackBar>
  )

  expect(wrapper.text()).toBe('<AnimatedComponent />')

  // backgroundColor='white'
  const [originalStyle, ...wrapperStyles] = [...wrapper.props().style]
  expect(originalStyle.position).toBe('absolute')
  expect(originalStyle.bottom).toBe(-180)
  expect(wrapperStyles).toHaveLength(2)
  expect(wrapperStyles.shift().backgroundColor).toBe('white')
  expect(wrapperStyles.shift()).toMatchObject({ marginBottom: 20 })

  const inlineWrapper = wrapper.children()
  expect(inlineWrapper.text()).toBe('<View />')
  expect(inlineWrapper.children()).toHaveLength(2)

  // textColor='yellow'
  const titleWrapper = inlineWrapper.children().first()
  expect(titleWrapper).toHaveLength(1)
  expect(titleWrapper.text()).toBe('<Text />')
  expect([...titleWrapper.props().style].pop()).toMatchObject({ color: 'yellow' })

  // buttonColor='blue'
  const buttonWrapper = inlineWrapper.children().last().children()
  expect(buttonWrapper.text()).toBe('<Text />')
  expect([...buttonWrapper.props().style].pop()).toMatchObject({ color: 'blue' })
})
