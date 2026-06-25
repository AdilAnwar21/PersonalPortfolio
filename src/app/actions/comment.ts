"use server";

import dbConnect from "@/lib/db";
import Comment from "@/models/Comment";
import Blog from "@/models/Blog";
import { revalidatePath } from "next/cache";

export async function getApprovedComments(blogId: string) {
  await dbConnect();
  const comments = await Comment.find({ blogId, isApproved: true }).sort({ createdAt: 1 });
  return JSON.parse(JSON.stringify(comments));
}

export async function getAllCommentsAdmin() {
  await dbConnect();
  const comments = await Comment.find().sort({ createdAt: -1 }).populate({ path: "blogId", model: Blog, select: "title slug" });
  return JSON.parse(JSON.stringify(comments));
}

export async function addComment(blogId: string, authorName: string, content: string) {
  await dbConnect();
  const newComment = await Comment.create({ blogId, authorName, content, isApproved: false });
  return JSON.parse(JSON.stringify(newComment));
}

export async function approveComment(id: string, path?: string) {
  await dbConnect();
  await Comment.findByIdAndUpdate(id, { isApproved: true });
  revalidatePath("/admin/comments");
  if (path) revalidatePath(path);
  return true;
}

export async function deleteComment(id: string, path?: string) {
  await dbConnect();
  await Comment.findByIdAndDelete(id);
  revalidatePath("/admin/comments");
  if (path) revalidatePath(path);
  return true;
}
