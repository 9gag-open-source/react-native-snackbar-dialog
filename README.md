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

## Usage

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