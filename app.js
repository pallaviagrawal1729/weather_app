const yargs = require('yargs');
const getWeather = require('./weather_app.helper');

yargs.command({
    command: ['weather_forecast', 'weather', 'forecast'],
    description: 'Used for weather forecast',
    showInHelper: true,
    builder: {
        address: {
            description: 'Provide address for which you want to know weather',
            demandOption: true,
            type: 'string',
            validate(value) {
                if (value.trim() === '') {
                    throw new Error('Address cannot be empty.');
                }
                return true;
            },
        }
    },
    handler: async (argv) => {
        await getWeather(argv.address);
    }
});

yargs.parse();