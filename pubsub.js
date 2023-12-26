const PubNub = require('pubnub');

const credentials = {
  publishKey: 'pub-c-9e863886-4cc7-4eb5-bad6-c7365b71b4a1',
  subscribeKey: 'sub-c-cf2194e2-1a73-4e09-9b71-69b6e14cc19d',
  secretKey: 'sec-c-MzM4N2UyY2UtOWE5YS00MmZjLTllZmYtOWQ0NmUyOTIxNDUy',
  userId : 'daniel'
};

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub {
  constructor({ blockchain }) {
    this.blockchain = blockchain;

    this.publisher = new PubNub(credentials);
    this.subscriber = new PubNub(credentials);

    this.subscribeToChannels();

    this.subscriber.addListener({
      message: messageObject => this.handleMessage(messageObject)
    });
  }

  handleMessage(channel, message) {
    console.log(`Message received. Channel: ${channel}. Message: ${message}`);

    const parsedMessage = JSON.parse(message);

    if (channel === CHANNELS.BLOCKCHAIN) {
      this.blockchain.replaceChain(parsedMessage);
    }
  }

  subscribeToChannels() {
    Object.values(CHANNELS).forEach(channel => {
      this.subscriber.subscribe(channel);
    });
  }

  publish({ channel, message }) {
    this.publisher.publish({
      channel: channel,
      message: message
    }, (status, response) => {
      if (status.error) {
        console.log(`Publish Error: ${status.message}`);
      } else {
        console.log(`Message Published to Channel ${channel} at ${response.timetoken}`);
      }
    });
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }
}

module.exports = PubSub;