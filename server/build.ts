import { exec } from "child_process";
import os from "os";

console.log("Moving client files...");
if (os.type() === "Linux") {
    exec("mv build ./dist/app");
    exec("cp ./resources/audio ../dist/resources/audio");
} else if (os.type() === "Windows_NT") {
    exec("move build ./dist/app");
    exec("copy -r ./resources/audio ../dist/resources/audio", (error) => {
        if (error) {
            console.log(error.message);
        }
    });
}
