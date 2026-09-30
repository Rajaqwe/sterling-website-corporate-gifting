"use server";

import type { SampleRequestStatus } from "@/generated/prisma";
import { updateSampleRequestStatus as updateRequestStatus } from "@/app/request-a-sample/actions";

export async function updateSampleRequestStatus(
  id: string,
  status: SampleRequestStatus,
  internalNotes?: string
) {
  return updateRequestStatus(id, status, internalNotes);
}
