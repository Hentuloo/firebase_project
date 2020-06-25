import * as dayjs from 'dayjs';
import Validator from 'validatorjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pl';
import 'react-toastify/dist/ReactToastify.css';

import gsap from 'gsap';
import { Draggable } from 'gsap/all';

// dayjs set locale and plugins
dayjs.extend(relativeTime);
dayjs.locale('pl');

// gsap draggable plugin
gsap.registerPlugin(Draggable);

// validator
Validator.useLang('pl');
