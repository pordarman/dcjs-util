## [![Alisa Logo](https://i.hizliresim.com/aug2sp9.png)](https://www.npmjs.com/package/dcjs-util/)

[![Package Name](https://img.shields.io/badge/dcjs-util?logo=npm&logoColor=red&label=Package%20name&color=red)](https://www.npmjs.com/package/dcjs-util/)
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

- First we create a [node.js](https://nodejs.org/en/) file (If you have not downloaded [node.js](https://nodejs.org/en/) to computer before, you can download [node.js](https://nodejs.org/en/) by [clicking here](https://nodejs.org/en/))

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

It's very simple, first you have to open your discord bot file and write the following in it:
<br>

## Taking and giving roles

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

<hr>

## Count role, channel, member or user

```js
const DiscordUtils = require("dcjs-util");

client.on("messageCreate", async (message) => {
  // If user is bot
  if (message.author.bot) return;

  if (message.content.toLowerCase().startsWith("!countrole")) {
    // Capture the roles she/he tagged or entered the ID in the message
    const allRoles = DiscordUtils.fetchRolesInContent(
      message.guild,
      message.content
    );

    return message.reply(
      `You mentioned exactly ${DiscordUtils.toHumanize(
        allRoles.size
      )} roles in your message`
    );
  } else if (message.content.toLowerCase().startsWith("!countchannel")) {
    // Capture the channels she/he tagged or entered the ID in the message
    const allChannels = DiscordUtils.fetchChannelsInContent(
      message.guild,
      message.content
    );

    return message.reply(
      `You mentioned exactly ${DiscordUtils.toHumanize(
        allChannels.size
      )} channels in your message`
    );
  } else if (message.content.toLowerCase().startsWith("!countmember")) {
    // Capture the members she/he tagged or entered the ID in the message
    const allMembers = DiscordUtils.fetchMembersInContent(
      message.guild,
      message.content
    );

    return message.reply(
      `You mentioned exactly ${DiscordUtils.toHumanize(
        allMembers.size
      )} members in your message`
    );
  } else if (message.content.toLowerCase().startsWith("!countuser")) {
    // Capture the users she/he tagged or entered the ID in the message
    const allUsers = DiscordUtils.fetchUsersInContent(
      message.guild,
      message.content
    );

    return message.reply(
      `You mentioned exactly ${DiscordUtils.toHumanize(
        allUsers.size
      )} users in your message`
    );
  }
});
```

<hr>

## Seng guild infos

```js
const DiscordUtils = require("dcjs-util");

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() == "!serverinfo") {
    const guildInfos = await DiscordUtils.guildInfo(message.guild);

    const embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: guildInfos.name,
        iconURL: guildInfos.iconURL ?? null,
      })
      .setDescription(
        `**• Created Date:** <t:${Math.floor(
          guildInfos.createdTimestamp / 1000
        )}:R>`
      )
      .addFields(
        {
          name: "GUILD INFORMATION",
          value:
            `🆔 **ID:** ${guildInfos.id}\n` +
            `👥 **Member Count:** ${DiscordUtils.toHumanize(
              guildInfos.memberCount
            )}\n` +
            `🎨 **Icon:** ${
              guildInfos.iconURL
                ? `[Icon Link](${guildInfos.iconURL})`
                : `~~[Icon Link]~~`
            }\n` +
            `🖼️ **Banner:** ${
              guildInfos.bannerURL
                ? `[Banner Link](${guildInfos.bannerURL})`
                : `~~[Banner Link]~~`
            }`,
          inline: true,
        },
        {
          name: "OTHER INFORMATION",
          value:
            `📅 **Created Date:** <t:${Math.floor(
              guildInfos.createdTimestamp / 1000
            )}:D>\n` +
            `🌍 **Region:** ${guildInfos.preferredLocale}\n` +
            `🚀 **Verification Level:** ${guildInfos.verificationLevel}`,
          inline: true,
        },
        {
          name: "CHANNELS & ROLES",
          value:
            `📚 **Channels:** ${guildInfos.channels.size}\n` +
            `✏️ **Text Channel:** ${guildInfos.textChannels.size}``🔒 **Roles:** ${guildInfos.roles.size}`,
          inline: true,
        },
        {
          name: "FEATURES",
          value: `${guildInfos.features
            .map((feature) => `• ${feature}`)
            .join("\n")}`,
          inline: false,
        }
      )
      .setThumbnail(guildInfos.iconURL ?? null)
      .setColor("Random")
      .setTimestamp();

    return message.reply({
      embeds: [embed],
    });
  }
});
```

<hr>

## Send bot infos

```js
const DiscordUtils = require("dcjs-util");

client.on("messageCreate", async (message) => {
  // If user is bot
  if (message.author.bot) return;

  if (message.content.toLowerCase() == "!botinfo") {
    const botInfos = await DiscordUtils.botInfo(message.client.user);

    // Read memory
    function readMemory(usedMemory) {
      function baytToMegabayt(number, fixed = 0) {
        return (number / 1024 / 1024).toFixed(fixed);
      }
      function baytToGigabayt(number, fixed = 1) {
        return (number / 1024 / 1024 / 1024).toFixed(fixed);
      }

      const gigabayt = baytToGigabayt(usedMemory);
      // If the used memory is greater than or equal to 1 GB, return the used memory in GB
      return gigabayt >= 1
        ? `${gigabayt} GB`
        : `${baytToMegabayt(usedMemory)} MB`;
    }

    // Create an embed
    const embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: botInfos.globalName,
        iconURL: botInfos.displayAvatar,
      })
      .setDescription(
        `**• Last reboot:** <t:${Math.floor(botInfos.readyTimestamp / 1000)}:R>`
      )
      .addFields(
        {
          name: "BOT INFORMATION",
          value:
            `✏️ **My username:** ${botInfos.name}\n` +
            `🆔 **Discord ID:** ${botInfos.id}\n` +
            `📅 **My founding date:** <t:${Math.floor(
              botInfos.createdTimestamp / 1000
            )}:F>\n` +
            `🎚️ **RAM usage:** ${readMemory(botInfos.usedMemory)} - %${
              botInfos.usedMemoryPercentage
            }`,
          inline: true,
        },
        {
          name: "MY DELAY INFORMATION",
          value: `📡 **Bot's main delay:** ${botInfos.ping} ms`,
          inline: true,
        },
        {
          name: "SERVER INFORMATION",
          value:
            `💻 **Number of servers:** ${DiscordUtils.toHumanize(
              botInfos.guildCount
            )}\n` +
            `👥 **Number of users:** ${DiscordUtils.toHumanize(
              botInfos.userCount
            )}\n` +
            `🎞️ **Number of channels:** ${DiscordUtils.toHumanize(
              botInfos.channelCount
            )}\n` +
            `🏷️ **Number of roles:** ${DiscordUtils.toHumanize(
              botInfos.roleCount
            )}\n` +
            `🎉 **Number of emojis:** ${DiscordUtils.toHumanize(
              botInfos.emojiCount
            )}`,
          inline: true,
        },
        {
          name: "VERSIONS",
          value:
            `🎛️ **Node.js version:** ${process.version}\n` +
            `🔨 **Discord.js version:** v${Discord.version}`,
          inline: true,
        },
        {
          name: "VDS INFORMATION",
          value:
            `🎞️ **CPU:** ${botInfos.cpuName}\n` +
            `🔋 **Total ram:** ${readMemory(
              botInfos.totalMemory
            )} (**Free:** ${readMemory(botInfos.freeMemory)})`,
        }
      )
      .setThumbnail(botInfos.displayAvatar)
      .setColor("Random")
      .setTimestamp();

    // Send the embed
    return message.reply({
      embeds: [embed],
    });
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

Please do not forget to use it in the latest version for more **stable** and **performance** of the module!

<br>

# And finally

- If you want to support this module, if you request me on [github](https://github.com/pordarman), I will be happy to help you.

- Thank you for reading this far, i love you 💗

- See you in my next modules!

<br>

![lovee](https://gifdb.com/images/high/drake-heart-hands-aqm0moab2i6ocb44.webp)
