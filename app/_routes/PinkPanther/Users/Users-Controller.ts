// JH - None of this has been coded out correctly yet

import asyncHandler from "express-async-handler"; // See notes in _Root
import UserSchema from "./Users-Model";

export const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await UserSchema.find();

    res.status(200).json({ data: users });
  } catch (err) {
    next(err);
  }
});

export const getUser = asyncHandler(async (req, res, next) => {
  const User = await UserSchema.findById(req.params.id);

  if (!User) {
    next(res.status(404).json({ error: `Data not found with id of ${req.params.id}` }));
    return;
  }

  res.status(200).json({ success: true, data: User });
});

export const createUser = asyncHandler(async (req, res, next) => {
  try {
    await UserSchema.create(req.body);
    res.status(201).json({ success: true });
  } catch (err) {
    next(res.status(401).json({ error: `Data not able to persist to database` }));
  }
});

export const updateUser = asyncHandler(async (req, res, next) => {
  let updateUser = await UserSchema.findById(req.params.id);

  if (!updateUser) {
    next(res.status(404).json({ error: `Data not found with id of ${req.params.id}` }));
    return;
  }

  updateUser = await UserSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: updateUser });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const deleteUser = await UserSchema.findById(req.params.id);

  if (!deleteUser) {
    next(res.status(404).json({ error: `Data not found with id of ${req.params.id}` }));
    return;
  }

  // deleteUser.remove();
  res.status(200).json({ success: true, data: {} });
});

export default getUsers;
