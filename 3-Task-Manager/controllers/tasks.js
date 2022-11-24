const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
    /* lines 8,9 are alternate to line 6 */
    //res.status(200).json({ tasks, amount: tasks.length });
    //res.status(200).json({ status: 'success', data: { tasks, amount: tasks.length } });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    // above line is similar to this destructuring --> const { id } = req.params <-- except we give "id" an `alias` called "taskID" which references it below
    const task = await Task.findOne({ _id: taskID });
    // NOTE: It is best practice to use 'findById()' when you need to use '_id' instead of using 'findOne()'.But I do it as shown in tutorial below
    // if `taskID` is invalid i.e. if 'findOne()' returns null then we will need to return a different error response
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    // if 'task' is undefined(because taskID contains more or less characters than those defined by ObjectId of Schema) then below error response returned
    // this is cast error
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    // 'findOneAndUpdate(conditions,update,options)' , 'conditions' are used for filtering, 'update' is an Object with new values with which to update and
    // 'options' is an object with several useful properties like 'new' which returns updated document,'runValidators' which validates updated document
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    //await task.save();
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
    /* alternate responses to line 50 */
    // res.status(200).send()
    // res.status(200).json({task:null, success:true})
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
