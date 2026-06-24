"use server";

import dbConnect from "@/lib/db";
import Experience from "@/models/Experience";
import { revalidatePath } from "next/cache";

export async function getExperiences() {
  await dbConnect();
  const experiences = await Experience.find({}).sort({ order: 1, startDate: -1 });
  return JSON.parse(JSON.stringify(experiences));
}

export async function addExperience(formData: FormData) {
  await dbConnect();
  
  const current = formData.get("current") === "on";
  
  const data = {
    role: formData.get("role") as string,
    company: formData.get("company") as string,
    location: formData.get("location") as string,
    startDate: new Date(formData.get("startDate") as string),
    endDate: current ? null : formData.get("endDate") ? new Date(formData.get("endDate") as string) : null,
    current,
    description: (formData.get("description") as string).split("\n").filter(Boolean),
    technologies: (formData.get("technologies") as string).split(",").map(t => t.trim()).filter(Boolean),
    order: Number(formData.get("order") || 0),
  };

  await Experience.create(data);
  revalidatePath("/admin/experience");
}

export async function deleteExperience(id: string) {
  await dbConnect();
  await Experience.findByIdAndDelete(id);
  revalidatePath("/admin/experience");
}
