import * as React from "react";
import styled from "styled-components";
import axios from "axios";
import DogBox from "./DogBox";
import { DogInfo } from "../types";
import Loading from "../common/Loading";

function Home() {
  const API_KEY: string = process.env.REACT_APP_DOG_API;

  const [dogData, setDogData] = React.useState<DogInfo[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(0);

  const observerRef = React.useRef<IntersectionObserver>();
  const targetRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    getDog();
  }, []);

  React.useEffect(() => {
    observerRef.current = new IntersectionObserver(intersectionObserver, {
      threshold: 0.5,
    });
    targetRef.current && observerRef.current.observe(targetRef.current);
  }, [dogData]);

  const getDog = async () => {
    if (page >= 1) {
      setLoading(true);
    }
    const res = await axios.get(
      `https://api.thedogapi.com/v1/breeds?limit=10&page=${page}`,
      { headers: { "x-api-key": API_KEY } }
    );
    setDogData((prev) => [...prev, ...res.data]);
    setLoading(false);
  };

  const intersectionObserver = (
    entry: IntersectionObserverEntry[],
    io: IntersectionObserver
  ) => {
    entry.forEach((item) => {
      if (item.isIntersecting) {
        // 관찰하고 있는 entry 화면에 보여지는 경우
        io.unobserve(item.target); // 관찰하고있는 entry 해제
        setPage((prev) => prev + 1); // 페이지 +1 하고
        getDog(); // 데이터 요청
      }
    });
  };

  return (
    <Container>
      {dogData.map((item, idx) => {
        // 마지막 데이터에 옵저버 감지를 위한 ref 걸어주기
        if (dogData.length - 1 === idx) {
          return (
            <Box key={idx} ref={targetRef}>
              <DogBox
                name={item.name}
                life_span={item.life_span}
                image={item.image}
                temperament={item.temperament}
              />
            </Box>
          );
        } else {
          return (
            <Box key={idx}>
              <DogBox
                name={item.name}
                life_span={item.life_span}
                image={item.image}
                temperament={item.temperament}
              />
            </Box>
          );
        }
      })}
      {loading && <Loading />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: 10%;
  border: 2px solid lightgray;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 10px 0 10px 0;
`;

export default Home;
