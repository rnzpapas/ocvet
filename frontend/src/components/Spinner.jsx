

const Spinner = ({ size = 'md'}) => {
    const sizes = {
      sm: 'h-4 w-4 border-2',
      md: 'h-6 w-6 border-4',
      lg: 'h-10 w-10 border-4',
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-raisin-black/50 z-50">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-[#F5F5F5] rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-3 h-3 bg-[#F5F5F5] rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-3 h-3 bg-[#F5F5F5] rounded-full animate-bounce" />
        </div>
      </div>
    );
  };
  
  export default Spinner;
  