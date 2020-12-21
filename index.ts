// MC Name Checker - Made by BlueBlue21
import { readLines } from "https://deno.land/std/io/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

const namefiles = await Deno.open(path.join(Deno.cwd(), "names.txt"));

var checkednames: string[] = [];

console.log("MC Name Checker - Made By BlueBlue21")

for await (let line of readLines(namefiles)) {
    let checknames = await checkname(line);

    if (checknames) {
        checkednames.push(checknames);
    };
};

createfile("checked_names",checkednames);

async function createfile(name: string, txt: any) {
    await Deno.writeTextFile(path.join(Deno.cwd(), `${name}.txt`), txt).then(() =>
        console.log("Comple!")
    );
}

async function checkname(name: string) {
    const mojangapi = await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`);

    if (mojangapi.statusText === "OK") {
        return name;
    };
};