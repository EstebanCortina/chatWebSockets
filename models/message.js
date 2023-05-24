class Message {
  constructor(timeStamp, user, payload) {
    this.timeStamp = timeStamp;
    this.user = user;
    this.payload = payload;
  }
}

module.exports = Message;