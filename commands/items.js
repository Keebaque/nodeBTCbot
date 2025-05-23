const { saveItem, editItemPrice } = require("../services/items.js");
const { checkDataEdit } = require("../utils/discordutils.js");
 
async function addItem(message, args) {
  if (!(await checkDataEdit(message))) return; // No permission

  if (args.length < 3 || args.length > 5) {
    await message.channel.send(
      "The additem command requires 3 to 5 parameters: the calling code of the item (3-5 characters), the full name of the item (in quotes), the price of the item in USD, an emoji for the item without colons : bracing it just the keyword (optional), and whether the item should be default priced as a single item or not (optional). Example: `additem mac \"McDonalds Big Mac\" 5.71 hamburger single`");
    return;
  }

  const output = saveItem(
    args[0], 
    args[1], 
    args[2], 
    "add", 
    message.author.username, 
    args[3] || '',
    args[4] || ''
  );

  await message.channel.send(output);
  return;
}

async function editItem(message, args) {
  if (!(await checkDataEdit(message))) return; // No permission

  if (args.length < 3 || args.length > 5) {
    await message.channel.send(
      "The edititem command requires 3 to 5 parameters: the calling code of the item (3-5 characters), the full name of the item (in quotes), the price of the item in USD, an emoji for the item without colons : bracing it just the keyword (optional), and whether the item should be default priced as a single item or not (optional). Example: `edititem mac \"McDonalds Big Mac\" 5.71 hamburger single`");
    return;
  }

  const output = saveItem(
    args[0], 
    args[1], 
    args[2], 
    "edit", 
    message.author.username, 
    args[3] || '',
    args[4] || ''
  );

  await message.channel.send(output);
  return;
}

async function editPrice(message, args) {
  if (!(await checkDataEdit(message))) return; // No permission

  if (args.length != 2) {
    await message.channel.send(
      "The editprice command requires 2 parameters, the item code to edit and the price to change it to. ex. `editprice mac 3.99`");
    return;
  }

  const output = editItemPrice(args[0], args[1]);

  await message.channel.send(output);
  return;
}

module.exports = {
  additem: {
    execute: addItem
  },
  edititem: {
    execute: editItem
  },
  editprice: {
    execute: editPrice
  }
}
