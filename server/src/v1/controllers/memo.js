const Memo = require("../models/memo");

exports.create = async (req, res) => {
    try {
        const memoCount = await Memo.find().couunt()
        //メモの新規作成
        const memo = await Memo.create({
            user: req.user._id,
            position: memoCount > 0 ? memoCount : 0,
        });
        res.status(201).json(memo);
    } catch {
        res.status(500).json(err)
    }
};

exports.getAll = async (req, res) => {
  try {
      const memos = await Memo.find({ user: req.user_id }).sort("-position");
    res.status(200).json(memos);
  } catch {
    res.status(500).json(err);
  }
};