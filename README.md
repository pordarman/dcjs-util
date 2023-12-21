## [![Alisa Logo](https://i.hizliresim.com/aug2sp9.png)](https://www.npmjs.com/package/dcjs-util/)

[![Package Name](https://img.shields.io/badge/Package%20name-dcjs-util-red)](https://www.npmjs.com/package/dcjs-util/)
[![Package size](https://img.shields.io/bundlephobia/min/dcjs-util?label=Package%20size)](https://www.npmjs.com/package/dcjs-util/)
[![Version](https://img.shields.io/npm/v/dcjs-util.svg?label=Package%20version)](https://www.npmjs.com/package/dcjs-util/)
[![License](https://img.shields.io/npm/l/dcjs-util.svg?label=License)](https://www.npmjs.com/package/dcjs-util/)

[![NPM](https://nodei.co/npm/dcjs-util.png?downloads=true)](https://www.npmjs.com/package/dcjs-util/)

# Source file

- [dcjs-util](https://github.com/pordarman/dcjs-util)

<br>

# Creator(s)

- [Ali (Fearless Crazy)](https://github.com/pordarman)

<br>

# Social media accounts

- Ali: [Instagram](https://www.instagram.com/ali.celk/) - [Discord](https://discord.com/users/488839097537003521) - [Spotify](https://open.spotify.com/user/215jixxk4morzgq5mpzsmwwqa?si=41e0583b36f9449b)

<br>

# How to download?

- First we create a [node.js](https://nodejs.org/en/) file (If you have not downloaded [node.js](https://nodejs.org/en/) to computer before, you can download node.js by [clicking here](https://nodejs.org/en/))

- Then we open the PowerShell terminal by "shift + right click" on the folder of the file you created.

![Opening the PowerShell terminal](https://i.hizliresim.com/gbwgora.png)

- Then we write **npm i dcjs-util** and press enter.

- Download the dcjs-util module

- And now we have downloaded the **dcjs-util** module, congratulations 🎉🎉

<br>

# What is this module?

- This module allows you to easily use commands using the **[discord.js](https://www.npmjs.com/package/discord.js/)** library

- It increases the performance of your bot by making discord.js **more performant** than commands in some commands

- Moreover, we add comment lines so that you can understand the commands so that you can edit the commands

- This module was made with the sole purpose of helping people, without generating any income

<br>

# So how to use?

It's very simple, first you have to open any node.js file and write the following in it:
<br>

```js
const DiscordUtils = require("dcjs-util");
const memberRoleId = "12345678901234567";

client.on("messageCreate", async (message) => {
  // If user is bot
  if (message.author.bot) return;

  if (message.content.toLowerCase() == "!role") {
    const member = message.member;

    // If user doesn't have member role
    if (!DiscordUtils.hasRole(member, memberRoleId)) {
      try {
        // Add role
        await DiscordUtils.addRole(member, memberRoleId);

        return message.reply({
          content: `Successfully added role <@&${memberRoleId}>!`,
          allowedMentions: {
            repliedUser: true,
            roles: [],
          },
        });
      } catch (error) {
        // If an error occurred
        console.log(error);
        message.reply("Something went wrong!");
      }
    }
    // If user has member role
    else {
      try {
        // Remove role
        await DiscordUtils.removeRole(member, memberRoleId);

        return message.reply({
          content: `Successfully removed role <@&${memberRoleId}>!`,
          allowedMentions: {
            repliedUser: true,
            roles: [],
          },
        });
      } catch (error) {
        // If an error occurred
        console.log(error);
        message.reply("Something went wrong!");
      }
    }
  }
});
```

or like this

```js
const DiscordUtils = require("dcjs-util");

client.on("messageCreate", async (message) => {
  // If user is bot
  if (message.author.bot) return;

  if (message.content.toLowerCase() == "!countrole") {
    // Capture the roles she/he tagged or entered the ID in the message
    const allRoles = await DiscordUtils.fetchRolesInContent(message.guild, message.content);

    return message.reply(`You mentioned exactly ${allRoles.size} roles in your message`)
  }
});
```

By typing this you can access **all** commands of the module!

<br>

# So why dcjs-util?

- The first reason is that it is overly simple and less likely to fail

- The second reason is that since it is an open source module, it can be edited in a special way if you want

- The third reason is that we are improving this module every day, making it more performance and adding new features to our strength

- The fourth reason is... Well, I guess there's no other reason :( Maybe it's just to make me happy 👉👈

<br>

# Updates

## v0.0.1

- Module shared publicly 🥳🥳

<br>

Please do not forget to use it in the latest version for more **stable** and **performance** of the module!

<br>

# And finally

- If you want to support this module, if you request me on [github](https://github.com/pordarman), I will be happy to help you.

- Thank you for reading this far, i love you 💗

- See you in my next modules!

<br>

![lovee](https://gifdb.com/images/high/drake-heart-hands-aqm0moab2i6ocb44.webp)
