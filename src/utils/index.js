/* eslint-disable no-bitwise, radix, no-param-reassign */
/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Utilities/MatrixMath.js
 * */
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';

const { createIdentityMatrix } = MatrixMath;
const { multiplyInto } = MatrixMath;
/**
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin
 *  https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateX
 * */
function rotateXMatrix(matrix, deg) {
  const rad = (Math.PI / 180) * deg;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const rotate = [1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1];
  multiplyInto(matrix, matrix, rotate);
}

/**
 *  https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/perspective
 * */
function perspectiveMatrix(matrix, value) {
  const perspective = createIdentityMatrix();
  MatrixMath.reusePerspectiveCommand(perspective, value);
  multiplyInto(matrix, matrix, perspective);
}

/**
 *  https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate
 * */
function translateMatrix(matrix, origin) {
  const { x, y, z } = origin;
  const translate = createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(translate, x, y, z);
  multiplyInto(matrix, translate, matrix);
}

function untranslateMatrix(matrix, origin) {
  const { x, y, z } = origin;
  const unTranslate = createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(unTranslate, -x, -y, -z);
  multiplyInto(matrix, matrix, unTranslate);
}

function formatTime(days, hours, minutes, seconds) {
  if (days < 10) {
    days = `0${days}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

function formatNumberToTime(number) {
  const secNum = parseInt(number);
  const days = Math.floor(secNum / 86400);
  const hours = Math.floor((secNum - days * 86400) / 3600);
  const minutes = Math.floor((secNum - days * 86400 - hours * 3600) / 60);
  const seconds = secNum - days * 86400 - hours * 3600 - minutes * 60;
  return formatTime(days, hours, minutes, seconds);
}

function addTime(days, hours, minutes, seconds) {
  days = parseInt(days);
  hours = parseInt(hours);
  minutes = parseInt(minutes);
  seconds = parseInt(seconds);

  seconds += 1;
  if (seconds >= 60) {
    const m = (seconds / 60) << 0;
    minutes += m;
    seconds -= 60 * m;
  }

  if (minutes >= 60) {
    const h = (minutes / 60) << 0;
    hours += h;
    minutes -= 60 * h;
  }

  if (hours >= 24) {
    const d = (hours / 24) << 0;
    days += d;
    hours -= 60 * d;
  }

  return formatTime(days, hours, minutes, seconds);
}

function resetTime() {
  return formatTime(0, 0, 0, 0);
}

export default {
  createIdentityMatrix,
  multiplyInto,
  rotateXMatrix,
  perspectiveMatrix,
  translateMatrix,
  untranslateMatrix,
  formatNumberToTime,
  addTime,
  resetTime,
};
