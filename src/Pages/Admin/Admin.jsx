import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const Admin = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "https://airclaims-backend.onrender.com/api/customers"
      );
      setCustomers(response.data);
      setFilteredProducts(response.data); // Initialize with all customers
    } catch (err) {
      setError("Error fetching customers");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event, fieldName, customerId) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `${fieldName}/${uuidv4()}/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const updateData = {
        [`${fieldName}`]: downloadURL,
      };

      await axios.put(
        `https://airclaims-backend.onrender.com/api/customers/${customerId}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert(`${fieldName} uploaded and database updated successfully`);
    } catch (error) {
      console.error("Error uploading file or updating database:", error);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = customers.filter((customer) =>
        customer.fullName.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(customers);
    }
  }, [searchTerm, customers]);

  return (
    <div className="App">
      <h1>Customer List</h1>
      <div className="search-bar">
        <label htmlFor="search">Search by Name:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Flight Number</th>
              <th>Booking Reference</th>
              <th>ID Card</th>
              <th>Flight Delay Proof</th>
              <th>FlightTicket</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.fullName}</td>
                <td>{customer.flightNumber}</td>
                <td>{customer.bookingReference}</td>
                <td>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload(e, "ID_Cards", customer._id)
                    }
                  />
                </td>
                <td>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload(e, "Flight_delay_proof", customer._id)
                    }
                  />
                </td>
                <td>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload(e, "tickets", customer._id)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin;
