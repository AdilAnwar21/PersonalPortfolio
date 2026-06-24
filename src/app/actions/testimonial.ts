"use server";

import dbConnect from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { revalidatePath } from "next/cache";

export async function getTestimonials() {
  await dbConnect();
  const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(testimonials));
}

export async function submitTestimonial(formData: FormData) {
  await dbConnect();
  const data = {
    authorName: formData.get("authorName") as string,
    authorTitle: formData.get("authorTitle") as string,
    company: formData.get("company") as string,
    content: formData.get("content") as string,
    status: "Pending", // Public submissions are always pending
  };
  await Testimonial.create(data);
  revalidatePath("/admin/testimonials");
}

export async function updateTestimonialStatus(id: string, status: string) {
  await dbConnect();
  await Testimonial.findByIdAndUpdate(id, { status });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  await dbConnect();
  await Testimonial.findByIdAndDelete(id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

