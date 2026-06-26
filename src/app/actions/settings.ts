/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import dbConnect from "@/lib/db";
import Settings from "@/models/Settings";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  await dbConnect();
  let settings = await Settings.findOne({});
  
  if (!settings) {
    settings = await Settings.create({
      heroTitle: "Default Hero Title",
      aboutText: "Default about text",
      contactEmail: "hello@example.com",
    });
  }
  
  return JSON.parse(JSON.stringify(settings));
}

export async function updateSettings(formData: FormData) {
  await dbConnect();
  
  const data: any = {
    heroTitle: formData.get("heroTitle") as string,
    heroSubtitle: formData.get("heroSubtitle") as string,
    aboutText: formData.get("aboutText") as string,
    contactEmail: formData.get("contactEmail") as string,
    availableForWork: formData.get("availableForWork") === "true",
  };

  // Handle Resume File Upload
  const resumeFile = formData.get("resumeFile") as File;
  if (resumeFile && resumeFile.size > 0) {
    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Save as Base64 instead of writing locally
    const base64 = buffer.toString("base64");
    const mimeType = resumeFile.type || "application/pdf";
    data.resumePdfUrl = `data:${mimeType};base64,${base64}`;
  } else {
    const resumePdfUrl = formData.get("resumePdfUrl") as string;
    if (resumePdfUrl) data.resumePdfUrl = resumePdfUrl;
  }
  
  // Handle Profile Photo Upload
  const profilePhoto = formData.get("profilePhoto") as File;
  if (profilePhoto && profilePhoto.size > 0) {
    const bytes = await profilePhoto.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const base64 = buffer.toString("base64");
    const mimeType = profilePhoto.type || "image/jpeg";
    data.profilePhotoUrl = `data:${mimeType};base64,${base64}`;
  } else {
    const profilePhotoUrl = formData.get("profilePhotoUrl") as string;
    if (profilePhotoUrl) data.profilePhotoUrl = profilePhotoUrl;
  }
  
  // Handle Skills
  const skillsStr = formData.get("skills") as string;
  if (skillsStr) {
    data.skills = skillsStr.split(",").map(s => s.trim()).filter(s => s !== "");
  }
  
  const socialLinksStr = formData.get("socialLinks") as string;
  if (socialLinksStr) {
    try {
      data.socialLinks = JSON.parse(socialLinksStr);
    } catch(e) {}
  }

  await Settings.findOneAndUpdate({}, data, { upsert: true });
  revalidatePath("/admin/settings");
  revalidatePath("/");
}

