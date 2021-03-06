// MC Name Checker - Made by BlueBlue21
import { readLines } from "https://deno.land/std/io/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

const namefiles = await Deno.open(path.join(Deno.cwd(), "names.txt"));

var checkednames: string[] = [];

console.log("MC Name Checker - Made By BlueBlue21");

for await (let line of readLines(namefiles)) {
    if (await checkname(line) === true) {
	if (line.length > 2) {
		let remove_null = /\s/;
		if (!remove_null.test(line)) {
			checkednames.push(line);
		};
	};
    };
};

createfile("checked_names",checkednames);

async function createfile(name: string, txt: any) {
    await Deno.writeTextFile(path.join(Deno.cwd(), `${name}.txt`), txt).then(() =>
        console.log("Checked!")
    );
};

async function checkname(name: string) {
    const mojangapi = await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`);

    if (mojangapi.statusText === "OK") {
        return false;
    } else {
	return true;
    };
};
