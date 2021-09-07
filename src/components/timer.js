import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import FlipNumber from './flip-number';
import Separator from './flip-number/separator';

import TransformUtils from '../utils';

import style from './style';

class Timer extends React.Component {
  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  componentDidMount() {
    const { time, play } = this.props;
    const {
      days, hours, minutes, seconds,
    } = TransformUtils.formatNumberToTime(time);
    this.setState(
      {
        days,
        hours,
        minutes,
        seconds,
      },
      () => {
        if (play) {
          this.timer = setInterval(() => this.updateTime(), 1000);
        }
      },
    );
  }

  shouldComponentUpdate(nextProps) {
    let { reset } = this.props;
    const { play } = this.props;
    if (nextProps.play !== play) {
      if (nextProps.play) {
        this.timer = setInterval(() => this.updateTime(), 1000);
      } else {
        clearInterval(this.timer);
      }
    }
    if (nextProps.reset !== reset) {
      reset = true;
      // _this3.resetTime();
      this.resetTime();
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateTime = () => {
    const {
      days, hours, minutes, seconds,
    } = this.state;
    const newState = TransformUtils.addTime(days, hours, minutes, seconds);
    this.setState(prevState => ({ ...prevState, ...newState }));
  };

  resetTime = () => {
    const newState = TransformUtils.resetTime(0, 0, 0, 0);
    this.setState(prevState => ({ ...prevState, ...newState }));
  };

  render() {
    const { wrapperStyle, flipNumberProps } = this.props;
    const {
      days, hours, minutes, seconds,
    } = this.state;
    return (
      <View style={[style.wrapper, wrapperStyle]}>
        {!!days && (
          <FlipNumber number={days} unit="days" {...flipNumberProps} />
        )}
        <Separator />
        {!!hours && (
          <FlipNumber number={hours} unit="hours" {...flipNumberProps} />
        )}
        <Separator />
        {!!minutes && (
          <FlipNumber number={minutes} unit="minutes" {...flipNumberProps} />
        )}
        <Separator />
        {!!seconds && (
          <FlipNumber number={seconds} unit="seconds" {...flipNumberProps} />
        )}
      </View>
    );
  }
}

Timer.defaultProps = {
  play: true,
  reset: false,
  wrapperStyle: {},
};

Timer.propTypes = {
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  play: PropTypes.bool,
  reset: PropTypes.bool,
  wrapperStyle: PropTypes.object,
  flipNumberProps: PropTypes.shape({
    size: PropTypes.number,
    perspective: PropTypes.number,
    numberWrapperStyle: PropTypes.object,
    cardStyle: PropTypes.object,
    flipCardStyle: PropTypes.object,
    numberStyle: PropTypes.object,
  }),
};

export default Timer;
