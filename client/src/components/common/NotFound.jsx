import React from "react";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  },
  header: {
    fontSize: "3rem",
    fontWeight: "bold",
  },
  message: {
    fontSize: "1.5rem",
  },
};

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.message}>Page Not Found.</p>
    </div>
  );
};

export default NotFound;
