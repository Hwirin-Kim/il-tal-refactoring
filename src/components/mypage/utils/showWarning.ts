import Swal from "sweetalert2";
export const showWarning = (title: string, text: string) => {
  Swal.fire({
    icon: "warning",
    title,
    text,
  });
};
