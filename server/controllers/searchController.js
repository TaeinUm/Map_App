const Post = require('../models/Post');

exports.searchMapByUserName = async (req, res) => {
    try {
        const userId = req.params.userId;
        const maps = await Post.find({ 
            userId: userId,
            types: "map"
        });
        res.json(maps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get questions by search text
exports.searchQuestionByText = async (req, res) => {
    try {
        const searchText = req.params.searchText;
        const questions = await Post.find({ 
            title: { "$regex": searchText, "$options": "i" },
            types: "question"
        });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get ideas by search text
exports.searchIdeaByText = async (req, res) => {
    try {
        const searchText = req.params.searchText;
        const ideas = await Post.find({ 
            title: { "$regex": searchText, "$options": "i" },
            types: "idea"
        });
        res.json(ideas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get maps by search text
exports.searchMapByText = async (req, res) => {
    try {
        const searchText = req.params.searchText;
        const maps = await Post.find({ 
            title: { "$regex": searchText, "$options": "i" },
            types: "map"
        });
        res.json(maps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};