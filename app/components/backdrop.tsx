const Backdrop = ({ onClick }: { onClick: any }) => {
  return (
    <div
      className="fixed inset-0 z-40 bg-black bg-opacity-50"
      onClick={onClick}
    ></div>
  );
};

export default Backdrop;
