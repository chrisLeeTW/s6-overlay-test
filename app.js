const _ = require('lodash');
const uuid = require('uuid/v4');

const severity = ['Debug', 'Info', 'Notice', 'Warning', 'Error', 'Critical', 'Alert'];

const sleepMs = (n) => {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

const sleep = (n) => {
  for (i = 1; i <= n; i++) {
    console.log(`sleep in ${i} sec.`);
    sleepMs(1000);
  }
}

const logger = (uuid) => {
  const body = {
    id: uuid,
    botStatus: true,
    status: false,
    total: 10000,
    note: 'hello',
  };
  console.log(
    '%j',
    { body, type: 'access_log', severity: _.sample(severity) },
  );
};

const CronJob = require('cron').CronJob;

const cron = new CronJob(
  '* * * * *',
  () => {
    logger(uuid());
    sleep(30);
    console.log('sleep done.');
  },
  null,
  true
);

process.on('SIGINT', () => { console.log('SIGINT exit caught.'); cron.stop(); });
process.on('SIGTERM', () => { console.log('SIGTERM exit caught.'); cron.stop(); });

cron.start();
