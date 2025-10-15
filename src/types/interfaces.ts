export interface LoaderProps {
  size?: number;
  color?: string;
}

export interface LoginResponse {
  token: string;
  result: string;
}

export interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}
