/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  await dbConnect();
  const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
  return JSON.parse(JSON.stringify(projects));
}

export async function addProject(formData: FormData) {
  await dbConnect();
  
  const data = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    tags: (formData.get("tags") as string).split(",").map(t => t.trim()).filter(Boolean),
    galleryImages: (formData.get("galleryImages") as string).split(",").map(t => t.trim()).filter(Boolean),
    liveUrl: formData.get("liveUrl") as string,
    repoUrl: formData.get("repoUrl") as string,
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") || 0),
    mainImage: "",
  };

  const imageFile = formData.get("mainImageFile") as File;
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Store as Base64 Data URI instead of writing to Vercel's ephemeral file system
    const base64 = buffer.toString("base64");
    const mimeType = imageFile.type || "image/jpeg";
    data.mainImage = `data:${mimeType};base64,${base64}`;
  } else {
    data.mainImage = formData.get("mainImage") as string;
  }

  await Project.create(data);
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  await dbConnect();
  await Project.findByIdAndDelete(id);
  revalidatePath("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await dbConnect();

  const data: any = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    tags: (formData.get("tags") as string).split(",").map(t => t.trim()).filter(Boolean),
    galleryImages: (formData.get("galleryImages") as string).split(",").map(t => t.trim()).filter(Boolean),
    liveUrl: formData.get("liveUrl") as string,
    repoUrl: formData.get("repoUrl") as string,
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") || 0),
  };

  const imageFile = formData.get("mainImageFile") as File;
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const base64 = buffer.toString("base64");
    const mimeType = imageFile.type || "image/jpeg";
    data.mainImage = `data:${mimeType};base64,${base64}`;
  } else {
    const mainImageStr = formData.get("mainImage") as string;
    if (mainImageStr) data.mainImage = mainImageStr;
  }

  await Project.findByIdAndUpdate(id, data);
  revalidatePath("/admin/projects");
  revalidatePath("/");
}
