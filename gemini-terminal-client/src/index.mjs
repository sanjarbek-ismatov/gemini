import readline from 'readline';
import Gemini from "gemini-ai";
import fetch from "node-fetch";
import chalk from 'chalk'
const gemini = new Gemini("AIzaSyDhrgv_yXR1pPrpG4xZmq3wpCFLmVH3tpQ", {
  fetch
}
);
const geminiChat = gemini.createChat();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function chat() {
  rl.question(chalk.bgBlue.white('Enter your message (type "sudo exit" to end):') + " ", async (answer) => {
    if (answer.toLowerCase() === 'sudo exit') {
      rl.close();
      return; // End the function if the user types "sudo exit"
    }

    // Process user input
    try {
      const result = await geminiChat.ask(answer);
      console.log(chalk.yellow(`\n\n${result}\n\n`));
    } catch (error) {
      console.error(chalk.bgRed("Error processing request:"), error);
    }

    // Continue the chat recursively
    chat();
  });
}

// Start the chat
chat();
