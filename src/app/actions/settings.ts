/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import dbConnect from "@/lib/db";
import Settings from "@/models/Settings";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";

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
  };

  // Handle Resume File Upload
  const resumeFile = formData.get("resumeFile") as File;
  if (resumeFile && resumeFile.size > 0) {
    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Save locally to public directory (Note: ephemeral on Vercel)
    const fileName = `resume-${Date.now()}.pdf`;
    const filepath = path.join(process.cwd(), "public", "uploads", fileName);
    await writeFile(filepath, buffer);
    data.resumePdfUrl = `/uploads/${fileName}`;
  } else {
    const resumePdfUrl = formData.get("resumePdfUrl") as string;
    if (resumePdfUrl) data.resumePdfUrl = resumePdfUrl;
  }
  
  // Handle Profile Photo Upload
  const profilePhoto = formData.get("profilePhoto") as File;
  if (profilePhoto && profilePhoto.size > 0) {
    const bytes = await profilePhoto.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const ext = profilePhoto.name.split('.').pop();
    const fileName = `profile-${Date.now()}.${ext}`;
    const filepath = path.join(process.cwd(), "public", "uploads", fileName);
    await writeFile(filepath, buffer);
    data.profilePhotoUrl = `/uploads/${fileName}`;
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

