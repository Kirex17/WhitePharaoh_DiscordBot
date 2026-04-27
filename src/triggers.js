function checkTriggers(message, triggers) {
    const content = message.content.toLowerCase();
    return triggers.find(t => content.includes(t.contains.toLowerCase())) ?? null;
}

module.exports = { checkTriggers };
