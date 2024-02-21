/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

export function useUserLocation() {
  const [country, setCountry] = useState("");
  const [countryPhoneCode, setCountryPhoneCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserLocation() {
      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();

        const locationResponse = await fetch(
          `https://ipapi.co/${ipData.ip}/json/`
        );
        const locationData = await locationResponse.json();

        const { country_name, country_calling_code } = locationData;
        setCountry(country_name);
        setCountryPhoneCode(country_calling_code);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
        console.error("Error fetching user location:", error);
      }
    }

    fetchUserLocation();
  }, []);

  return { country, countryPhoneCode, error, loading };
}
