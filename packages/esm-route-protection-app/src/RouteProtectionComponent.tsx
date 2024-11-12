import React, {useEffect, useState} from "react";
import "./styles.css"

interface Props {
  children: React.ReactNode;
  requiredPrivilege: string;
}

const RouteProtectionComponent: React.FC<Props> = ({
                                                     children,
                                                     requiredPrivilege,
                                                   }) => {
  const [privileges, setPrivileges] = useState<
    Array<{
      name: string;
      display: string;
      uuid: string;
    }>
  >([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const {origin} = window.location;

  const fetchCurrentUser = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${origin}/openmrs/ws/rest/v1/session`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPrivileges(data.user.privileges);
      }
    } catch (e) {
      return e;
    } finally {
      setLoading(false);
    }
  };

  const isAuthorized = () => {
    const found = privileges?.findIndex(
      (privilege) => privilege.name === requiredPrivilege
    );
    return found > -1;
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div className="parent">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        isAuthorized() ? (
          children
        ) : (
          <>
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/>
            </svg>
            <div className="content">
              <h1>Error 401</h1>
              <h4>Unauthorized</h4>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default RouteProtectionComponent;
