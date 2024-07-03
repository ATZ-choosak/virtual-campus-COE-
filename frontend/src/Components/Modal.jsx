import clsx from "clsx";

// eslint-disable-next-line react/prop-types
function Modal({ children, isOpen, onClose }) {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 flex items-center justify-center w-full h-full duration-[0.2s]",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <div
        onClick={onClose}
        className="absolute w-full h-full  bg-black bg-opacity-70 backdrop-blur-sm"
      />
      <div
        className={clsx("duration-[0.2s]", isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0")}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
