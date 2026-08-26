"use server";

export type FormState = {
  success: boolean;
  message: string;
} | null;

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const company = formData.get("company") as string;
  const message = formData.get("message") as string;

  // Basic validation
  if (!firstName?.trim() || !email?.trim() || !message?.trim()) {
    return {
      success: false,
      message: "Please fill in all required fields (First Name, Email, and Message).",
    };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  // In production, you would send this data to your backend/email service
  // For now, we simulate a successful submission
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Contact form submission:", {
      firstName,
      lastName,
      email,
      phone,
      company,
      message,
    });

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully. Our team will get back to you within 24 business hours.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again or email us directly at hello@sterlinggifts.com.",
    };
  }
}

export async function submitQuoteForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const fullName = formData.get("fullName") as string;
  const companyName = formData.get("companyName") as string;
  const workEmail = formData.get("workEmail") as string;
  const phone = formData.get("phone") as string;
  const numberOfRecipients = formData.get("numberOfRecipients") as string;
  const budgetPerRecipient = formData.get("budgetPerRecipient") as string;
  const eventType = formData.get("eventType") as string;
  const requiredDeliveryDate = formData.get("requiredDeliveryDate") as string;
  const deliveryLocation = formData.get("deliveryLocation") as string;
  const additionalRequirements = formData.get("additionalRequirements") as string;
  const brandingRequired = formData.get("brandingRequired") === "on";

  // Basic validation
  if (!fullName?.trim() || !companyName?.trim() || !workEmail?.trim() || !phone?.trim() || !numberOfRecipients?.trim()) {
    return {
      success: false,
      message: "Please fill in all required fields (Name, Company, Email, Phone, and Number of Recipients).",
    };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(workEmail)) {
    return {
      success: false,
      message: "Please enter a valid work email address.",
    };
  }

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Quote form submission:", {
      fullName,
      companyName,
      workEmail,
      phone,
      numberOfRecipients,
      budgetPerRecipient,
      eventType,
      requiredDeliveryDate,
      deliveryLocation,
      additionalRequirements,
      brandingRequired,
    });

    return {
      success: true,
      message: "Your quote request has been submitted successfully! Our gifting specialists will review your requirements and respond within 24 business hours.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again or email us directly at hello@sterlinggifts.com.",
    };
  }
}
