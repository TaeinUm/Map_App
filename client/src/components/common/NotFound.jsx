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
      <p style={styles.message}>페이지를 찾을 수 없습니다.</p>
    </div>
  );
};

export default NotFound;
