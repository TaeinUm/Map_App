const Test = require('../models/Test');

exports.getDataFromTestCollection = async (req, res) => {
  try {
    const data = await Test.find({});
    console.log('Successfully Loaded'); // Log success message
    res.json({
      message: 'Successfully Loaded', // Success message
      data: data
    });
  } catch (error) {
    console.error('Error fetching data from test collection:', error);
    res.status(500).send('Error fetching test data');
  }
};
