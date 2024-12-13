import { Command } from "commander";
import { createLot } from "../../../../actions";

export function newLotCommand(parent: Command) {
  parent
    .command("add <userId> <coins> [itemInstanceIds...]")
    .description(`Create a lot for offer`)
    .action(
      async (userId: string, coins: string, itemInstanceIds: string[]) => {
        try {
          await createLot(
            userId,
            parseInt(coins),
            itemInstanceIds.map((itemId) => parseInt(itemId))
          );
        } catch (e) {
          console.error(e);
          process.exit(1);
        }
      }
    );
}
