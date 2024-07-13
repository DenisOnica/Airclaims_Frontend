import "tailwindcss/tailwind.css";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <img
              src="/path-to-logo.png"
              alt="Flight Delay Compensations Logo"
              className="w-32 mb-4"
            />
            <p>
              Transformă-ți zborul întârziat, anulat sau suprarezervat într-o
              compensație de până la 600 de euro!
            </p>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4">Vă ajutăm cu:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>compensație pentru întârzierea zborului anulat</li>
              <li>rambursarea zborului pentru un zbor anulat</li>
              <li>compensație pentru zbor întârziat</li>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Despagubire Wizz Air
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog de călătorie
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Termeni și condiții
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Lista de prețuri
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Politica Cookies
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Politica de confidențialitate
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4">Compania</h3>
            <address className="not-italic mb-4">
              <br />
              to be implemented
              <br />
            </address>
            <a
              href="mailto:contact@airclaim.com"
              className="bg-green-500 text-white py-4 px-10 rounded-xl hover:bg-green-600"
            >
              to be implemented
            </a>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-600">&copy;2024 - to be implemented -</p>
          <a href="#" className="text-green-500 hover:underline">
            Înapoi la începutul paginii
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
