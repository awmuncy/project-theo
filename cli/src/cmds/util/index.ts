import { Command } from "commander";
import { junkCommand } from "./junk";

export const utilCommand = async (parent: Command) => {
  const utilCmd = parent.command("util").action(async () => {
    console.log("util");
  });

  junkCommand(utilCmd);
};
