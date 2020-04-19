class CheckSpace {
  constructor(diskCheckService) {
    this.diskCheckService = diskCheckService;
  }

  async getFreeSpace(path) {
    try {
      const { free } = await this.diskCheckService.check(path);
      return free;
    } catch (err) {
      return 0;
    }
  }
}

module.exports = {
  CheckSpace,
};
