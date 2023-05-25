class Message {
  constructor(timeStamp, user, payload, type) {
    this.timeStamp = timeStamp;
    this.user = user;
    this.payload = payload;
    this.type = type;
  }
}

module.exports = Message;