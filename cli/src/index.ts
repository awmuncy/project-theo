#!/usr/bin/env node
import { program } from "./cmd";
import { itemCommand } from "./cmds/items";
import { tradesCommand } from "./cmds/trades";
import { utilCommand } from "./cmds/util";

itemCommand(program);
tradesCommand(program);
utilCommand(program);

program.option("-v, --verbose", "Verbose logging");

program.hook(
  "preAction",
  (cmd: { opts: () => { (): any; new (): any; verbose: boolean } }) => {
    console.log(`Starting up project Theo CLI run`);
  }
);

program.name("theo").description("Project Theo CLI");

//Register exit handler to flush+close loggers
process.on("beforeExit", async (code) => {
  console.log(`Exited Theo CLI run with code ${code}`);
});

//Run the command specified
program.parse(process.argv);
