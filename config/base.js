
class Base {
  constructor(name) {
    this.name = name;

    this.init = this.init.bind(this);
    this.list = this.list.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);

    this.init();
  }

  init() {
    var path = `../model/${this.name}`;
    this[this.name] = require(path);
  }

  async list(req, res) {
    try {
      var models = await this[this.name].find();

      res.send({ [this.name] : models })
    } catch (err) {
      console.log(err);
      res.send({ error: err })
    }
  }

  async get(req, res) {
    try {
      var { id } = req.params;

      var models = await this[this.name].findOne({ _id: id });
      res.send({ [this.name]: models })
    } catch (err) {
      console.log(err);
      res.send({ error: err })
    }
  }

  async put(req, res) {
    try {
      var { id } = req.params;
      var body = req.body;
      var query = { _id: id };

      var result = await this[this.name].update(query, body);
      var modelUpdated = await this[this.name].findOne(query);

      res.send({ [this.name]: modelUpdated });
    } catch (err) {
      res.send({ error: err });
    }
  }

  async post(req, res) {
     var body = req.body;

     var model = new this[this.name](body);
     var result = await model.save();
    res.send({
      [this.name]: result,
    });
  }

  async delete(req, res) {
    try {
      var { id } = req.params;

      var result = await this[this.name].remove({ _id: id });
      res.send({ [this.name]: result });
    } catch (err) {
      res.send({ error: err })
    }
  }
}

module.exports = Base;
