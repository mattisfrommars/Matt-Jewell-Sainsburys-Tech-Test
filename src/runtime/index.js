const message = "Ok, running with config. Your name is: {NAME}";

module.exports = function (config) {
    const outputMessage = message.replace("{NAME}", config.name);
    console.log(outputMessage);
};
