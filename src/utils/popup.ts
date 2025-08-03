import { toast } from "react-toastify";

interface IPopup {
  type?: "info" | "warning" | "success" | "error";
  message: string;
}

export const popUp = ({ type = "info", message }: IPopup) => {
  return toast[type](message);
};
