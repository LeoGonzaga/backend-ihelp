const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports = {
  async createUser(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Campo não preenchido" });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    user = await User.create({ username, email, password });
    return res.json(user);
  },

  async recoveryPassword(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    } else {
      const pass = crypto.randomBytes(10).toString("hex");
      user.password = pass;
      user.save();

      const mail = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "ihelpunifei@gmail.com",
          pass: "Bl00dh3lp",
        },
      });
      const mailOptions = {
        to: user.email,
        from: "ihelpunifei@gmail.com",
        subject: "Recuperação de Senha IHelp",
        text:
          "Você está recebendo esse email pois você ou alguem requisitou " +
          "um pedido de recuperação de senha. Sua nova senha é " +
          pass +
          ". Lembre de " +
          "trocar a senha.",
      };
      mail.sendMail(mailOptions, function (err) {
        res.json(user);
      });
    }
  },

  async viewUser(req, res) {
    let user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    } else {
      return res.json(user);
    }
  },

  async updateUser(req, res) {
    let user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    } else {
      const {
        username,
        bloodtype,
        password,
        birthday,
        phone,
        height,
        weight,
      } = req.body;
      if (username) user.username = username;
      if (bloodtype) user.bloodtype = bloodtype;
      if (password != null) user.password = password;
      if (birthday) user.birthday = birthday;
      if (phone) user.phone = phone;
      if (height) user.height = height;
      if (weight) user.weight = weight;
      user.save();
      return res.json(user);
    }
  },
};
