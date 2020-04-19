const os = require("os");
const disk = require("diskusage");
const notifier = require("node-notifier");

const { Notify } = require("./src/utils/notify");
const { CheckSpace } = require("./src/utils/checkspace");

const { formatSize } = require("./src/utils/formatSize");
const { createNotifier } = require("./src/createNotifier");

const ARGS = ["--minimum-space", "-m"];
const main = () => {
  const path = os.platform() === "win32" ? "c:" : "/";
  const args = process.argv.slice(2);
  const validArguments = ARGS.some((arg) => args[0].startsWith(arg));

  if (!args.length || !validArguments) {
    console.log(
      "Invalid or no arguments were provided. Valid flags: --minimum-space, -m. Example: --minimum-space=1000"
    );
  } else {
    try {
      const minimumSpace = Number(args[0].split("=").pop());
      if (isNaN(minimumSpace)) throw new Error(`Byte size must be a number, got: ${minimumSpace} instead.`)

      createNotifier({
        notifyService: new Notify(notifier, {
          message: `You have reached minimum disk usage limit of: ${formatSize(
            minimumSpace
          )}`,
        }),
        checkspaceService: new CheckSpace(disk),
        path,
        minimumSpace,
      });
    } catch (error) {
      console.log({
        errorMessage: error.message,
        trace: error.stack,
      });
    }
  }
};

if (require.main === module) {
  main();
}
