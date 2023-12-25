const PubNub = require('pubnub');

const credentials = {
  publishKey: 'pub-c-9e863886-4cc7-4eb5-bad6-c7365b71b4a1',
  subscribeKey: 'sub-c-cf2194e2-1a73-4e09-9b71-69b6e14cc19d',
  secretKey: 'sec-c-MzM4N2UyY2UtOWE5YS00MmZjLTllZmYtOWQ0NmUyOTIxNDUy',
  userId : 'daniel'
};

const CHANNELS = {
  TEST: 'TEST'
};

class PubSub {
  constructor() {
    this.pubnub = new PubNub(credentials);

    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });

    this.pubnub.addListener(this.listener());
  }

  listener() {
    return {
      message: messageObject => {
        const { channel, message } = messageObject;

        console.log(`Message received. Channel: ${channel}. Message: ${message}`);
      }
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}

module.exports = PubSub;