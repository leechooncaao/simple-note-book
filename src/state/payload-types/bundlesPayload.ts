export interface BundleStartPayload {
  cellId: string;
}

export interface BundleCompletePayload {
  cellId: string;
  bundle: {
    code: string;
    err: string;
  }
}

export interface BundlePayload {
  cellId: string;
  input: string;
}
