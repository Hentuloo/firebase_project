const { CloudTasksClient } = require('@google-cloud/tasks');

export interface CreateCloudTaskProps {
  time: string;
  projectId?: string;
  location?: string;
  queue?: string;
  functionName: string;
  payload: any;
  headers?: { [key: string]: string };
}

export const callFunctionByCloudTask = ({
  time = Date.now() / 1000 + 30, //30 seconds
  projectId = JSON.parse(process.env.FIREBASE_CONFIG).projectId,
  location = 'europe-west1',
  queue = 'firestore-ttl',
  functionName,
  payload,
  headers = {},
}) => {
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
  functionName?: string;
  taskName: string;
}
export const deleteCloudTask = ({
  functionName,
  taskName,
}: DeleteCloudTaskProps) => {
  console.info(`CANCEL: cloud task ${functionName || '-'}`);
  const tasksClient = new CloudTasksClient();
  return tasksClient.deleteTask({ name: taskName });
};
