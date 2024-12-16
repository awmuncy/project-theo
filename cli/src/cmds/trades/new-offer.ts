import { Command } from "commander";
import { createOfferCore } from "../../../../actions";

export function newOfferCommand(parent: Command) {
  parent
    .command("offer <userId> <lotId> <coins> [itemInstanceIds...]")
    .description(`Create a lot for offer`)
    .action(
      async (
        userId: string,
        lotId: string,
        coins: string,
        itemInstanceIds: string[]
      ) => {
        try {
          await createOfferCore(
            parseInt(userId),
            parseInt(lotId),
            parseInt(coins),
            itemInstanceIds
          );
        } catch (e) {
          console.error(e);
          process.exit(1);
        }
      }
    );
}
