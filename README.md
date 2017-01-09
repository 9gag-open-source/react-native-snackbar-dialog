# react-native-snackbar-dialog

A React Native SnackBar component with configurable dialog.

## Preview

A SnackBar component that can display inline: <br />
![Inline Mode](./docs/inline.png)

And also can display as dialog: <br />
![Flat Mode](./docs/flat.png)

## Installation

```sh
yarn add react-native-snackbar-dialog
```

## Basic Usage

```javascript
import SnackBar from 'react-native-snackbar-dialog'
```

A SnackBar that will disappear after 5 seconds with `onDismiss` callback.
```jsx
<SnackBar onDismiss={() => { console.log('Good Bye!) }}>
  Making the world happier
</SnackBar>
```

Render without auto disappearing.
```jsx
<SnackBar isStatic>
  Making the world happier
</SnackBar>
```

Explictly set the duration to disappear.
```jsx
<SnackBar duration={8000}>
  Making the world happier
</SnackBar>
```

An inline SnackBar.
```jsx
<SnackBar
  confirmText='Learn more'
  onConfirm={() => { console.log('Thank you') }}
>
  Making the world happier
</SnackBar>
```

A dialog with separated row display.
```jsx
<SnackBar
  confirmText='Learn more'
  onConfirm={() => { console.log('Thank you') }}
  cancelText='No thanks'
  onCancel={() => { console.log('Hope to see you again') }}
>
  Making the world happier
</SnackBar>
```

A SnackBar with confirgurable style.
```jsx
<SnackBar
  style={{ marginBottom: 20 }}
  backgroundColor='white'
  buttonColor='blue'
  textColor='yellow'
>
  Making the world happier
</SnackBar>
```

## Using with Redux

This library can be integrated with any Redux applications to handle messages to be displayed with proper order.

### Usages

> SnackBar.actions.add(item)

If there isn't any items in the Store, it will show it immediately. Otherwise, it will enqueue and show it accordingly when `dismiss` is triggered.

> SnackBar.actions.show(item)

Some operations like taking a screenshot require the message to show immediately. Using this method will not change the queue order.

> SnackBar.actions.dismiss()

Once a dismiss is triggered, it will show the next message in the queue.

### Example

```jsx
import { View, Text } from 'react-native'
import SnackBar from 'react-native-snackbar-dialog'
import connect from 'react-redux'

function RootContainer ({ snack, add, show, dismiss }) {
  const item = {
    children: 'Making the world happier',
    confirmText='Learn more'
    onConfirm={() => { console.log('Thank you') }}
    onDismiss={dismiss}
  }

  return (
    <View>
      <Text onPress={() => add(item)}>Enqueue</Text>
      <Text onPress={() => show(item)}>Show</Text>
      { snack && <SnackBar {...snack} /> }
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    snack: state.snackBar.current
  }
}

const mapDispatchToProps = (dispatch) => ({
  addSnack: (item) => dispatch(SnackBar.actions.add(item)),
  showSnack: (item) => dispatch(SnackBar.actions.show(item)),
  dismissSnack: () => dispatch(SnackBar.actions.dismiss())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
```