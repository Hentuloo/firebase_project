import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pl';

import gsap from 'gsap';
import { Draggable } from 'gsap/all';

// dayjs set locale and plugins
dayjs.extend(relativeTime);
dayjs.locale('pl');

// gsap draggable plugin
gsap.registerPlugin(Draggable);
