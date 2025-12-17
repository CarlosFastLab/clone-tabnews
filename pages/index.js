import Image from "next/image";

function Home() {
  return (
    <Image
      src="/images/site_em_construcao.png"
      width={1260}
      height={720}
      style={{
        margin: "auto",
        display: "block",
      }}
    />
  );
}

export default Home;
