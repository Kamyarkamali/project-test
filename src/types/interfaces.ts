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

export interface UsernameResponse {
  username: string;
  result: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed";
}

export interface SidebarProps {
  username: string;
  onLogout: () => void;
}

export interface Flight {
  logoSrc: string;
  logoStyle: { height: string; margin: string };
  src: { country: string; iso3: string; time: string; airline: string };
  dst: { country: string; iso3: string; time: string; airline: string };
  boarding: string;
  transfer: boolean;
  gates: number;
  seat: string;
  price: string;
  class: string;
}

export interface ListProps {
  token: string;
}
