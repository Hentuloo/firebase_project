const { CloudTasksClient } = require('@google-cloud/tasks');

export interface CreateCloudTaskProps {
  time: string;
  projectId?: string;
  location?: string;
  queue?: string;
  functionName: string;
  payload: any;
}

export const callFunctionByCloudTask = ({
  time = Date.now() / 1000 + 30, //30 seconds
  projectId = JSON.parse(process.env.FIREBASE_CONFIG).projectId,
  location = 'europe-west1',
  queue = 'firestore-ttl',
  functionName,
  payload,
}) => {
  console.info(`Create task: call ${functionName} function`);
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
      headers: { 'Content-Type': 'application/json' },
    },
    scheduleTime: { seconds: time },
  };
  return tasksClient.createTask({ parent: queuePath, task });
};
