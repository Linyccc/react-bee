/* eslint-disable */
import 'intl';
import { IEVersion } from '@/utils/utils';

if ([8, 9, 10, 11].indexOf(IEVersion()) !== -1) {
  document.getElementsByTagName('html')[0].setAttribute('class', `ie${IEVersion()}`);
}
require('raf').polyfill(window);
