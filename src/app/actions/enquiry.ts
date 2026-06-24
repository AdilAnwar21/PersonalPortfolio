"use server";

import dbConnect from "@/lib/db";
import Enquiry from "@/models/Enquiry";
import { revalidatePath } from "next/cache";

export async function getEnquiries() {
  await dbConnect();
  const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(enquiries));
}

export async function submitEnquiry(formData: FormData) {
  await dbConnect();
  
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  await Enquiry.create(data);
  revalidatePath("/admin/enquiries");
}

export async function markEnquiryRead(id: string) {
  await dbConnect();
  await Enquiry.findByIdAndUpdate(id, { read: true });
  revalidatePath("/admin/enquiries");
}

export async function deleteEnquiry(id: string) {
  await dbConnect();
  await Enquiry.findByIdAndDelete(id);
  revalidatePath("/admin/enquiries");
}
