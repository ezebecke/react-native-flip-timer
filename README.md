# react-native-flip-timer

> A Flip timer implementation in React Native. Fork from: https://github.com/pritishvaidya/react-native-flip-timer.

> This version adds "Reset" option and adds days to the timer

For Countdown Timer application you can checkout [react-native-flip-countdown-timer](https://github.com/pritishvaidya/react-native-flip-countdown-timer) repository.

## Show Cases

|                                IOS                                 |                                Android                                 |
| :----------------------------------------------------------------: | :--------------------------------------------------------------------: |
| ![IOS](https://media.giphy.com/media/BLs443ghS1AYHZwqc2/giphy.gif) | ![Android](https://media.giphy.com/media/vNpcUecdRzYazzhnK1/giphy.gif) |

## Getting Started

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Properties](#properties)
- [Defaults](#defaults)
- [Contribution](#contribution)
- [Questions](#questions)

### Installation

```bash
$ npm i ezebecke-react-native-flip-timer --save
```

### Basic Usage

```
import React, { Component } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { Timer, FlipNumber } from 'ezebecke-react-native-flip-timer';

export default class App extends Component {
  state = {
    play: true,
    reset: false
  }

  play = () => {
    this.setState(({ play }) => ({ play: !play }));
  }
  reset = () => {
    this.setState(({ reset }) => ({ reset: !reset }));
  };

  render() {
    const { play } = this.state;
    return (
      <View style={styles.container}>
        <Timer time={500} play={play} />
        <TouchableOpacity style={styles.button} onPress={this.play}>
          <Text style={styles.text}>{play ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.reset}>
          <Text style={styles.text}>Reset</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    backgroundColor: '#333333',
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cccccc',
  },
});
```

### Properties

#### Timer Props

| Prop            |                       Default | Type              | Description           |
| :-------------- | ----------------------------: | :---------------- | :-------------------- |
| time            |                      required | `string / number` | Time (in seconds)     |
| play            |                          true | bool              | Play the timer        |
| reset           |                         false | bool              | Reset the timer       |
| wrapperStyle    |                          `{}` | object            | Wrapper for the Timer |
| flipNumberProps | [`{...}`](#flip-number-props) | `defaults`        | Flip Number Props     |

#### Flip Number Props

| Prop               |   Default | Type                               | Description       |
| :----------------- | --------: | :--------------------------------- | :---------------- |
| number             |  required | `string / number`                  | Number Input      |
| unit               | `seconds` | `days / hours / minutes / seconds` | Number Input Unit |
| size               |  `number` | `deviceWidth / 6`                  | Size of the card  |
| perspective        |     `250` | number                             | Perspective       |
| numberWrapperStyle |      `{}` | object                             | Wrapper Style     |
| cardStyle          |      `{}` | object                             | Card Style        |
| flipCardStyle      |      `{}` | object                             | Flip Card Style   |
| numberStyle        |      `{}` | object                             | Number Style      |

## Todos

- Full Coverage Tests for the Components
- Support for Labels

## Contribution

- [@ezebecke](mailto:ezequiel.becke@gmail.com
- [@pritishvaidya] The main author.

## Questions

Feel free to [contact me](mailto:ezequiel.becke@gmail.com) or [create an issue](https://github.com/ezebecke/react-native-flip-timer)
