const News = require("../models/news");

exports.addNews = (req, res) => {
  const { title, description, url } = req.body;

  News.create({
    title: title,
    description: description,
    url: url,
  })
    .then((news) => {
      res.status(200);
      res.json(news);
    })
    .catch((error) => {
      res.status(400);
      res.json({ error: error });
    });
};

exports.getAllNews = (req, res) => {
  console.log(req.body);
  
  News.find({})
    .then((news) => {
      res.status(200);
      res.json(news);
    })
    .catch((error) => {
      res.status(400);
      res.json(error);
    });
};

exports.deleteNews = (req, res) => {
  News.findByIdAndDelete(req.params.id)
    .then((news) => {
      res.status(200);
      res.json(news);
    })
    .catch((error) => {
      res.status(400);
      res.json({
        error: error,
      });
    });
};
