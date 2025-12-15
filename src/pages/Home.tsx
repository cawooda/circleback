import Claims from "@/components/claims";
import { Flex } from "@chakra-ui/react";

function Home() {
  return (
    <Flex direction="column" p={4} gap={4}>
      <Claims />
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Necessitatibus, eos consequatur aliquam animi, ab ducimus officiis
        exercitationem porro saepe numquam quia voluptates fugiat? Consectetur
        possimus quae ipsum quos sapiente mollitia.
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Necessitatibus, eos consequatur aliquam animi, ab ducimus officiis
        exercitationem porro saepe numquam quia voluptates fugiat? Consectetur
        possimus quae ipsum quos sapiente mollitia.
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Necessitatibus, eos consequatur aliquam animi, ab ducimus officiis
        exercitationem porro saepe numquam quia voluptates fugiat? Consectetur
        possimus quae ipsum quos sapiente mollitia.
      </div>
    </Flex>
  );
}

export default Home;
