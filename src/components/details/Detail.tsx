import { useLocation } from "react-router-dom";

const Detail = () => {
  const location = useLocation();

  console.log(location.state.title);
  const { title, webReaderLink } = location.state;

  return (
    <div>
      <h1>{title}</h1>
      <a href={webReaderLink}>
        <button>See preview</button>
      </a>
    </div>
  );
};

export default Detail;
