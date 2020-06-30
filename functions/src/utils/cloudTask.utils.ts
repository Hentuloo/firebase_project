const { CloudTasksClient } = require('@google-cloud/tasks');

export interface CreateCloudTaskProps {
  /**
   * name of the cloud function
   * e.g. !!! export const yourfunctionName = firestore.region().https()
   */
  functionName: string;
  /**
   * any payload for called function
   */
  payload: any;
  /**
   * time in unix, when task will call
   */
  time?: number;
  /**
   * Secret projectId (usually get from process.env.FIREBASE_CONFIG)
   */
  projectId?: string;
  /**
   * function location
   */
  location?: string;
  queue?: string;
  /**
   * set custom headers for cloud task
   */
  headers?: { [key: string]: string };
}
export type CreateCloudTaskResponse = Promise<[{ name: string }]>;

/**
 *  Create cloud task
 *  this will return promise that return created function name and other
 * @see {@link https://cloud.google.com/tasks/docs/reference/rpc/google.cloud.tasks.v2#google.cloud.tasks.v2.Task}
 */
export const callFunctionByCloudTask = ({
  time = Date.now() / 1000 + 30, //30 seconds
  projectId = JSON.parse(process.env.FIREBASE_CONFIG).projectId,
  location = 'europe-west1',
  queue = 'firestore-ttl',
  functionName,
  payload,
  headers = {},
}: CreateCloudTaskProps): CreateCloudTaskResponse => {
  console.info(`CREATE: cloud task ${functionName}`);
  const tasksClient = new CloudTasksClient();
  const queuePath: string = tasksClient.queuePath(
    projectId,
    location,
    queue,
  );
  const url = `https://${location}-${projectId}.cloudfunctions.net/${functionName}`;

  const task = {
    httpRequest: {
      httpMethod: 'POST',
      url,
      body: Buffer.from(JSON.stringify(payload)).toString('base64'),
      headers: { 'Content-Type': 'application/json', ...headers },
    },
    scheduleTime: { seconds: time },
  };
  return tasksClient.createTask({ parent: queuePath, task });
};
export interface DeleteCloudTaskProps {
  /**
   * name that was returned when cloud-task was created
   */
  taskName: string;
  /**
   * This param will call console.info that your functionName is canel
   *
   * then you can see it in cloud-functions console
   */
  functionName?: string;
}
/**
 * Delete cloud task
 * @see {@link https://cloud.google.com/tasks/docs/reference/rpc/google.cloud.tasks.v2#google.cloud.tasks.v2.Task}
 */
export const deleteCloudTask = ({
  functionName,
  taskName,
}: DeleteCloudTaskProps) => {
  console.info(`CANCEL: cloud task ${functionName || '-'}`);
  const tasksClient = new CloudTasksClient();
  return tasksClient.deleteTask({ name: taskName });
};
