import React from "react";

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer className={`bg-gray-800 text-white text-center p-4 ${className}`}>
      <p>© 2024 Dashboard. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
