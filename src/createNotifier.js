const createNotifier = async ({
  notifyService,
  checkspaceService,
  path,
  minimumSpace,
}) => {
  const freeSpace = await checkspaceService.getFreeSpace(path);
  if (minimumSpace < freeSpace) {
    notifyService.notify();
  }
};

module.exports = {
  createNotifier,
};
