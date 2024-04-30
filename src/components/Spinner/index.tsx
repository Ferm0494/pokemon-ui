interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

const Spinner = ({ size }: SpinnerProps) => {
  switch (size) {
    case "sm":
      return (
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      );
    case "md":
      return (
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      );
    default:
      return (
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      );
  }
};

export default Spinner;
