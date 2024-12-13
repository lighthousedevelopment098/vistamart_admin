import swal from "sweetalert";

const ConfirmationModal = async (options) => {
  const { title, text, icon = "warning", dangerMode = true } = options;

  const result = await swal({
    title: title,
    text: text,
    icon: icon,
    buttons: true,
    dangerMode: dangerMode,
  });

  return result; // Return user's response (true/false)
};

export default ConfirmationModal;
