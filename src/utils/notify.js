const path = require("path");

class Notify {
  constructor(
    notifyService,
    config
  ) {
    this.notifyService = notifyService;
    this.config = {
      title: "Disk alert notification",
      message: "You are reaching your disk limit.",
      icon: path.join(process.cwd(), 'assets/disk.png'),
      wait: true,
      ...config
    }
  }

  notify() {
    this.notifyService.notify(this.config);
  }
}

module.exports = {
  Notify,
};
