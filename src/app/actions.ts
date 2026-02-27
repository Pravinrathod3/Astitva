"use server";

import { revalidatePath } from "next/cache";

export async function uploadAvatar(formData: FormData) {
  return { success: true, url: "/default-avatar.png" };
}

export async function invalidateUserProfileCache(userId: string) {
  return;
}

export async function updateUserProfile(
  userId: string,
  data: any
) {
  return { success: true, user: { id: userId, ...data } };
}

export async function getUserProfile(userId: string) {
  return {
    id: userId,
    name: "Guest User",
    email: "guest@example.com",
    bookingId: "AST26-GUEST",
  };
}

export async function getUserEventsAndPasses(userId: string) {
  return { registeredEventTeams: [], generatedPasses: [] };
}

export async function createRazorpayOrder(data: any) {
  return {
    success: false,
    error: "Payment is disabled in this static version.",
  };
}

export async function verifyRazorpayPayment(data: any) {
  return { success: false, error: "Payment is disabled in this static version." };
}

export async function submitVisitorRegistration(data: any) {
  return {
    success: true,
    visitorRegistration: { id: "mock-reg", ...data },
  };
}

export async function submitIssue(data: any) {
  return { success: true, issue: { id: "mock-issue", ...data } };
}

export async function createEventRazorpayOrder(data: any) {
  return { success: false, error: "Payment is disabled in this static version." };
}

export async function verifyEventRazorpayPayment(data: any) {
  return { success: false, error: "Payment is disabled in this static version." };
}

export async function submitEventRegistrationManual(data: any) {
  return {
    success: true,
    teamId: "mock-team-id",
  };
}

export async function registerEventTeam(data: any) {
  return { success: false, error: "Payment is disabled in this static version." };
}

export async function getUserPassStatus(userId: string) {
  return {
    hasVisitorPass: false,
    hasDualDayPass: false,
    hasSingleDayPass: false,
    hasEventPass: false,
    passCount: 0,
    passes: [],
  };
}

export async function subscribeNewsletter(data: any) {
  return { success: true };
}
