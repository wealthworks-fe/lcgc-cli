import "./index.less";

export default ({ history }) => {
  return (
    <div className="page-about">
      <h1>About</h1>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        Go to Home
      </button>
    </div>
  );
};
