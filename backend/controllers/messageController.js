const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const io = require('../server').io; // Import io instance

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { receiver, content } = req.body;

  const message = new Message({
    sender: req.user._id,
    receiver,
    content,
  });

  const createdMessage = await message.save();

  // Emit the message to the receiver
  io.to(receiver).emit('message', createdMessage);

  res.status(201).json(createdMessage);
});

// @desc    Get messages between two users
// @route   GET /api/messages/:userId
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user._id, receiver: req.params.userId },
      { sender: req.params.userId, receiver: req.user._id },
    ],
  }).sort({ createdAt: -1 });

  res.json(messages);
});

module.exports = { sendMessage, getMessages };