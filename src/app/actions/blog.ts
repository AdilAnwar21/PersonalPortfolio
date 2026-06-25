"use server";

import dbConnect from "@/lib/db";
import Blog, { IBlog } from "@/models/Blog";
import { revalidatePath } from "next/cache";

export async function getBlogs() {
  await dbConnect();
  const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(blogs));
}

export async function getAllBlogsAdmin() {
  await dbConnect();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(blogs));
}

export async function getBlogBySlug(slug: string) {
  await dbConnect();
  const blog = await Blog.findOne({ slug });
  if (!blog) return null;
  return JSON.parse(JSON.stringify(blog));
}

export async function createBlog(data: any) {
  await dbConnect();
  const newBlog = await Blog.create(data);
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  return JSON.parse(JSON.stringify(newBlog));
}

export async function updateBlog(id: string, data: any) {
  await dbConnect();
  const updated = await Blog.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Blog not found");
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${updated.slug}`);
  return JSON.parse(JSON.stringify(updated));
}

export async function deleteBlog(id: string) {
  await dbConnect();
  await Blog.findByIdAndDelete(id);
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  return true;
}

export async function likeBlog(id: string) {
  await dbConnect();
  const updated = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
  if (!updated) throw new Error("Blog not found");
  revalidatePath(`/blog/${updated.slug}`);
  return updated.likes;
}
