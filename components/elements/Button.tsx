import Spinner from 'components/icons/spinner';

interface ButtonProps {
  title?: string;
  isLoading?: boolean;
}

const Button = ({
  isLoading = false,
  title,
  children,
  ...buttonProps
}: ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  return (
    <button
      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-mariner-600 hover:bg-mariner-500 focus:outline-none focus:border-mariner-700 focus:shadow-outline-mariner active:bg-mariner-700 transition duration-150 ease-in-out"
      {...buttonProps}
    >
      {isLoading ? (
        <Spinner width="20" fill="white" className="spinner" />
      ) : (
        title
      )}
      {children}
    </button>
  );
};

export default Button;
