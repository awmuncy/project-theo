import { Command } from "commander";
import { closeLotCore } from "../../../../actions";

export function withdrawLotCommand(parent: Command) {
  parent
    .command("withdraw <lotId>")
    .description(`Remove a lot from offer`)
    .action(async (lotId: string) => {
      try {
        await closeLotCore(parseInt(lotId));
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    });
}
