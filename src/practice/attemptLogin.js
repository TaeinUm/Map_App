//https://www.mapbox.com/api/login
const superagent = require('superagent').agent()

const ytm = async () => {
    let dashboard = (await superagent.post('https://www.mapbox.com/api/login')).send({username:'aguan688@gmail.com', password:'bigBoysComein246!'});
    //.set('Content-Type', 'nosniff');
    console.log(dashboard.text);


};
ytm();