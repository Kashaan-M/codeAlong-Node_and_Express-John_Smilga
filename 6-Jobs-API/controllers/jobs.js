const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
  // get all jobs created by current user
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  // nested destructuring
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  // above we are destructuring req object to get 'userId' from `user`
  // and 'id' which we alias with 'jobId', from `params`

  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  // nested destructuring(same as in getJob() )
  const {
    user: { userId },
    params: { id: jobId },
    body: { company, position },
  } = req;
  // above we also destructure req.body for 'company' and 'position'
  // bcoz we want to check if they are empty strings,as done below

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty');
  }
  const job = await Job.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  /* ALTERNATE using findOneAndUpdate()
   *
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    { company, position, status },
    {
      new: true,
    },
  );
  */
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};
module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
