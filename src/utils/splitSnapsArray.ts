import dayjs from 'dayjs';
import { Snap } from 'store/reducers/soloTraining.reducer';

export const splitSnapsArray = (charts: Snap[]) =>
  charts.reduce<{
    times: number[];
    speeds: number[];
    accurances: number[];
    dates: string[];
  }>(
    (acc, { accuracy, speed, time, date }) => {
      acc.times.push(time);
      acc.speeds.push(speed);
      acc.accurances.push(accuracy);
      acc.dates.push(dayjs(date).fromNow());
      return acc;
    },
    { times: [], speeds: [], accurances: [], dates: [] },
  );
