"use server";

import type { Web3FormsSubmissionValues } from "@/lib/portfolio-types";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function submitContactAction(values: Web3FormsSubmissionValues) {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new Error("Contact form is not configured. Missing access key.");
  }

  const payload = {
    access_key: accessKey,
    name: values.name,
    email: values.email,
    subject: values.subject
      ? `[${values.subject}] Message from ${values.name}`
      : `New Message from ${values.name}`,
    message: values.message || values.projectDetails || values.businessInquiry || "",
    ...(values.country ? { country: values.country } : {}),
    ...(values.phone ? { phone: values.phone } : {}),
  };

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to submit contact form.");
  }

  return result;
}
